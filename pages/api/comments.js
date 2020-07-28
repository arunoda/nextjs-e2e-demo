import { getSession } from 'next-auth/client'
import { getComments, addComment } from '../../lib/mongodb'

export default async function comments(req, res) {
    const slug = req.query.slug

    if (req.method === 'GET') {
        const comments = await getComments(slug)
        return res.send(comments)
    }
    
    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (!session) {
            res.status(401).send('Unauthorized')
            return;
        }

        const comment = {
            ownerId: session.user.email,
            name: session.user.name,
            avatar: session.user.image,
            content: req.body.content,
            createdAt: Date.now()
        }

        // fake slow to show optimistic UI
        await new Promise((r) => setTimeout(r, 600))

        await addComment(slug, comment)
        const comments = await getComments(slug)
        return res.send(comments)
    }

    res.status(404).send('Unsupported Method')
}