import express, { Request, Response } from "express";
import config from "../../config";
import { RoutesStatus } from "../../utils";
import cache from "../../modules/cache";

const router = express.Router();
const routes = config.routes;
router.get(routes.get.satellites, async (req: Request, res: Response) => {
  RoutesStatus.successfullRequest(res, cache.get(config.cacheKeys.satellites));
});

export default router;