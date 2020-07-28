import MarkdownJSX, {compiler} from 'markdown-to-jsx'
import Youtube from './Youtube'

export default function Markdown({children}) {
    return (
        <MarkdownJSX
            options={{
                overrides: {
                    Youtube: { component: Youtube }
                }
            }}
        >
            {children}
        </MarkdownJSX>
    )
}

export function findImage(markdown) {
    const images = []
    const videoIds = []
  
    compiler(markdown, {
      createElement(type, props) {
          if (type === 'img') {
              images.push(props.src)
              return
          }
  
          if (type === 'Youtube') {
            videoIds.push(props.videoId)
          }
       }
    })
  
    if (images.length > 0) {
      return images[0]
    }
  
    if (videoIds.length > 0) {
      return `https://img.youtube.com/vi/${videoIds[0]}/maxresdefault.jpg`
    }
  }