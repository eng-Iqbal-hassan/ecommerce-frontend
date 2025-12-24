import multer from "multer";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
export const singleUpload = multer({ storage }).single("photo");
// When we will use this middleware and use it in user route before the final controller, then the file which we will add in frontend will be uploaded over there.
// This middleware will be used in user, product and so and so forth.
