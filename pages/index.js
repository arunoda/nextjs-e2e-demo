import { getPostList } from '../lib/mongodb'
import Link from 'next/link'
import Theme from '../components/Theme'
import ms from 'ms'
import PreviewBar from '../components/PreviewBar'

export default function Home({ postList, previewData }) {
    return (
        <Theme>
            <div className='post-list'>
                {postList.map(post => (
                    <div key={post.slug} className="post-link">
                        <Link href='/post/[slug]' as={`/post/${post.slug}`}>
                            <a>
                                <div className="time">{ms(Date.now() - post.createdAt, { long: true })} ago</div>
                                <div className="title">{post.title}</div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            {previewData? (<PreviewBar />) : null}
        </Theme>
    )
}

export async function getStaticProps({previewData = null}) {
    const postList = await getPostList()
    
    return {
        props: {
            postList,
            previewData
        },
        unstable_revalidate: 5
    }
}