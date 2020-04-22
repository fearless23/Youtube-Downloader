const { getVideoIDInfo, checkValidUrl, makeYoutubeEmbed } = require("./yTube");
const { createInfoContainer } = require("./infoEls");

const input = document.getElementById("ytubeInput");
const btn = document.getElementById("ytubeInputBtn");
const video = document.getElementById("video");


const showYoutubeEmbed = (videoID) => {
  const l = video.children.length;
  for (let i = 0; i < l; i++) {
    video.removeChild(video.children[i]);
  }
  video.appendChild(makeYoutubeEmbed(videoID));
};

btn.addEventListener("click", async () => {
  try {
    const url = input.value;
    input.value = "";

    let videoID = url;
    if (url.length > 10) {
      videoID = checkValidUrl(videoID);
    }

    showYoutubeEmbed(videoID);

    const data = await getVideoIDInfo(videoID);
    createInfoContainer(data);
  } catch (error) {
    console.log("err", error.message);
  }
});
