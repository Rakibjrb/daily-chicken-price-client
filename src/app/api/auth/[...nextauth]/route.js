import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { cookies } from "next/headers";
import axios from "axios";

const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/admin/login`,
          credentials
        );
        if (!res.data.token) {
          throw new Error("Login failed");
        }
        (await cookies()).set(
          `${process.env.NEXT_SECRET_TOKEN}`,
          `Bearer ${res.data.token}`,
          {
            httpOnly: true,
            sameSite: "lax",
          }
        );
        return res.data;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
