import { Router } from "express";
import { signupModel } from "../dao/models/signup.model.js";

export const sessionsRouter = Router();

sessionsRouter.get("/", (req, res)=> {
    res.render("login");
})

sessionsRouter.post("/", async(req, res)=> {

})

sessionsRouter.get("/signup", (req, res) => {


    res.render("signup");
  });

  sessionsRouter.post("/signup", async(req, res)=> {
    const signupInfo = req.body;

try {
  const existingEmail = await signupModel.findOne({ email: signupInfo.email });
  const existingPassword = await signupModel.findOne({ password: signupInfo.password });

  if (existingEmail === null && existingPassword === null) {
    const newUser = await signupModel.create(signupInfo);
    res.render("login", { message: "Usuario registrado exitosamente!" });
  } else {
    if (existingEmail !== null) {
      res.render("signup", { emailError: "El correo ingresado ya existe" });
    } else if (existingPassword !== null) {
      res.render("signup", { passwordError: "La contraseña ingresada ya existe" });
    }
  }
} catch (error) {

  res.render("signup", { error: `Error al procesar la solicitud: ${error.message}` });
}

  });





