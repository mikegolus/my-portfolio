export const getFriendlyUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')
}
