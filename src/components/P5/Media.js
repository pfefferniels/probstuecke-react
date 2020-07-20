import React from 'react'
import path from 'path'

const Media = (props) => {
  if (!props.teiDomElement.hasAttribute('mimeType') ||
      !props.teiDomElement.hasAttribute('url')) {
    return (null)
  }

  const mimeType = props.teiDomElement.getAttribute('mimeType')
  const url = props.teiDomElement.getAttribute('url')

  if (mimeType.startsWith('audio/')) {
    return (
      <audio className='embeddedAudio' controls>
        <source src={`${props.teiPath}/${url}`} type={mimeType}/>
      </audio>
    )
  }

  return (null)
}

export default Media
