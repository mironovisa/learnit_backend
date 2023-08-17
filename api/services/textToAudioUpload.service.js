const { pipeline } = require("stream/promises");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doqkfgbhz",
  api_key: "541349771793653",
  api_secret: "E5_PjlK_ijRlkJsF_UxbWe8ZQwY",
});

async function generateAudioAndUpload(text) {
  const APIKEY = "4D45p0xE9E7tdn2UTJFn576mIhk5HrR66DqE3VFd";
  const voice = "lior";

  try {
    // Use dynamic import for the 'got' module
    const { default: got } = await import("got");

    const response = await pipeline(
      Readable.from([text]),
      got.stream.post(
        `https://api.narakeet.com/text-to-speech/m4a?voice=${voice}`,
        {
          headers: {
            accept: "application/octet-stream",
            "x-api-key": APIKEY,
            "content-type": "text/plain",
          },
        }
      ),
      createWriteStream("result.m4a")
    );

    // Upload the m4a file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload("result.m4a", {
      resource_type: "raw",
      public_id: `hebrew_audio_${Date.now()}`, // Specify a unique public_id for Cloudinary
    });

    console.log("Cloudinary response:", cloudinaryResponse);
    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = generateAudioAndUpload;
