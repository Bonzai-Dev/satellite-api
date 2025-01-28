import "dotenv/config";
const config = {
  port: process.env.PORT,
  routes: {
    get: {
      satellites: "/api/get/satellites",
      randomSatellite: "/api/get/satellites/random",
      search: "/api/get/satellites/search/:id",
      postedSatellite: "/api/get/posted-satellites",
    },

    post: {
      postSatellite: "/api/post/post-satellites",
    }
  },
  cacheKeys: {
    satellites: "satellites",
  },
  urls: {
    tles: "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
  },
  files: {
    tles: "./src/assets/TLEs.txt",
    coolSatellites: "./src/assets/cool-satellites.json",
  },
};

export default config;
