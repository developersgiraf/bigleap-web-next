import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const usersDataPath = path.join(process.cwd(), 'data', 'users', 'index.json')

async function getUsers() {
  try {
    const data = await fs.readFile(usersDataPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users data:', error)
    return { users: [] }
  }
}

async function findUserByEmail(email) {
  const data = await getUsers()
  return data.users.find(user => user.email.toLowerCase() === email.toLowerCase())
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 Auth attempt:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null
        }

        const user = await findUserByEmail(credentials.email)
        console.log('👤 User found:', user ? 'Yes' : 'No');
        
        if (!user || !user.password) {
          console.log('❌ No user or no password');
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        console.log('🔑 Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
          console.log('❌ Invalid password');
          return null
        }

        console.log('✅ Auth successful for:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in, check if user email is in our admin list
      if (account.provider === 'google') {
        const adminUser = await findUserByEmail(user.email)
        if (!adminUser) {
          return false // Reject sign-in if not an admin
        }
        // Add role to user object
        user.role = adminUser.role
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/giraf/admin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }