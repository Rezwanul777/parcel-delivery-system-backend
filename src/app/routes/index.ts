import { Router } from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ParcelRoutes } from "../modules/parcel/parcel.route";



export const router = Router();

const moduleRoutes = [
  {
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});