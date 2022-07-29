import mongoose from 'mongoose';

const customizeSchema = new mongoose.Schema(
    {
        product: { type: String, required: true },
        color: { type: String, required: true },
        width: { type: String, required: true },
        height: { type: String, required: true},
        etc: { type: String, required: true},
        createdAt: { type: Date, default: Date.now },
        name: { type: String, required: true},
        email: { type: String, required: true},
    },
    { timestamps: true }
);
const Customize = mongoose.model('Customize', customizeSchema);

export default Customize;
