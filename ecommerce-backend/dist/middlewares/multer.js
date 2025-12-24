import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        // callback(null, file.originalname)
        // If we gon with this file name consider that we have two files of the same name then how the files will be distinguised, for it we will use the uuid package which generate the unique id , we will use that to save the file and each saved file will be of unique nanme, rather there name is same. 
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        callback(null, `${id}.${extName}`);
    }
});
export const singleUpload = multer({ storage }).single("photo");
// When we will use this middleware and use it in user route before the final controller, then the file which we will add in frontend will be uploaded over there.
// This middleware will be used in user, product and so and so forth.
