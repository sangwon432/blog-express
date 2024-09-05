import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    getUserById,
} from "../controllers/user.js";
// import authenticate from "../config/authenticate.js";

// const authCheck = passport.authenticate('jwt', { session: false })

router.get("/", getAllUsers);

router.get("/userinfo/:userId", getUserById); // 원래는 /:userId였는데 authcheck 쪽에서 겹쳐서 에러 났었음. 그 이후로 /userinfo/:userId로 변경

//
// // @Route   POST api/user/create
// // @desc    Get userInfo (get userinfo by jwt)
// // @access  Private
// router.get("/current", authCheck, getUserInfoByToken) //private 이면 authenticate가 되도록. token이 헤더에 없으면 에러
//AUTH 로 이관

// router.put("/:userId", updateUser);
//
// router.delete("/:userId", deleteUser);

export default router;
