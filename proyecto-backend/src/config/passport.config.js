import passport from "passport";
import localStrategy from "passport-local";
import { createHash, isValidPassword } from "../dirname.js";
import { signupModel } from "../dao/models/signup.model.js";

export const initializePassport = ()=> {
    //middleware de passport: nombre de la estrategia + modulo de la estrategia (new localStrategy)
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


//2:02:01
