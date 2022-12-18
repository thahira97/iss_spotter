const { fetchMyIP } = require("./iss");
const { fetchCoordsByIp } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});
fetchCoordsByIp("99.246.105.82", (error, data) => {
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log("It worked! Returned coordinates:", data);
  }
});
fetchISSFlyOverTimes(
  { latitude: "43.5890452", longitude: "-79.6441198" },
  (error, data) => {
    if (error) {
      return console.log("It didn't work!" , error);
    }
    return console.log("It worked! Returned flyover times:",data);
  }
);
