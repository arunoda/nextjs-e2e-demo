import { useComments } from "../lib/use-comments"
import Markdown from 'markdown-to-jsx'
import AddCommentBox from './AddCommentBox'
import ms from 'ms'

export default function Comments({slug}) {
    const comments = useComments(slug)

    if (comments.loading) {
        return (
            <div className="comments">
                <div className="comments-info">
                    loading...
                </div>
            </div>
        )
    }

    return (
        <div>
            {comments.comments && comments.comments.length > 0 ? (
                <div className="comments">
                    {comments.comments.map(c => (
                        <div key={c.id} className={c.clientOnly? 'comment client-only' : 'comment'}>
                            <div className="comment-content">
                                <Markdown>{c.content}</Markdown>
                            </div>
                            <div className="comment-author">
                                <img src={c.avatar} title={c.name}/>
                                <div>{c.name} ({ms(Date.now() - c.createdAt)} ago)</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="comments">
                    <div className="comments-info">
                        No comments so far.
                    </div>
                </div>
            )}
            <AddCommentBox onSubmit={content => comments.add(content)}/> 
        </div>
    )
}