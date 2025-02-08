import multer from 'multer'


const storage=multer.memoryStorage();

//middleware for checking the file type 
const filterFiles=(req,file,cb)=>{
const alloweFileTypes=["image/jpeg", "image/png", "image/webp","image/jpg","image/avif"];
try {
    if(alloweFileTypes.includes(file.mimetype)){
        return cb(null,true)
    }else{
        return cb(new Error("Invalid file types only images are allowed"),false)
        }
        
} catch (error) {
return cb(new Error("Invalid file type. Only JPEG, PNG, WebP, JPG, and AVIF are allowed."), false);
}}

export const upload=multer({
storage:storage,
limits: { fileSize: 5 * 1024 * 1024 },
fileFilter:filterFiles
})
