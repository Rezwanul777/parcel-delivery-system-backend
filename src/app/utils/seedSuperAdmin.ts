import { envVars } from "../config/env";

import bcryptjs from "bcryptjs";
import { User } from "../modules/users/user.model";
import { IAuthProvider, IUser, UserRole } from "../modules/users/user.interface";

export const seedSuperAdmin = async () =>{
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

        if (isSuperAdminExist) {
            console.log("Super Admin Already Exists!");
            return;
        }
        console.log("Start create Super Admin...");
        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super admin",
            role: UserRole.ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]

        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const superadmin = await User.create(payload)
        console.log("Super Admin Created Successfuly! \n");
    } catch (error) {
         console.log(error);
    }
}