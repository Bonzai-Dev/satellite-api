import express, { Request, Response } from "express";
import config from "../../config/index.js";
import { RoutesStatus } from "../../utils/index.js";
import cache from "../../modules/cache.js";

const router = express.Router();
const routes = config.routes;
router.get(routes.get.satellites, async (req: Request, res: Response) => {
  RoutesStatus.successfullRequest(res, cache.get(config.cacheKeys.satellites));
});

export default router;