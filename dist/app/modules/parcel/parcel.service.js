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
exports.ParcelService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const trackingID_1 = require("../../utils/trackingID");
const user_model_1 = require("../users/user.model");
const parcel_interface_1 = require("./parcel.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const parcel_model_1 = require("./parcel.model");
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = payload.sender;
    const sender = yield user_model_1.User.findById(senderId);
    if (!sender) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Sender not found.");
    }
    if (sender.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Blocked users cannot create parcels.");
    }
    const trackingId = (0, trackingID_1.generateTrackingId)();
    const parcelData = Object.assign(Object.assign({}, payload), { trackingId, currentStatus: "Requested", statusLogs: [
            {
                status: "Requested",
                timestamp: new Date(),
                updatedBy: "system",
                note: "Parcel created",
            },
        ] });
    const parcel = yield parcel_model_1.Parcel.create(parcelData);
    return parcel;
});
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find();
    const total = yield parcel_model_1.Parcel.countDocuments();
    return {
        meta: {
            total,
        },
        data: parcels,
    };
});
const getSingleParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.findById(id);
});
const updateParcel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    // Handle status change and log it
    if (payload.currentStatus && payload.currentStatus !== parcel.currentStatus) {
        parcel.statusLogs.push({
            status: payload.currentStatus,
            timestamp: new Date(),
            updatedBy: "admin", //  req.user.role
            note: payload.note || `Status updated to ${payload.currentStatus}`,
        });
        parcel.currentStatus = payload.currentStatus;
    }
    Object.assign(parcel, payload);
    yield parcel.save();
    return parcel;
});
const getParcelsBySenderId = (senderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.find({ sender: senderId });
});
const cancelParcel = (parcelId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId, sender: senderId });
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found or access denied");
    if (parcel.currentStatus !== "Requested") {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel cannot be canceled after dispatch");
    }
    parcel.currentStatus = parcel_interface_1.ParcelStatus.CANCELLED;
    parcel.statusLogs.push({
        status: parcel_interface_1.ParcelStatus.CANCELLED,
        timestamp: new Date(),
        updatedBy: "sender",
        note: "Cancelled by sender",
    });
    yield parcel.save();
    return parcel;
});
const confirmParcelDelivery = (parcelId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId, receiver: receiverId });
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found or access denied");
    if (parcel.currentStatus === "Delivered")
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Already delivered");
    if (parcel.currentStatus === "Cancelled")
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel has Already cancelled by sender, can't confirm. !!");
    if (parcel.isBlocked === true)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, " Parcel is blocked ");
    parcel.currentStatus = parcel_interface_1.ParcelStatus.DELIVERED;
    parcel.statusLogs.push({
        status: parcel_interface_1.ParcelStatus.DELIVERED,
        timestamp: new Date(),
        updatedBy: "receiver",
        note: "Confirmed by receiver",
    });
    yield parcel.save();
    return parcel;
});
const getIncomingParcelsByReceiver = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.find({
        receiver: receiverId,
        currentStatus: { $nin: ["Cancelled", "Delivered"] }, // exclude these statuses
    });
});
const toggleParcelBlock = (parcelId, block) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    parcel.isBlocked = block;
    parcel.statusLogs.push({
        status: parcel.currentStatus,
        timestamp: new Date(),
        updatedBy: "admin",
        note: block
            ? "Parcel was blocked by admin"
            : "Parcel was unblocked by admin",
    });
    yield parcel.save();
    return parcel;
});
const deleteParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.findByIdAndDelete(id);
});
exports.ParcelService = {
    createParcel,
    getAllParcels,
    getSingleParcel,
    deleteParcel,
    updateParcel,
    getParcelsBySenderId,
    cancelParcel,
    getIncomingParcelsByReceiver,
    confirmParcelDelivery,
    toggleParcelBlock,
};
