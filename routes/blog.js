import express from 'express';
const router = express.Router();

import blogModel from "../models/blog.js";
import blog from "../models/blog.js";
import {createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog} from "../controllers/blog.js";

//blog 전체 data를 가지고 오는 api
router.get("/", getAllBlogs)




//blog 특정 data를 가지고 오는 api
router.get("/:blogId", getBlogById)

//블로그 데이터를 등록하는 api
router.post("/create", createBlog)

//블로그 데이터를 업데이트하는 api
router.put("/:blogId", updateBlog)


//블로그 데이터를 삭제하는 api
router.delete("/:blogId", deleteBlog)

export default router;