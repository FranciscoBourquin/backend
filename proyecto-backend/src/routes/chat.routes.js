import { Router } from 'express';

export const chatRouter = Router();

chatRouter.get("/", (req, res) => {
    res.render("chat");
});
