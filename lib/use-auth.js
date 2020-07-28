import {signIn, signOut} from 'next-auth/client'
import useSWR from 'swr'

async function fetcher(path) {
    const fetchRes = await fetch(path)
    return fetchRes.json()
}

export default function auth() {
    const {data} = useSWR('/api/auth/session', fetcher)
    
    const getSession = () => {
        if (data && data.user) {
            return data
        }

        return null
    }

    return {
        signIn,
        signOut,
        session: getSession()
    }
}