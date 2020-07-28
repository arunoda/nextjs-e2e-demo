import { useRouter } from 'next/router'
import { getPost, getPostList } from '../../lib/mongodb'
import { useState } from 'react'
import { useLive } from '../../lib/use-live'

import Markdown from '../../components/Markdown'
import Comments from '../../components/Comments'
import Theme from '../../components/Theme'
import ms from 'ms'
import PreviewBar from '../../components/PreviewBar'
import SEO from '../../components/SEO'

export default function Post({post, previewData}) {
    const [showComments, setShowComments] = useState(false)
    const router = useRouter()
    useLive()

    if (router.isFallback) {
        return null;
    }

    return (
        <Theme>
            <SEO post={post} />
            <div className="post">
                <div className="time">Published {ms(Date.now() - post.createdAt, { long: true })} ago</div>
                <h1>{post.title}</h1>
                <div className="content">
                    <Markdown>{post.content}</Markdown>
                </div>
                <button onClick={() => setShowComments(!showComments)}>
                    {showComments? 'Hide Comments': 'Show Comments'}
                </button>
                {showComments? (<Comments slug={post.slug}/>) : null}
                {previewData? (<PreviewBar />) : null}
            </div>
        </Theme>
    )
}

export async function getStaticPaths() {
    const postList = await getPostList()

    return {
        paths: postList.map(p => ({
            params: {slug: p.slug}
        })),
        fallback: true
    }
}

export async function getStaticProps({params, previewData = null}) {
    const post = await getPost(params.slug, {
        sha: previewData && previewData.sha
    })

    return {
        props: {
            post,
            previewData
        },
        unstable_revalidate: 5
    }
}