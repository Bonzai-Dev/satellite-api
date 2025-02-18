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
      postSatellite: "/api/post/post-satellite",
    }
  },
  cacheKeys: {
    satellites: "satellites",
  },
  urls: {
    celesTrak: "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
    keepTrack: "https:/.keeptrack.space/v1"
  },
  files: {
    postedSatellites: "../data/posted-satellites.json",
    tles: "../data/tle.txt",
  },
};

export default config;
