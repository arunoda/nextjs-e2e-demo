import { useState } from "react"
import useAuth from '../lib/use-auth'

export default function AddCommentBox({onSubmit}) {
    const [commentText, setCommentText] = useState('')
    const [addingComment, setAddingComment] = useState(false)
    const {session, signIn} = useAuth()

    const handleLogin = () => {
        signIn(process.env.NEXT_PUBLIC_IS_TEST? 'test-auth' : 'github')
    }

    const addComment = async () => {
        try {
            setAddingComment(true)
            setCommentText('')
            await onSubmit(commentText)
        } finally {
            setAddingComment(false)
        }
    }

    const getCTA = () => {
        if (session) {
            return (<button onClick={addComment}>Add Comment</button>)
        }

        return (
            <button onClick={handleLogin}>
                Login to Add Comment
            </button>
        )
    }
    
    return (
        <div className="add-comment-box">
            {session? (
                <textarea
                    disabled={!session}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
            ) : null}
            <br/>
            {getCTA()}
        </div>
    )
}