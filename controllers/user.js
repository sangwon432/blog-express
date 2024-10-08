import userModel from "../models/user.js";
import bcrypt from 'bcryptjs';
// import gravatar from 'gravatar';
import jwt from 'jsonwebtoken'

// const createUser = async (req, res) => {
//     const { username, email, password } = req.body;
//
//     const existingUser = await userModel.findOne({ email })
//
//     if (existingUser) {
//         return res.status(409).json({
//             success: false,
//             message: "email already in use"
//         });
//     }
//
//     const hashedPassword = await bcrypt.hash(password, 10)
//
//     const profileImage = gravatar.url(email, {
//         s: '200',
//         r: 'pg',
//         d: 'mm',
//         protocol: 'https',
//     })
//
//     const newUser = new userModel({
//         username,
//         email,
//         password: hashedPassword,
//         profileImage,
//     });
//
//     newUser
//         .save()
//         .then(user => {
//             res.status(201).json({
//                 success: true,
//                 data: user
//             });
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// };

const getAllUsers = async (req, res) => {
    const users = await userModel.find().sort({ date: -1 });

    if (users.length === 0) {
        return res.status(200).json({
            message: "No Users Found",
        });
    }
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};

const getUserById = async (req, res) => {
    userModel
        .findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    msg: "No user found"
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        })
        .catch(err => res.status(404).json(err));
};

const updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findById(req.params.userId);

    if (!user) {
        return res.status(404).json({ success: false, msg: "No user found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();
    res.status(200).json({ success: true, data: updatedUser });
};

const deleteUser = async (req, res) => {
    userModel
        .findByIdAndDelete(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    msg: "No User Found"
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        })
        .catch(err => res.status(404).json(err));
};

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     console.log("req ", email, password)
//
//     const user = await userModel.findOne( { email })
//
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user not found"
//         })
//     }
//
//     const isPasswordMatched = await bcrypt.compare(password, user.password);
//
//     if (!isPasswordMatched) {
//         return res.status(400).json({
//             success: false,
//             msg: "Password does not match"
//         })
//     }
//
//     console.log(typeof user._id)
//
//     const payload = { userId: user._id }
//     // const { payload } = user._id
//     const token = jwt.sign(payload,
//         process.env.JWT_ACCESSTOKEN_SECRET,
//         { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION_TIME}
//
//         )
//
//     return res.status(200).json({
//         success: true,
//         data: {user, token}
//     })
// // email 유무 체크 -> 패스워드 매칭 (해시 풀어서) -> jwt 생성해서 리턴
// }

// get userinfo by token
// const getUserInfoByToken = async (req, res) => {
//     res.status(200).json({
//         userInfo: req.user
//     })
// }

export { getAllUsers, getUserById, updateUser, deleteUser };
