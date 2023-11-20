import mongoose from "mongoose";



interface IUser extends mongoose.Document{
    fullName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isVerified: boolean;
    country: string;
    city: string;
    postalCode: string;
    streetAddress: string;
}

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
        min:2,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide your email"],
        min: 6,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: 0,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    PostalCode: {
        type: String,
        trim: true,
    },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;