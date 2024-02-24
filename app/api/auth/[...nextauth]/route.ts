import NextAuth, { Profile } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/user';
import { connectDB } from "@/utils/database";


const googleClientId = process.env.GOOGLE_ID ?? '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session }: { session: any }) {
            try {
                const sessionUser = await User.findOne({ email: session.user?.email });
                session.user.id = sessionUser?._id.toString();
            } catch (error) {
                console.log(error);
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();
                const userExists = await User.findOne({
                    email: profile?.email
                });

                if (!userExists && profile) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: 'picture' in profile ? profile.picture : 'https://pcgacademia.pl/wp-content/themes/pcgacademia-child/images/png/avatar-placeholder.png'
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
