/* eslint-disable */
import UserModel from '@/models/User.model'
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    required: true
                },
                password: {
                    type: "password",
                    label: "Password",
                    required: true
                }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({ email: credentials.identifier });
                    if (!user)
                        throw new Error('user not found with this email')
                    if (!user.isVerified)
                        throw new Error('Please verify your account before logging in')


                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid)
                        throw new Error('Incorrect password')
                    else {
                        // console.log(user)
                        return user;
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || ""
        })
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            // console.log("provider====>>>>", account?.provider)
            if (account?.provider === 'google') {
                // console.log("u r using google auth")
                if (user) {
                    await dbConnect()
                    // console.log(user)
                    const existingUser = await UserModel.findOne({ email: user.email });
                    console.log(existingUser?._id)
                    if (!existingUser) {
                        const newUser = await UserModel.create({
                            email: user.email,
                            username: user.name,
                            isVerified: true, // since Google verified the user
                            password: "none",
                        });
                        token._id = newUser._id?.toString();
                    } else {
                        token._id = existingUser._id?.toString();
                    }
                    token.provider = account.provider
                    token.isVerified = user.isVerified;
                    token.username = user.name as string;
                    token.email = user.email;
                    // console.log("token in google ---->>>", token)

                }
            }
            else{
                // console.log("u r using credentials auth")
                if(user)
                {

                    token._id = user._id?.toString();
                    token.isVerified = user.isVerified;
                    token.username = user.username;
                    token.email = user.email;
                    // console.log(token)
                }
            }
            return token;

        },
        async session({ session, token }) {

            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.email = token.email;
                session.user.username = token.username;
                // console.log("Session created:", session);
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in'
    }
}