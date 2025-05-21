import { Router } from "express";
import { login } from "../controllers/auth.controllers";

const router = Router();
router.post('/login-user', login);

export default router;

