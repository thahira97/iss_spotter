const request = require("request");
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = function (ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    const data = {
      latitude,
      longitude,
    };
    if (error) {
      return callback(error, null);
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    return callback(null, data);
  });
};
const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200 || coords === false) {
        const msg = `Status Code ${response.statusCode} when fetching FlyOverTimes. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const parsedBody = JSON.parse(body);

      return callback(null, parsedBody.response);
    }
  );
};
module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes };
