const cloundinary = require('cloudinary').v2;
const multer = require('multer');

cloundinary.config({
    cloud_name : 'dkse7bs6w',
    api_key : '673371679819917',
    api_secret : 'kt81Pffx8K853ZmEGyVitnVqUqE',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
    const result = await cloundinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const upload = multer({storage})

module.exports = { upload, imageUploadUtil };