import { Router } from "express";

import authRouter from "./auth.routes.js";
import linksRouter from "./links.routes.js";

const router = Router();

router.use(authRouter);
router.use(linksRouter);

export default router;