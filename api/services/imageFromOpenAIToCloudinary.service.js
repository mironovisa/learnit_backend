const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "doqkfgbhz",
  api_key: "541349771793653",
  api_secret: "E5_PjlK_ijRlkJsF_UxbWe8ZQwY",
});

async function uploadImageToCloudinary(imageUrl) {
  try {
    // Download the image from the provided URL and upload it to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl);

    // Return the Cloudinary URL of the uploaded image
    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
}

module.exports = {
  uploadImageToCloudinary,
};
