import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar";
import notFound from "./app/middlewares/notFound";
// import notFound from "./app/middlewires/notFound";
// import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "parcel delivery system",
  });
});

app.use(globalErrorHandler) ;
app.use(notFound) ;

export default app ;