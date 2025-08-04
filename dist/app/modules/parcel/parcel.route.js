"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../users/user.interface");
const parcel_controller_1 = require("./parcel.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const parcel_validation_1 = require("./parcel.validation");
const router = express_1.default.Router();
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.getAllParcels);
// sender
router.post("/create", (0, validateRequest_1.validateRequest)(parcel_validation_1.createParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER), parcel_controller_1.ParcelController.createParcel);
// sender  & receiver 
router.get("/my-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER, user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.getMyParcels);
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.getIncomingParcels);
router.get("/track/:trackingId", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER, user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.trackParcelHistory);
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER), parcel_controller_1.ParcelController.cancelParcel);
router.patch("/confirm/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.confirmDelivery);
router.patch("/block/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.blockParcel);
router.patch("/unblock/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.unblockParcel);
router.patch("/update/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(parcel_validation_1.updateParcelZodSchema), parcel_controller_1.ParcelController.updateParcel);
router.delete("/delete/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.deleteParcel);
exports.ParcelRoutes = router;
