import express, { Request, Response } from "express";
import config from "../../config/index.js";
import { SatelliteUtils, RoutesStatus } from "../../utils/index.js";

import Satellite from "../../modules/satellite.js";
import cache from "../../modules/cache.js";
import routesStatus from "../../utils/routesStatus.js";

const app = express();
app.use(express.json());

const router = express.Router();
const routes = config.routes;

router.get(routes.get.randomSatellite, async (req: Request, res: Response) => {
  console.log("Fetching random satellite");

  try {
    const satellites: Satellite[] = cache.get(config.cacheKeys.satellites) || [];
    const randomSatellite = SatelliteUtils.fetchRandomSatellites(satellites);
    routesStatus.successfullRequest(res, randomSatellite)
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    RoutesStatus.internalServerError(res);
  }
});

export default router;
