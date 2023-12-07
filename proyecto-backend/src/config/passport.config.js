import passport from "passport";
import localStrategy from "passport-local";
import { createHash, isValidPassword } from "../dirname.js";
import { signupModel } from "../dao/models/signup.model.js";
import { config } from "./config.js";
import GithubStrategy from "passport-github2"


export const initializePassport = ()=> {
    //middleware de passport: nombre de la estrategia + modulo de la estrategia (new localStrategy)

    //Estrategia de signup
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, username, password, done) => {
            const { name, last_name } = req.body;

            try {
                const existingEmail = await signupModel.findOne({ email: username });

                if (existingEmail) {
                    return done(null, false);
                } else {
                    const newUser = {
                        name,
                        last_name,
                        email: username,
                        password: createHash(password)
                    };

                    const createdUser = await signupModel.create(newUser);
                    return done(null, createdUser);
                }
            } catch (error) {
                return done(error.message);
            }
        }
    ));

    //Estrategia de signup con github
    passport.use("githubSignupStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackUrl: `http://localhost:8080${config.github.callbackUrl}`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await signupModel.findOne({email: profile.username});
                if (user) {
                    return done(null, user)
                }
                console.log("profile:", profile);

                const newUser = {
                    name: profile.displayName,
                    email: profile.username,
                    password: createHash(profile.id)
                };
                const createdUser = await signupModel.create(newUser)
                console.log(newUser);
                return done(null, createdUser);
                }
                  catch (error) {
                    return done(error.message);
            }
        }
    ));

    //Estrategia de loign
    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField: "email"
        },
        async (username, password, done) => {
            try {
                const existingUser = await signupModel.findOne({ email: username });

                if (!existingUser || !isValidPassword(password, existingUser)) {
                    return done(null, false);
                }

                // Establece la información básica en la sesión
                const { _id, name, last_name, email } = existingUser;
                const user = { _id, name, last_name, email };
                done(null, user);
            } catch (error) {
                done(error.message);
            }
        }
    ));
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await signupModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });


//1:02:01
