"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(user_interface_1.UserRole), required: true },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const hashed = await bcryptjs.hash(this.password, 10);
//     this.password = hashed;
//   }
//   next();
// });
exports.User = (0, mongoose_1.model)('User', userSchema);
