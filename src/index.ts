import express, { Request, Response } from "express";
import { readFileSync } from "fs";
import { cache } from "./modules/index.js";
import { fetchApi, SatelliteUtils } from "./utils/index.js";
import config from "./config/index.js";

import Routes from "./routes/index.js";

const app = express();
app.use(express.json());

const port = config.port;
app.use(async (req: Request, res: Response, next) => {
  // For development only
  // const tles = SatelliteUtils.parseTleToJson(readFileSync("src/data/tle.txt", "utf-8"));
  // cache.set(config.cacheKeys.satellites, tles, 3600);
  //

  if (!cache.get(config.cacheKeys.satellites)) {
    console.log("Fetching satellites data");
    const tles = await fetchApi<string>(config.urls.celesTrak);
    const satellites = SatelliteUtils.parseTleToJson(tles);

    cache.set(config.cacheKeys.satellites, satellites, 3600);
  } else {
    console.log("Using existing satellite data");
  }

  next();
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}.`
  );
});

// GET routes
app.use(Routes.get.randomSatelliteRoute);
app.use(Routes.get.searchRoute);
app.use(Routes.get.satellitesRoute);
app.use(Routes.get.postedSatellitesRoute);

// POST routes
app.use(Routes.post.postRoute);