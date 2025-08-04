import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../users/user.interface";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";


const router = express.Router();




router.get("/", checkAuth(UserRole.ADMIN), ParcelController.getAllParcels);

// sender
router.post("/create", validateRequest(createParcelZodSchema), checkAuth(UserRole.SENDER) ,ParcelController.createParcel);

// sender  & receiver 
router.get("/my-parcels", checkAuth(UserRole.SENDER, UserRole.RECEIVER), ParcelController.getMyParcels);


router.get("/incoming", checkAuth(UserRole.RECEIVER), ParcelController.getIncomingParcels);



router.get("/track/:trackingId", checkAuth(UserRole.SENDER, UserRole.RECEIVER), ParcelController.trackParcelHistory);



router.patch("/cancel/:id", checkAuth(UserRole.SENDER),  ParcelController.cancelParcel);



router.patch("/confirm/:id", checkAuth(UserRole.RECEIVER), ParcelController.confirmDelivery);



router.patch("/block/:id", checkAuth(UserRole.ADMIN),  ParcelController.blockParcel);
router.patch("/unblock/:id", checkAuth(UserRole.ADMIN),  ParcelController.unblockParcel);




router.patch("/update/:id", checkAuth(UserRole.ADMIN), validateRequest(updateParcelZodSchema), ParcelController.updateParcel);
router.delete("/delete/:id",  checkAuth(UserRole.ADMIN),  ParcelController.deleteParcel);

export const ParcelRoutes = router;