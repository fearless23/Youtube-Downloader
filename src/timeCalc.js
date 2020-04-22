const calcTime = (timeMS) => {
  const timeInMin = timeMS / 1000 / 60;
  let str = "";
  const hours = Math.floor(timeInMin / 60);
  if (hours !== 0) str += hours.toString() + "H";
  const remMinutes = (timeInMin / 60 - hours) * 60;
  const mins = Math.floor(remMinutes);
  if (mins !== 0) str += ` ${mins.toString()} M`;

  const remSeconds = Math.floor((remMinutes - mins) * 60);
  str += ` ${remSeconds.toString()}S`;
  return str;
};

const precision = (num, deci = 2, str = true) => {
  const x = Math.pow(10, deci);
  const p = Math.floor(num * x) / x;
  if (str) return p.toString();
  return p;
};

const calcSize = (bitrate, durInMs) => {
  const sizeInMB = (((bitrate * durInMs) / 1000 / 60) * 0.0075) / 1024;
  const GB = Math.floor(sizeInMB / 1024);
  if (GB !== 0) return precision(sizeInMB / 1024) + " GB";

  return precision(sizeInMB) + " MB";
};

module.exports = { calcSize, calcTime };
