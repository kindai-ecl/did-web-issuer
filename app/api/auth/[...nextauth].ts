import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string | null
            name?: string | null
        }
    }
}

interface Credentials {
    id: string
    name: string
}

interface User {
    id: string
    name: string
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                id: { label: "ID", type: "text" },
                name: { label: "Name", type: "text" },
            },
            authorize(credentials: Credentials | undefined): User | null {
                if (!credentials) {
                    return null;
                }
                const user: User = { id: credentials.id, name: credentials.name }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
    }
})