export function downloadFile(fileData: Blob, fileName: string = '') {
  if (!fileData) return
  const url = URL.createObjectURL(fileData)
  downloadWithUrl(url, fileName)
}

export function downloadWithUrl(url: string, fileName: string = '') {
  if (!url) {
    return
  }
  const fragment = document.createDocumentFragment()
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.style.display = 'none'
  fragment.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  fragment.removeChild(link)
}
