import productModel from "../models/product.js";

const createProduct = async (req, res) => {
    const { name, description, price, productImage } = req.body;

    const newProduct = new productModel({
        name, description, price, productImage
    });

    newProduct
        .save()
        .then(product => {
            res.status(201).json({
                success: true,
                data: product
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const getAllProducts = async (req, res) => {
    const products = await productModel.find().sort({ date: -1 });

    if (products.length === 0) {
        return res.status(200).json({
            message: "No Products Found",
        });
    }
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
};

const getProductById = async (req, res) => {
    productModel
        .findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(200).json({
                    msg: "No product found"
                });
            }
            res.status(200).json({
                success: true,
                data: product
            });
        })
        .catch(err => res.status(404).json(err));
};

const updateProduct = async (req, res) => {
    const { name, description, price, productImage } = req.body;

    const product = await productModel.findById(req.params.productId);

    if (!product) {
        return res.status(404).json({ success: false, msg: "No product found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (productImage) product.productImage = productImage;  // Corrected: productImage should be the field name, not ProductImage

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, data: updatedProduct });
};

const deleteProduct = async (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(200).json({
                    msg: "No Product Found"
                });
            }
            res.status(200).json({
                success: true,
                data: product
            });
        })
        .catch(err => res.status(404).json(err));
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };


// import productModel from "../models/product.js";
//
// const createProduct = async (req, res) => {
//     const { name, description, price, productImage } = req.body;
//
//     const newProduct = new productModel({
//         name, description, price, productImage
//     })
//
//     newProduct
//         .save()
//         .then(product => {
//             res.status(201).json({
//                 success: true,
//                 data: product // 이게 맞나??
//             })
//         })
//         .catch(err => {
//             res.status(400).json(err)
//         })
// }
//
// const getAllProducts = async (req, res) => {
//
//     const products = await productModel.find().sort({date: -1});
//
//     if (products.length === 0) {
//         return res.status(200).json({
//             message: "No Products Found",
//         })
//     }
//     res.status(200).json({
//         success: true,
//         count: products.length,
//         data: products
//     })
// }
//
// const getProductById = async (req, res) => async (req, res) => {
//     productModel
//         .findById(req.params.productId)
//         .then(product => {
//             if (!product) {
//                 return res.status(200).json({
//                     msg: "No product found"
//                 })
//             }
//             res.status(200).json(product)
//         })
//         .catch(err => res.status(404).json(err))
// }
//
//
// const updateProduct = async (req, res) => async (req, res) => {
//     const {name, description, price, productImage} = req.body;
//
//     const product = await productModel.findById(req.params.productId)
//
//     if (!product) {
//         return res.status(404).json({success: false, msg: "No product found"})
//     }
//
//     if (name) product.name = name
//     if (description) product.description = description
//     if (price) product.price = price
//     if (productImage) product.ProductImage= productImage
//
//     const updatedProduct = await product.save()
//     res.status(200).json({success: true, data: updatedProduct})
// }
//
// const deleteProduct = async (req, res) => {
//     productModel
//         .findByIdAndDelete(req.params.productId)
//         .then(product => {
//             if (!product) {
//                 return res.status(200).json({
//                     msg: "No Product Found"
//                 })
//             }
//             res.status(200).json(product)
//         })
//         .catch(err => res.status(404).json(err))
// }
//
// export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }