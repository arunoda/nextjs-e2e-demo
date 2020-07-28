export default function PreviewBar() {
    const goLive = () => {
        location.href="/api/clear-preview"
    }
    
    return (
        <div className="preview-bar">
            <span>Using the preview mode</span>
            <button onClick={goLive}>Go Live</button>
        </div>
    )
}