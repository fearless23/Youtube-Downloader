const createInfoDiv = (infoItem) => {
  const xx = document.createElement("div");
  xx.classList.add("info");
  xx.innerHTML = `
    <p><span>Quality</span> ${infoItem.q}</p>
    <p><span>Size</span> ${infoItem.size}</p>
    <a href="${infoItem.dUrl}" target="blank">Download</a>
  `;
  return xx;
};

const createSingleFormatInfoContainer = (data) => {
  const container = document.createElement("div");
  container.classList.add("infoContainer");
  for (let item of data) {
    container.appendChild(createInfoDiv(item));
  }
  return container;
};

const createTypeLabel = (type, ext, time) => {
  const label = document.createElement("div");
  label.classList.add('infoLabel')
  label.innerHTML = `
      <span>${type.toUpperCase()}(${ext})</span>
      <span>Duration: ${time}</span>
    `;
  return label;
};

const createInfoContainer = ({ audios, videos, ext, time }) => {
  const xx = document.getElementById("infoWrapper");
  if (videos.length > 0) {
    xx.appendChild(createTypeLabel("videos", ext, time));
    xx.appendChild(createSingleFormatInfoContainer(videos));
  }

  if (audios.length > 0) {
    xx.appendChild(createTypeLabel("audios", ext, time));
    xx.appendChild(createSingleFormatInfoContainer(audios));
  }

  return xx;
};

module.exports = { createInfoContainer };
