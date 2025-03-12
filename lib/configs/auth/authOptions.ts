import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongodb";
import { User as  UserData } from "@/models/User";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import  { AuthOptions } from "next-auth";
import  { type User } from "next-auth";


export const authOptions:AuthOptions  = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        await connectToDB();
        let user = await UserData.findOne({ email: profile.email });
        if (!user) {
          user = await UserData.create({
            name: profile.name,
            email: profile.email,
            password: "googleUser",
            image: profile.picture,
          });
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await UserData.findOne({ email: credentials?.email });
        if (!user) throw new Error("Invalid credentials");

        const isPasswordValid = credentials?.password
          ? await bcrypt.compare(credentials.password, user.password)
          : false;
        if (!isPasswordValid) throw new Error("Invalid credentials");

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as Session["user"];
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};