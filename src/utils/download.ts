export const download = (url: string, filename: string) => {
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', filename)
  a.click()
}
