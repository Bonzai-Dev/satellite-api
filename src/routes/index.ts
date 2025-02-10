import searchRoute from "./get/search.js";
import randomSatelliteRoute from "./get/randomSatellite.js";
import postRoute from "./post/postSatellites.js";
import satellitesRoute from "./get/satellites.js";
import postedSatellitesRoute from "./get/postedSatellites.js";

const get = {
  searchRoute,
  randomSatelliteRoute,
  satellitesRoute,
  postedSatellitesRoute,
};
const post = { postRoute };

export default { get, post };
