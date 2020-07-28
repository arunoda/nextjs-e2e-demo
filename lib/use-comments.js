import useSWR, { mutate } from 'swr'
import {useSession} from 'next-auth/client'
import { nanoid } from 'nanoid'

const fetcher = async (...args) => {
    const res = await fetch(...args)
    return res.json()
}

export function useComments(slug) {
    const [session] = useSession()
    const dataPath = `/api/comments?slug=${encodeURIComponent(slug)}`
    const {data: comments} = useSWR(
        dataPath,
        fetcher,
        {
            refreshInterval: 1000 * 60,
            revalidateOnFocus: false
        }
    )

    async function add(content) {
        // optimistic UI
        mutate(dataPath, data => {
            return [
                ...data,
                {
                    id: nanoid(30),
                    avatar: session.user.image,
                    name: session.user.name,
                    content,
                    clientOnly: true,
                    createdAt: Date.now()
                }
            ]
        }, false)
        const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content})
        })
        const data = await res.json()
        mutate(dataPath, () => data, false)
    }

    return {
        loading: !Boolean(comments),
        add,
        comments,
    }
}