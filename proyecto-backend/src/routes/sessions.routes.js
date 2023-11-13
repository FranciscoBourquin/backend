import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";

export const sessionsRouter = Router();

sessionsRouter.get("/", (req, res)=> {
    res.render("login");
})

sessionsRouter.post("/", async(req, res)=> {

})

sessionsRouter.get("/signup", (req, res) => {
    const { emailError, passwordError, message } = req.session;
    req.session.emailError = null;
    req.session.passwordError = null;
    req.session.message = null;

    res.render("signup", { emailError, passwordError, message });
  });


sessionsRouter.post("/api/registered-users", async (req, res) => {
    const { name, last_name, email, password } = req.body;

    try {
      const existingEmail = await usersModel.findOne({ email });
      const existingPassword = await usersModel.findOne({ password });

      if (existingEmail) {
        req.session.emailError = "El correo ya existe";
        return res.redirect("/signup");
      } else if (existingPassword) {
        req.session.passwordError = "La contraseña ya existe";
        return res.redirect("/signup");
      } else {
        const user = await usersModel.create({ name, last_name, email, password });
        req.session.message = "Registro exitoso!";
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error.message);
      req.session.message = `Error en el registro: ${error.message}`;
      return res.redirect("/signup");
    }
  });


