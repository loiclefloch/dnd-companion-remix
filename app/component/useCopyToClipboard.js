import { useState } from 'react'

// https://usehooks-ts.com/react-hook/use-copy-to-clipboard
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null)

  const copy = async textParam => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }
    
    const text = JSON.stringify(textParam, null, 2)

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}

export default useCopyToClipboard