import React from 'react'

export default class Youtube extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = { showVideo: false }
  }

  renderVideo (options = {}) {
    const { autoplay = false } = options
    const { videoId, width = '100%', height = 366 } = this.props
    const src = `https://www.youtube.com/embed/${videoId}`
    const videoUrl = autoplay ? `${src}?autoplay=1` : src
    return (
      <iframe width={width} height={height} src={videoUrl} frameborder='0' allow='autoplay; encrypted-media' allowfullscreen='1' />
    )
  }

  handleShowVideo () {
    this.setState({ showVideo: true })
  }

  render () {
    const { showVideo } = this.state
    const { videoId } = this.props

    const overlay = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    if (showVideo) {
      return this.renderVideo({ autoplay: true })
    }

    return (
      <div className='youtube-container'>
        <div className='click-to-play'>Play Now</div>
        <img src={overlay} onClick={() => this.handleShowVideo()} />
      </div>
    )
  }
}
