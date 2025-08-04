"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../users/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userToken_1 = require("../../utils/userToken");
const env_1 = require("../../config/env");
const credentialsLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = {
        email: (_a = payload.email) === null || _a === void 0 ? void 0 : _a.trim(),
        password: (_b = payload.password) === null || _b === void 0 ? void 0 : _b.trim()
    };
    const isUserExist = yield user_model_1.User.findOne({ email }).select('+password');
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Email does not exist');
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(String(password), String(isUserExist.password));
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Incorrect Password');
    }
    const userTokens = (0, userToken_1.createUserTokens)(isUserExist);
    const _c = isUserExist.toObject(), { password: _removed } = _c, rest = __rest(_c, ["password"]);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    };
});
// const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
//     const user = await User.findById(decodedToken.userId)
//     const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
//     if (!isOldPasswordMatch) {
//         throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
//     }
//     user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
//     user!.save();
// }
const changePassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Old Password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    yield user.save();
});
exports.AuthServices = {
    credentialsLogin,
    changePassword
    // getNewAccessToken,
    // resetPassword
};
