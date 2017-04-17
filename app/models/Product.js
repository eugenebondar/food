import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: String,
    proteins: Number,
    fats: Number,
    carbohydrates: Number,
    cal: Number
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);
