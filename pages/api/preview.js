export default function preview(req, res) {
    const {sha} = req.query
    if (!sha) {
        res.status(400).send('Query param sha is missing.')
        return
    }

    res.setPreviewData({sha})
    res.writeHead(307, {
        Location: '/'
    })
    res.end();
}