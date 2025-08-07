import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";



    // Configuration all to upoload file on cloudinary 
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


const uploadOnCloudinary = async (localFilePath)=>{
    //  can be occur error so use try and cath error like filepath erro 
    try{
        if(!localFilePath) return ;
        // uload file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        });
        // file has been uploaded successfully  
        console.log("file is uploaded ", response.url);
        return response
    }
    catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed 
        return null;
    }
}

export { uploadOnCloudinary}