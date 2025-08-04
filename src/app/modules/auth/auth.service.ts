/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import  httpStatus  from 'http-status-codes';
import  bcryptjs  from 'bcryptjs';
import { createUserTokens } from "../../utils/userToken";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = {
  email: payload.email?.trim(),
  password: payload.password?.trim()
};
  const isUserExist = await User.findOne({ email }).select('+password');

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email does not exist');
  }

  const isPasswordMatched = await bcryptjs.compare(
    String(password),
    String(isUserExist.password)
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password');
  }

  const userTokens = createUserTokens(isUserExist);
  const { password: _removed, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest
  };
};

// const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

//     const user = await User.findById(decodedToken.userId)

//     const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    
//     if (!isOldPasswordMatch) {
//         throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
//     }

//     user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
//     user!.save();


// }

const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
    const user = await User.findById(decodedToken.userId).select('+password');

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
    await user.save();
}



export const AuthServices = {
    credentialsLogin,
    changePassword
    // getNewAccessToken,
    // resetPassword
}