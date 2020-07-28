import Head from 'next/head'
import { findImage } from './Markdown'

export default function SEO({post}) {
    const {title, content} = post
    const summary = content.trim().split('.')[0]
    const image = findImage(post.content)
    const postUrl = `${process.env.NEXT_PUBLIC_SITE}/post/${post.slug}`

    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={summary} />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:url' content={postUrl} />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={summary} />
            <meta name='twitter:image' content={image} />

            <meta property='og:site_name' content='Get Started' />
            <meta property='og:url' content={postUrl} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={summary} />
            <meta property='og:image' content={image} />
        </Head>
    )
}