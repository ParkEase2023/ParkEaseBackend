const axios = require("axios");

const url = "https://notify-api.line.me/api/notify";
const key = "AJQ2TaZqmdhPxUCQIiwLHjP5Ep7D3Cv1oKVzjhkJh9Y";
let message = "Parkease Backend has been deploy on http://backend.parkease.site/";

async function sendSticker(message, stickerPackageId, stickerId) {
  try {
    const params = new URLSearchParams();
    params.append("message", message);
    params.append("stickerPackageId", stickerPackageId.toString());
    params.append("stickerId", stickerId.toString());
    await axios.post(url, params, {
      headers: {
        Authorization: "Bearer " + key,
      },
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}

async function send() {
  try {
    const params = new URLSearchParams();
    params.append("message", message);
    await axios.post(url, params, {
      headers: {
        Authorization: "Bearer " + key,
      },
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}

// Example usage
sendSticker(message, 11537, 52002734);
