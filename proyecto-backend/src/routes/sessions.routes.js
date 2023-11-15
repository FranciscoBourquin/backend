import { Router } from "express";
import { signupModel } from "../dao/models/signup.model.js";
import { loginModel } from "../dao/models/login.model.js";

export const sessionsRouter = Router();

//Vista de login y mensaje de registro exitoso si se crea una cuenta
sessionsRouter.get("/", async(req, res)=> {
  const userInfo = req.body;
  const registeredEmail = await signupModel.findOne({email: req.session.email});

  if (registeredEmail!== null) {
    res.render("login", {message: "Registro exitoso"});
  }
  else {
    res.render("login")
  }

})

//Validación del login
sessionsRouter.post("/", async(req, res)=> {
  const loginInfo = req.body;
  const existingEmail = await signupModel.findOne({email:loginInfo.email});
  const existingPassword = await signupModel.findOne( { password: loginInfo.password});

  try {
    if (existingEmail === null && existingPassword === null) {
        res.render("login", {emailError: "El correo ingresado es incorrecto", passwordError: "La contraseña ingresada es incorrecta"})
    }

    else if (existingEmail === null && existingPassword !== null){
      res.render("login", {emailError: "El correo ingresado es incorrecto"});
    }

    else if (existingEmail !== null && existingPassword === null) {
      res.render("login", {passwordError: "La contraseña ingresada es incorrecta"})
    }

    else {
      const newLogin =await loginModel.create(loginInfo);
      res.redirect("/api/products");
    }

  } catch (error) {
      res.render("login", error.message)
  }
})

//Vista del signup
sessionsRouter.get("/signup", (req, res) => {


    res.render("signup");
  });

  //Validación del registro
  sessionsRouter.post("/signup", async(req, res)=> {
    const signupInfo = req.body;

try {
  const existingEmail = await signupModel.findOne({ email: signupInfo.email });
  const existingPassword = await signupModel.findOne({ password: signupInfo.password });

  if (existingEmail === null && existingPassword === null) {

    const newUser = await signupModel.create(signupInfo);
    req.session.name = signupInfo.name;
    req.session.last_name = signupInfo.last_name;
    req. session.email = signupInfo.email;
    req.session.password = signupInfo.password;
    res.redirect("/");
  }

  else {

    if (existingEmail !== null) {
      res.render("signup", { emailError: "El correo ingresado ya existe" });
    }

    else if (existingPassword !== null) {
      res.render("signup", { passwordError: "La contraseña ingresada ya existe" });
    }
  }

} catch (error) {

  res.render("signup", { error: `Error al procesar la solicitud: ${error.message}` });
}

  });


sessionsRouter.get("/profile", async(req, res)=> {
  const name = req.session.name;
  const last_name = req.session.last_name;
  const email = req.session.email;
  const existingUser = await loginModel.findOne({email: email});
  if (email) {
    res.render("profile", {name, last_name, email})

  }
  else{
    res.render("profile", {message: "Debes iniciar sesión para ver tu perfil"})
  }

})


