import { CSSObject, Keyframes, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useMemo } from 'react'

interface FirefliesProps {
  quantity?: number
}

export const Fireflies = ({ quantity = 10 }: FirefliesProps) => {
  const move = useMemo(() => buildMoveAnimationArray(quantity), [quantity])

  return (
    <StyledFireflies>
      {[...Array(quantity)].map((_q, i) => (
        <Firefly
          key={i}
          move={move[i]}
          rotationSpeed={getRandomInt(8000, 18000)}
          flashDuration={getRandomInt(5000, 11000)}
          flashDelay={getRandomInt(500, 8000)}
        />
      ))}
    </StyledFireflies>
  )
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const StyledFireflies = styled.div({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
})

const drift = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const flash = keyframes({
  '0%, 30%, 100%': { opacity: 0, boxShadow: '0 0 0vw 0vw yellow' },
  '5%': { opacity: 1, boxShadow: '0 0 2vw 0.4vw yellow' },
})

const buildMoveAnimationArray = (quantity: number) =>
  [...Array(quantity)].map(() => {
    const steps = getRandomInt(16, 28)

    const keyframeSteps = [...Array(steps)].map(() => ({
      transform: `translateX(${getRandomInt(
        -50,
        50
      )}vw) translateY(${getRandomInt(-50, 50)}vh) scale(${
        getRandomInt(0, 75) / 100 + 0.25
      })`,
    }))

    return keyframes(
      keyframeSteps.reduce<CSSObject>((acc, current, i) => {
        return { ...acc, [`${(i * 100) / steps}%`]: current }
      }, {})
    )
  })

const Firefly = styled.div<{
  move: Keyframes
  rotationSpeed: number
  flashDuration: number
  flashDelay: number
}>(({ move, rotationSpeed, flashDuration, flashDelay }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '0.4rem',
  height: '0.4rem',
  margin: '-0.2rem 0 0 calc(10vw - 0.2rem)',
  animation: `${move} ease 200s alternate infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transformOrigin: '-10vw',
    background: 'black',
    opacity: 0.1,
    animation: `${drift} ease alternate infinite`,
    animationDuration: `${rotationSpeed}ms`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transformOrigin: '-10vw',
    background: 'white',
    opacity: 0,
    boxShadow: '0 0 0vw 0vw yellow',
    animation: `${drift} ease alternate infinite, ${flash} ease infinite`,
    animationDuration: `${rotationSpeed}ms, ${flashDuration}ms`,
    animationDelay: `0ms, ${flashDelay}ms`,
  },
}))
