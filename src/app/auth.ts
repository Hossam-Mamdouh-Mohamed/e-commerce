import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'My login',
      credentials: {
        email: { label: 'Email', placeholder: 'Enter Your Email', type: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Your Password' }
      },
      //must return 1- null or 2- object with property id from type string or 3- throw error 
      async authorize(credentials) {

        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const payload = await response.json().catch(() => null);
        const userData: { id: string } = jwtDecode(payload.token);
        return {
          id: userData.id,
          name: payload.user.name,
          email:payload.user.email,
          token: payload.token
        }
      }
    })
  ],
  callbacks: {

    // تستخدمها عشان تضيف بيانات للـ token.
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }

};

