import { Router } from "express";
import passport from "passport";

export const sessionsRouter = Router();

//Vista de login y mensaje de registro exitoso si se crea una cuenta
sessionsRouter.get("/", async(req, res)=> {
  res.render("login")
});

//Validación del login
sessionsRouter.post("/", passport.authenticate("loginLocalStrategy", {
  failureRedirect: "/login/error"
}), (req, res) => {
  req.session.email = req.user.email;
  req.session.name = req.user.name;

  // Redirige a la ruta de productos
  res.redirect("/api/products");
});



sessionsRouter.get("/login/error", (req, res)=> {
  res.render("login", {message: "Error en el inicio de sesión"})
})

//Vista del signup
sessionsRouter.get("/signup", (req, res) => {


    res.render("signup");
  });

  //Validación del registro
  sessionsRouter.post("/signup",passport.authenticate("signupLocalStrategy", {
    failureRedirect: "/signup/error",
  }), async(req, res)=> {

    res.render("login", {message: "Registro exitoso"});
    // 1:41:49
  });

sessionsRouter.get("signup/error", (req, res)=>{
  res.render("signup", {message: "Error en el registro"});
})

// Ruta de perfil con autenticación
sessionsRouter.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
      const { name, last_name, email } = req.user;
      res.render("profile", { name, last_name, email });
  } else {
      res.render("profile", { message: "Debes iniciar sesión para ver tu perfil" });
  }
});


sessionsRouter.get("/logout", (req, res)=> {
 if (req.session.error) {
  res.render("profile", {logoutError: `Error al cerrar sesión: ${req.session.error}`})
 }
 else {
  req.session.login = false;
  res.redirect("/");
  }
    }
      )
