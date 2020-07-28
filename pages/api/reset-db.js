import { addPost, getDatabase } from '../../lib/mongodb'
import ms from 'ms'

export default async function resetDB(req, res) {
    if (!process.env.NEXT_PUBLIC_IS_TEST) {
        res.status(400).send('Bad Request')
        return
    }

    const db = await getDatabase()
    try {
        await db.collection('posts').drop()
        await db.collection('comments').drop()
    } catch (err) {}

    await addPost({
        slug: 'hello-world',
        title: 'Hello World',
        content: `
This is my first blog post using the GitHub as a CMS.

Amazing 🚀 🚀         
        `,
        createdAt: Date.now() - ms('2d')
    })

    await addPost({
        slug: 'introducing-getstarted',
        title: 'Introducing GetStarted',
        content: `
It's the place for Getting Started guides.       
        `,
        createdAt: Date.now() - ms('1d')
    })

    res.send({})
}