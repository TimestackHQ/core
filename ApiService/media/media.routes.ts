import { Router } from "express";
import { HTTPValidator, authCheck } from "../../shared";
import multer from "multer";
import {
    uploadCover,
    get,
    deleteMemories,
    viewMedia,
    createMedia
} from "./media.controller";
import { deleteMemoriesValidator, createMediaValidator } from "./media.validator";
const upload = multer();

const router: Router = Router()

router.post("/", authCheck, upload.fields([{ name: 'mediaFile', maxCount: 1 }, { name: "mediaThumbnail", maxCount: 1 }]), HTTPValidator(createMediaValidator, "query"), createMedia);
router.post("/:holderId/delete", authCheck, HTTPValidator(deleteMemoriesValidator), deleteMemories);
router.get("/:mediaId", get);
router.get("/view/:mediaId/:holderId", authCheck, viewMedia);
router.post("/:mediaId/link/:holderId", authCheck, HTTPValidator(deleteMemoriesValidator));


export default router;