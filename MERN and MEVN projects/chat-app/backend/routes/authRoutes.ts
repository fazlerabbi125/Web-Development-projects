import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Express, Request } from "express";
import { checkAuth, guest } from "../middlewares/authMiddleware";

export type MulterStorageCallback = (error: Error | null, destination: string) => void;

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: MulterStorageCallback) {
        cb(null, path.join(__dirname, "uploads", "profile"));
    },
    filename: function (req, file: Express.Multer.File, cb) {
        +path.extname(file.originalname);
        const filename =
            Date.now() +
            "-" +
            file.fieldname +
            "-" +
            file.originalname.split(".")[0].replace(/\ /g, "");
        cb(null, filename + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        // To reject this file pass `false`, like so: cb(null, false)
        // To accept the file pass `true`, like so: cb(null, true)
        // You can always pass an error if something goes wrong: cb(new Error('I don\'t have a clue!'))
        if (file) {
            if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    },
});
