import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-oauth2';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        // 1. Check if user already exists by googleId
        let user = await prisma.user.findFirst({
          where: {
            googleId: profile.id,
          },
        });

        // 2. If user doesn't exist, create it
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || `no-email-${profile.id}@google.com`,
              password: '', // mot de passe vide si on ne l'utilise pas
              profilePicture: {
                url: profile.photos?.[0]?.value || '',
              },
            },
          });
        }

        // 3. Connect the user
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);