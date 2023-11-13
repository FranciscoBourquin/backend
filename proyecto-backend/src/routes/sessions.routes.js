import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";

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
    const userInfo = req.body;

try {
  const existingEmail = await usersModel.findOne({ email: userInfo.email });
  const existingPassword = await usersModel.findOne({ password: userInfo.password });

  if (existingEmail === null && existingPassword === null) {
    const newUser = await usersModel.create(userInfo);
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





