const { send } = require("micro");
const ytdl_C = require("ytdl-core");
const { promisify } = require("util");
const microCors = require("micro-cors");
const cors = microCors({ allowMethods: ["GET"] });

const getInfo = promisify(ytdl_C.getInfo);

const polishFormats = (formats) => {
  return formats
    .filter((x) => x.container === "mp4")
    .map((x) => {
      return {
        q: x.qualityLabel,
        size: x.bitrate / 1024,
        dUrl: x.url,
        ext: x.container,
        duration: x.approxDurationMs / 1000 / 60,
      };
    });
};

const getInfoOfVideo = async (videoID) => {
  try {
    const info = await getInfo(videoID);
    return polishFormats(info.formats);
  } catch (error) {
    throw new Error("Error getting data for videoID");
  }
};

const getData = async ({ method, url }) => {
  if (method !== "GET") throw new Error("Only GET method is allowed");

  const { pathname, searchParams } = new URL(url, "https://localhost:3000");
  if (pathname !== "" && pathname !== "/") throw new Error("Route not found");

  const videoID = searchParams.get("id");
  if (!videoID) throw new Error("pass id as query param");
  return await getInfoOfVideo(videoID);
};

const handler = async (req, res) => {
  if (req.url === "/favicon.ico") return send(res, 200, "");

  try {
    const data = await getData(req);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return send(res, 200, { error: false, msg: "Video Info", data });
  } catch (error) {
    return send(res, 400, { error: true, msg: error.message });
  }
};

module.exports = cors(handler);
