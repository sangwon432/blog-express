import express from 'express';
const router = express.Router();
import passport from "passport";
import {
    createUser,
    loginUser,
    getUserInfoByToken,
} from "../controllers/auth.js";


// @Route   POST api/user/create
// @desc    create user (signup)
// @access  Public


const authCheck = passport.authenticate('jwt', { session: false })

router.post("/create", createUser);

router.post("/login", loginUser)

// @Route   POST api/user/create
// @desc    Get userInfo (get userinfo by jwt)
// @access  Private
router.get("/current", authCheck, getUserInfoByToken) //private 이면 authenticate가 되도록. token이 헤더에 없으면 에러

export default router;