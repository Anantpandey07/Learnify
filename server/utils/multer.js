import multer from "multer";

const upload = multer({dest: "uploads/"}); // creating a folder on server name uploads;

export default upload;