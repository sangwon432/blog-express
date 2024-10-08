import mongoose, {Schema} from "mongoose";
const schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        productImage: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const productModel = mongoose.model("product", productSchema);

export default productModel;