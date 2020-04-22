const base = "https://ytubedownapi.herokuapp.com?id=";

const getVideoIDInfo = async function (videoID) {
  try {
    const xx = await fetch(`${base}${videoID}`);
    const yy = await xx.json();
    return yy.data;
  } catch (error) {
    throw new Error("Error getting Data");
  }
};

const checkValidUrl = function (youtubeUrl) {
  const { pathname, origin, searchParams } = new URL(youtubeUrl);

  if (
    origin !== "https://youtube.com" &&
    origin !== "https://www.youtube.com"
  ) {
    throw new Error("Invalid Youtube URL");
  }

  if (pathname !== "/watch") {
    throw new Error("Not a Youtube Video URL");
  }

  const videoID = searchParams.get("v");
  if (!videoID) {
    throw new Error("Not a Youtube Video URL");
  }

  return videoID;
};

const makeYoutubeEmbed = (videoID) => {
  const xx = document.createElement("iframe");
  xx.width = "560";
  xx.height = "560";
  xx.src = `https://www.youtube-nocookie.com/embed/${videoID}`;
  xx.frameBorder = 0;
  xx.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  xx.allowFullscreen = true;
  return xx;
};

module.exports = { getVideoIDInfo, checkValidUrl, makeYoutubeEmbed };
