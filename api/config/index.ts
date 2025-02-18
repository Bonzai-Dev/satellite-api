import "dotenv/config";
const config = {
  port: process.env.PORT,
  routes: {
    get: {
      satellites: "/get/satellites",
      randomSatellite: "/get/satellites/random",
      search: "/get/satellites/search/:id", 
      postedSatellite: "/get/posted-satellites",
    },

    post: {
      postSatellite: "/post/post-satellite",
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
