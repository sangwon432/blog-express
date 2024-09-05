import mongoose, {Schema} from "mongoose";
const schema = mongoose.Schema;

const blogSchema = new Schema(
    {
            title: {
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

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;