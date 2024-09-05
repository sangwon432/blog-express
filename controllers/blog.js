import blogModel from "../models/blog.js";

const createBlog = async (req, res) => {
    const { title, description, price, productImage } = req.body;

    const newBlog = new blogModel({
        title, description, price, productImage
    });

    newBlog
        .save()
        .then(blog => {
            res.status(201).json({
                success: true,
                data: blog
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const getAllBlogs = async (req, res) => {
    const blogs = await blogModel.find().sort({ date: -1 });

    if (blogs.length === 0) {
        return res.status(200).json({
            message: "No Blogs Found",
        });
    }
    res.status(200).json({
        success: true,
        count: blogs.length,
        data: blogs
    });
};

const getBlogById = async (req, res) => {
    blogModel
        .findById(req.params.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(200).json({
                    msg: "No blog found"
                });
            }
            res.status(200).json({
                success: true,
                data: blog
            });
        })
        .catch(err => res.status(404).json(err));
};

const updateBlog = async (req, res) => {
    const { title, description, price, productImage } = req.body;

    const blog = await blogModel.findById(req.params.blogId);

    if (!blog) {
        return res.status(404).json({ success: false, msg: "No blog found" });
    }

    if (title) blog.title = title;
    if (description) blog.description = description;
    if (price) blog.price = price;
    if (productImage) blog.productImage = productImage;  // Corrected: productImage should be the field name, not ProductImage

    const updatedBlog = await blog.save();
    res.status(200).json({ success: true, data: updatedBlog });
};

const deleteBlog = async (req, res) => {
    blogModel
        .findByIdAndDelete(req.params.blogId)
        .then(blog => {
            if (!blog) {
                return res.status(200).json({
                    msg: "No Blog Found"
                });
            }
            res.status(200).json({
                success: true,
                data: blog
            });
        })
        .catch(err => res.status(404).json(err));
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };


// import blogModel from "../models/blog.js";
//
// const createBlog = async (req, res) => {
//     const { title, description, price, productImage } = req.body;
//
//     const newBlog = new blogModel({
//         title, description, price, productImage
//     })
//
//     newBlog
//         .save()
//         .then(blog => {
//             res.status(201).json({
//                 success: true,
//                 data: blog
//             })
//         })
//         .catch(err => {
//             res.status(400).json(err)
//         })
// }
//
// const getAllBlogs = async (req, res) => {
//     // console.log("blog total get");
//
//     const blogs = await blogModel.find().sort({date: -1});
//
//     if (blogs.length === 0) {
//         return res.status(200).json({
//             message: "No Blogs Found",
//         })
//     }
//     res.status(200).json({
//         success: true,
//         count: blogs.length,
//         data: blogs
//     })
//
//     // 위가 아래보다 훨씬 직관적임. 이형대로 바꾸기 . asyncrhonous하고 readiblity도 올라감.
//
//     //
//     // blogModel
//     //     .find()
//     //     .sort({ date: -1})
//     //     .then(blogs => {
//     //         if (blogs.length === 0) {
//     //             return res.status(200).json({
//     //                 message: "No Blogs Found",
//     //             })
//     //         }
//     //         return res.status(200).json({
//     //             count: blogs.length,
//     //             blogs
//     //         })
//     //     })
//     //     .catch(err => {
//     //         res.status(404).json(err);
//     // })
// }
//
// const getBlogById = async (req, res) => async (req, res) => {
//     blogModel
//         .findById(req.params.blogId)
//         .then(blog => {
//             if (!blog) {
//                 return res.status(200).json({
//                     msg: "No blog found"
//                 })
//             }
//             res.status(200).json(blog)
//         })
//         .catch(err => res.status(404).json(err))
// }
//
//
// const updateBlog = async (req, res) => async (req, res) => {
//     const {title, description, price, productImage} = req.body;
//
//     const blog = await blogModel.findById(req.params.blogId)
//
//     if (!blog) {
//         return res.status(404).json({success: false, msg: "No blog found"})
//     }
//
//     if (title) blog.title = title
//     if (description) blog.description = description
//     if (price) blog.price = price
//     if (productImage) blog.ProductImage= productImage
//
//     const updatedBlog = await blog.save()
//     res.status(200).json({success: true, data: updatedBlog})
// }
//
// const deleteBlog = async (req, res) => {
//     blogModel
//         .findByIdAndDelete(req.params.blogId)
//         .then(blog => {
//             if (!blog) {
//                 return res.status(200).json({
//                     msg: "No Blog Found"
//                 })
//             }
//             res.status(200).json(blog)
//         })
//         .catch(err => res.status(404).json(err))
// }
//
// // 비즈니스 로직이 익스프레스에서는 컨트롤러에 있음
// export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog }