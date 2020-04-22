const { calcSize, calcTime } = require("./timeCalc");

const createInfoDiv = (infoItem) => {
  const xx = document.createElement("div");
  xx.classList.add("info");
  xx.innerHTML = `
    <p><span>Quality</span> ${infoItem.q} ${infoItem.ext}</p>
    <p><span>Duration</span> ${calcTime(infoItem.duration)}</p>
    <p><span>Size</span> ${calcSize(infoItem.size)}</p>
    <a href="${infoItem.dUrl}" target="blank">Download</a>
  `;
  return xx;
};

const createInfoContainer = (infoArr) => {
  const xx = document.createElement("div");
  xx.classList.add("infoContainer");
  for (let item of infoArr) {
    xx.appendChild(createInfoDiv(item));
  }
  return xx;
};

module.exports = { createInfoContainer };
