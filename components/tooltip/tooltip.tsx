import type { FC } from 'react'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const OFFSET_FROM_EDGE = 4

type CssPosition = number | 'unset'
type PopoverPosition = {
  top: CssPosition
  bottom: CssPosition
  left: CssPosition
  right: CssPosition
}

const calculatePopoverPosition = (
  containerWidth: number,
  containerHeight: number,
  targetBounding: DOMRect,
  popoverBounding: DOMRect,
  offsetPx: number
): PopoverPosition => {
  const widthDiff = targetBounding.width - popoverBounding.width

  let top: CssPosition = targetBounding.top + targetBounding.height + offsetPx
  let bottom: CssPosition = top + popoverBounding.height
  let left: CssPosition = targetBounding.left + widthDiff / 2
  let right: CssPosition = left + popoverBounding.width

  // Adjust if the popover will be below the screen bottom
  if (bottom > containerHeight - OFFSET_FROM_EDGE) {
    top = 'unset'
    bottom = containerHeight - targetBounding.top + offsetPx
  } else {
    bottom = 'unset'
  }

  // Adjust if the popover will be off the screen to the left or right
  if (left < OFFSET_FROM_EDGE) {
    left = offsetPx
    right = 'unset'
  } else if (right > containerWidth - OFFSET_FROM_EDGE) {
    left = 'unset'
    right = offsetPx
  } else {
    right = 'unset'
  }

  return { top, bottom, left, right }
}

const DELAY_SHOW_MS = 275
const DELAY_HIDE_MS = 250
const OFFSET_PX = 4
const MAX_WIDTH = 360

const Tooltip: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<null | NodeJS.Timeout>(null)

  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    bottom: 'unset',
    left: 0,
    right: 'unset',
  })

  const positionTooltip = useCallback((targetElement: Element) => {
    if (!ref.current) {
      return
    }

    const targetBounding = targetElement.getBoundingClientRect()
    const refBounding = ref.current.getBoundingClientRect()
    const newPosition = calculatePopoverPosition(
      window.innerWidth,
      window.innerHeight,
      targetBounding,
      refBounding,
      OFFSET_PX
    )

    setIsVisible(true)
    setPosition(newPosition)
    setIsMoving(false)
  }, [])

  const hideImmediately = useCallback(() => {
    setIsVisible(false)

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }, [])

  const onMouseover = useCallback(
    (e: MouseEvent) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }

      if (!(e.target instanceof Element)) {
        return
      }

      const hoveredElement = e.target as Element
      const tooltipTarget = hoveredElement.closest('[data-tooltip]')
      let newText = tooltipTarget
        ? tooltipTarget.getAttribute('data-tooltip')
        : null

      if (!newText) {
        const doesNotContainMarkup = hoveredElement.children.length === 0
        const hasOverflowingContent =
          hoveredElement.clientWidth < hoveredElement.scrollWidth ||
          hoveredElement.clientHeight < hoveredElement.scrollHeight

        if (hasOverflowingContent && doesNotContainMarkup) {
          const hasIntendedTextOverflow =
            getComputedStyle(hoveredElement).textOverflow === 'ellipsis'

          if (hasIntendedTextOverflow) {
            newText = hoveredElement.textContent
          }
        }

        if (!newText) {
          // Hide after the delay
          timeoutId.current = setTimeout(
            () => setIsVisible(false),
            DELAY_HIDE_MS
          )
          return
        }
      }

      // Set the text immediately and then show after the delay. The text has to be set and rendered
      // immediately so that the positionTooltip function can know the tooltip's rendered width
      if (text !== newText) setIsMoving(true)
      setText(newText)
      timeoutId.current = setTimeout(
        () => positionTooltip(tooltipTarget || hoveredElement),
        isVisible ? 0 : DELAY_SHOW_MS
      )
    },
    [isVisible, positionTooltip, text]
  )

  useEffect(() => {
    window.addEventListener('mouseover', onMouseover)
    window.addEventListener('resize', hideImmediately)
    window.addEventListener('click', hideImmediately)
    window.addEventListener('scroll', hideImmediately, true)

    return () => {
      timeoutId.current = null
      window.removeEventListener('mouseover', onMouseover)
      window.removeEventListener('mouseover', hideImmediately)
      window.removeEventListener('click', hideImmediately)
      window.removeEventListener('scroll', hideImmediately, true)
    }
  }, [hideImmediately, onMouseover])

  return (
    <Tip
      ref={ref}
      position={position}
      isVisible={isVisible}
      isMoving={isMoving}
    >
      {text}
    </Tip>
  )
}

const Tip = styled.div(
  ({
    position,
    isVisible,
    isMoving,
  }: {
    position: PopoverPosition
    isVisible: boolean
    isMoving: boolean
  }) => ({
    position: 'fixed',
    zIndex: 9, // This needs to be astronomically high to guarantee it sits above other established overlayed elements.
    top: position.top,
    bottom: position.bottom,
    left: position.left,
    right: position.right,
    maxWidth: MAX_WIDTH,
    backgroundColor: 'var(--tooltipBackgroundColor)',
    color: 'var(--textColor)',
    padding: '2px 6px',
    boxSizing: 'border-box',
    borderRadius: 4,
    fontFamily: 'var(--sansSerif)',
    fontSize: 12,
    pointerEvents: 'none',
    overflow: 'hidden',
    visibility: isMoving ? 'hidden' : 'visible',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 300ms',
    ...(isVisible && {
      animation: `show 300ms ease forwards`,
      '@keyframes show': {
        '0%': {
          transform: 'translateY(-4px)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
    }),
  })
)

export { Tooltip }
