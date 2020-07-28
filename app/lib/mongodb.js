import { MongoClient } from 'mongodb'
import {nanoid} from 'nanoid'

let cachedDatabase = null;

export function getDatabase() {
    if (cachedDatabase) {
        return cachedDatabase
    }

    const client = new MongoClient(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject(err)
            }

            cachedDatabase = client.db(process.env.MONGO_DB_NAME)
            resolve(cachedDatabase)
        })
    })
}

export function mapPost(p) {
    return {
        slug: p.slug,
        title: p.title,
        content: p.content,
        id: p._id,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
    }
}

export async function getPostList() {
    const db = await getDatabase()
    const options = {
        sort: {
            createdAt: -1
        }
    }
    const posts = await db.collection('posts').find({}, options).toArray()
    return posts.map(mapPost)
}

export async function getPost(slug) {
    const db = await getDatabase()
    const post = await db.collection('posts').findOne({slug})
    return mapPost(post)
}

export async function addPost(post) {
    const { slug, title, content, createdAt } = post
    const db = await getDatabase()
    const id = nanoid(30)
    const result = await db.collection('posts')
        .findOneAndUpdate(
            { slug },
            {
                $set: {
                    title,
                    content,
                    updatedAt: Date.now()
                },
                $setOnInsert: {
                    _id: id,
                    createdAt: createdAt || Date.now()
                }
            },
            {
                upsert: true,
                returnOriginal: false
            }
        )

    return result.value
}

export async function getComments(slug) {
    const db = await getDatabase()
    const options = {
        sort: {
            createdAt: 1
        }
    }
    
    const comments = await db.collection('comments')
        .find({ slug }, options)
        .toArray()

    return comments.map(c => {
        const newComment = {...c};
        newComment.id = c._id
        delete newComment._id
        return newComment
    })
}

export async function addComment(slug, comment) {
    const { ownerId, name, avatar, content, createdAt } = comment
    const db = await getDatabase()
    const id = nanoid(30)
    const result = await db.collection('comments')
        .insertOne({
            _id: id,
            slug,
            ownerId,
            name,
            avatar,
            content,
            createdAt
        })

    return result.value
}