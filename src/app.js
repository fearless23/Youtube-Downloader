const { getVideoIDInfo, checkValidUrl, makeYoutubeEmbed } = require("./yTube");
const { createInfoContainer } = require("./infoEls");

const input = document.getElementById("ytubeInput");
const btn = document.getElementById("ytubeInputBtn");
const video = document.getElementById("video");

btn.addEventListener("click", async () => {
  try {
    const videoID = checkValidUrl(input.value);
    const l = video.children.length;
    for (let i = 0; i < l; i++) {
      video.removeChild(video.children[i]);
    }
    video.appendChild(makeYoutubeEmbed(videoID));

    const data = await getVideoIDInfo(videoID);
    console.log(data);
    video.appendChild(createInfoContainer(data));
  } catch (error) {
    console.log("err", error.message);
  }
});
