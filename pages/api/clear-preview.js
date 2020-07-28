export default function preview(req, res) {
    res.clearPreviewData()
    res.writeHead(307, {
        Location: '/'
    })
    res.end();
}