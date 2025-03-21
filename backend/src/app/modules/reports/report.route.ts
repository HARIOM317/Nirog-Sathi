import express, { NextFunction, Request, Response } from "express";
import { ReportController } from "./report.controller";
import { AuthUser } from "../../../enums";
import { auth } from "../../middlewares/auth";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";

const router = express.Router();

// Ensure CloudinaryHelper and auth middleware are working correctly.
// router.post('/upload',auth(AuthUser.DOCTOR), ReportController.uploadPdfReport);

router.post(
  "/upload",
  auth(AuthUser.DOCTOR),
  CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("mai call huaa abhi");
    return ReportController.uploadPdfReport(req, res, next);
  }
);

router.get('/patient/:id', auth(AuthUser.PATIENT), ReportController.getPatientReport);

export const ReportRouter = router;
