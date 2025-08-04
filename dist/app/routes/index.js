"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/users/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const parcel_route_1 = require("../modules/parcel/parcel.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/parcel",
        route: parcel_route_1.ParcelRoutes,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
