const { calcSize, calcTime } = require("./timeCalc");
const { send } = require("micro");
const ytdl_C = require("ytdl-core");
const { promisify } = require("util");
const microCors = require("micro-cors");
const cors = microCors({ allowMethods: ["GET"] });
const getInfo = promisify(ytdl_C.getInfo);

const extractInfo = (x) => {
  return {
    q: x.qualityLabel || x.quality,
    size: calcSize(x.bitrate, x.approxDurationMs),
    dUrl: x.url,
  };
};

const polishFormats = (formats, reqFormat) => {
  const videos = [];
  const audios = [];

  let time = null;

  for (let i = 0; i < formats.length; i++) {
    const { container, mimeType, approxDurationMs } = formats[i];
    if (container === "mp4") {
      const type = mimeType.split("/")[0].toLowerCase();
      if (!time) {
        time = calcTime(approxDurationMs);
      }

      if (reqFormat === "video") {
        if (type === "video") videos.push(extractInfo(formats[i]));
      } else if (reqFormat === "audio") {
        if (type === "audio") audios.push(extractInfo(formats[i]));
      } else {
        if (type === "video") videos.push(extractInfo(formats[i]));
        if (type === "audio") audios.push(extractInfo(formats[i]));
      }
    }
  }

  return { videos, audios, time, ext: "mp4" };
};

const getInfoOfVideo = async (videoID, reqFormat) => {
  try {
    const info = await getInfo(videoID);
    return polishFormats(info.formats, reqFormat);
  } catch (error) {
    console.log("ERROR", error);
    throw new Error("Error getting data for videoID");
  }
};

const getData = async ({ method, url }) => {
  if (method !== "GET") throw new Error("Only GET method is allowed");

  const { pathname, searchParams } = new URL(url, "https://localhost:3000");
  if (pathname !== "" && pathname !== "/") throw new Error("Route not found");

  const videoID = searchParams.get("id");
  if (!videoID) throw new Error("pass id as query param");
  const reqFormat = searchParams.get("format");
  return await getInfoOfVideo(videoID, reqFormat);
};

const handler = async (req, res) => {
  if (req.url === "/favicon.ico") return send(res, 200, "");

  try {
    const data = await getData(req);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    return send(res, 200, { error: false, msg: "Video Info", data });
  } catch (error) {
    return send(res, 400, { error: true, msg: error.message });
  }
};

module.exports = cors(handler);
