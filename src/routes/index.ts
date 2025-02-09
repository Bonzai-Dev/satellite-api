import searchRoute from "./get/search";
import randomSatelliteRoute from "./get/randomSatellite";
import postRoute from "./post/postSatellites";
import satellitesRoute from "./get/satellites";
import postedSatellitesRoute from "./get/postedSatellites";

const get = {
  searchRoute,
  randomSatelliteRoute,
  satellitesRoute,
  postedSatellitesRoute,
};
const post = { postRoute };

export default { get, post };
