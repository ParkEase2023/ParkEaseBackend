import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadImage = (file: string) => {
    console.log(file);
    const aom = cloudinary.v2.uploader.upload(file, { folder: process.env.CLOUDINARY_FOLDER });
    console.log('Uploading image', aom);
    return aom
};
