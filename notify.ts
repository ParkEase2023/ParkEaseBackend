import axios from "axios";

const url: string = "https://notify-api.line.me/api/notify";
const key: string = "AJQ2TaZqmdhPxUCQIiwLHjP5Ep7D3Cv1oKVzjhkJh9Y";
let message: string = "Parkease Backend has been deploy on http://backend.parkease.site/";

async function sendSticker(message: string, stickerPackageId: number, stickerId: number): Promise<void> {
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
  } catch (error:any) {
    console.log(error.response?.data?.message || error.message);
  }
}

async function send(): Promise<void> {
  try {
    const params = new URLSearchParams();
    params.append("message", message);
    await axios.post(url, params, {
      headers: {
        Authorization: "Bearer " + key,
      },
    });
  } catch (error:any) {
    console.log(error.response?.data?.message || error.message);
  }
}

// Example usage
sendSticker(message, 11537, 52002734);
