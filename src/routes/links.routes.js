import { Router } from "express";

import { shortenLink, getLink, openLink, deleteLink, getUserLinks, rankLinks } from "../controllers/links.controllers.js";
import linksValidation from "../middlewares/linksValidation.js"
import linksSchema from "../schemas/links.schemas.js";

const linksRouter = Router();

linksRouter.post("/urls/shorten", linksValidation(linksSchema), shortenLink);
linksRouter.get("/urls/:id", getLink);
linksRouter.get("/urls/open/:shortUrl", openLink);
linksRouter.delete("/urls/:id", deleteLink);
linksRouter.get("/users/me", getUserLinks);
linksRouter.get("/ranking", rankLinks);

export default linksRouter;