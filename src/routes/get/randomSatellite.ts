import express, { Request, Response } from "express";
import config from "../../config/index";
import { fetchRandomSatellites } from "../../utils/fetchSatellites";

import Satellite from "../../modules/satellite";
import { internalServerError, successfullRequest } from "../../utils/routesStatus";
import cache from "../../modules/cache";

const app = express();
app.use(express.json());

const router = express.Router();
const routes = config.routes;

router.get(routes.get.randomSatellite, async (req: Request, res: Response) => {
  console.log("Fetching random satellite");

  try {
    const satellites: Satellite[] = cache.get(config.cacheKeys.satellites) || [];
    const randomSatellite = fetchRandomSatellites(satellites);
    successfullRequest(res, randomSatellite)
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    internalServerError(res);
  }
});

export default router;
