import express, { Request, Response } from "express";
import config from "../config/index";
import { parseTleToJson } from "../utils/fetchSatellites";
import cache from "../modules/cache";

import searchRoute from "./get/search";
import randomSatelliteRoute from "./get/randomSatellite";
import postRoute from "./post/postSatellites";
import satellitesRoute from "./get/satellites";
import postedSatellitesRoute from "./get/postedSatellites";

import { fetchApi } from "../utils/fetchApi";
import { readFileSync } from "fs";

const app = express();
app.use(express.json());

const port = config.port;
const routes = config.routes;

app.use(async (req: Request, res: Response, next) => {
  const tles = readFileSync(config.files.tles, "utf-8");
  cache.set(config.cacheKeys.satellites, parseTleToJson(tles), 3600);
  if (!cache.get(config.cacheKeys.satellites)) {
    console.log("Fetching satellites data");
    const tles = await fetchApi<string>(config.urls.tles);
    const satellites = parseTleToJson(tles);

    cache.set(config.cacheKeys.satellites, satellites, 3600);
  } else {
    console.log("Using existing satellite data");
  }

  next();
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Visit http://localhost:${port}${routes.get.satellites}`
  );
});

app.use(randomSatelliteRoute);
app.use(searchRoute);
app.use(satellitesRoute);
app.use(postedSatellitesRoute);

app.use(postRoute);