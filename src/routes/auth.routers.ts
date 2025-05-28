import { Router } from "express";
import { getAllUsers, getTimeToken, getUserByusername, login, saveUser, UpdateToken, updateUser } from "../controllers/auth.controllers";

const router = Router();
router.post('/login-user', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', UpdateToken);
router.get('/users',getAllUsers);
router.post('/users',saveUser);
router.get('/users/name/:userName',getUserByusername);
router.patch('/users/:userId',updateUser);

export default router;

