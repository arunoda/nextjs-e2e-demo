import useAuth from '../lib/use-auth'
import Link from 'next/link'

export default function Header() {
    const { session, signOut, signIn } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        signIn(process.env.NEXT_PUBLIC_IS_TEST? 'test-auth' : 'github')
    }

    const handleLogout = (e) => {
        e.preventDefault()
        signOut()
    }

    return (
        <div className="header">
            <Link href="/">
                <a className="title">My Blog</a>
            </Link>
            {session? (
                <a className="logout" href="#" onClick={handleLogout}>Logout</a>
            ) : (
                <a className="logout" href="#" onClick={handleLogin}>Login</a>
            )}
        </div>
    )
}