import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  })
]

if (process.env.NEXT_PUBLIC_IS_TEST) {
  providers.push(
    Providers.Credentials({
      name: 'test-auth',
      credentials: {
        username: {label: 'Username', type: 'text'}
      },

      async authorize({ username }) {
        const userId = username || String(Math.ceil(Math.random() * 9999999))
        return {
          id: userId,
          name: userId,
          email: `${userId}@email.com`,
          image: `https://api.adorable.io/avatars/128/${userId}.png`
        }
      }
    })
  )
}

const options = {
  providers,

  session: {
    jwt: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE, 10)
  },

  jwt: {
    secret: process.env.JWT_SECRET
  },

  callbacks: {
    async signIn(account, profile, metadata) {
      // TODO: Fetch the real email from GitHub
      if (profile.provider === 'github') {
        account.email = `${metadata.id}@github.com`
      }

      return true;
    }
  }
}

export default (req, res) => NextAuth(req, res, options)