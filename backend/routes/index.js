import express from "express";
import { getUser, login, logout, register } from "../controller/User.js";
import { verify_token } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
const router = express.Router();

router.get('/users', verify_token, getUser);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;  