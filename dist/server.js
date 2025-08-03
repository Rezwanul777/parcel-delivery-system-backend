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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
// import { seedSuperAdmin } from "./utils/seedSuperAdmin";
let server;
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(env_1.envVars.NODE_ENV);
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log('database is connected');
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server is running on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createServer();
    // await seedSuperAdmin();// create super admin after server start
}))();
// signal handeling
process.on('SIGTERM', () => {
    console.log('SIGTERM--signal is received');
    if (server) {
        server.close();
    }
    process.exit(1);
});
// server error handeling unhandeling
process.on('unhandledRejection', error => {
    if (server) {
        server.close(() => {
            console.log(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// server error handeling uncaught
process.on('uncaughtException', error => {
    if (server) {
        server.close(() => {
            console.log(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
