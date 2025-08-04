"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandelar_1 = require("./app/middlewares/globalErrorHandelar");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
// import notFound from "./app/middlewires/notFound";
// import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "parcel delivery system",
    });
});
app.use(globalErrorHandelar_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
