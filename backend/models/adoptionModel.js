import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema(
    {
            name: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            city: { type: String, required: true},
            relatedEmail: { type: String, required: true},
            createdAt: { type: Date, expires: 60*60*24*7 , default: Date.now } //expirar depois de 7 dias
    },
    { timestamps: true, }
);
const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;
