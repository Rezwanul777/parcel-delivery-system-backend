"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import notFound from "./app/middlewires/notFound";
// import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
// import { router } from "./app/routes";
// import cookieParser from "cookie-parser";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(cookieParser());
// app.use("/api/", router)
app.get("/", (req, res) => {
    res.status(200).json({
        message: "parcel delivery system",
    });
});
// app.use(globalErrorHandler) ;
// app.use(notFound) ;
exports.default = app;
