import express, { Request, Response } from "express";
import config from "./config/index";
import { fetchApi, fetchRandomSatellites } from "./api/fetch";
import Satellite from "./modules/satellite";
import { gstime } from "satellite.js";
import Cache from "./modules/cache";

const app = express();
app.use(express.json());

const port = config.port;
const cache = new Cache();

app.get("/api/satellites", async (req: Request, res: Response) => {
  const key = "tle";
  const satellites: string = await fetchApi(
    "https://api.wheretheiss.at/v1/satellites/25544/tles?format=text"
  );

  if (!cache.has(key)) {
    cache.set(key, satellites);
  } else {
    console.log("Using cached data");
  }

  const gmst = gstime(new Date());
  const satellite = new Satellite(cache.get(key), gmst);

  res.json(satellite.geographicCoordinates);
});

app.get("/api/satellites/random", async (req: Request, res: Response) => {
  // TODO: find an API that provides a list of satellites
  const satellites = `
  CALSPHERE 1             
1 00900U 64063C   25018.57241455  .00000969  00000+0  99059-3 0  9995
2 00900  90.2083  60.0550 0026747  54.0607 116.7255 13.75753341   643
CALSPHERE 2             
1 00902U 64063E   25018.57912779  .00000071  00000+0  93731-4 0  9997
2 00902  90.2230  63.8129 0016546 282.6233 232.3565 13.52843172786683
  `;
  const randomSatellite = fetchRandomSatellites(satellites as string);
  res.json({
    geographicCoordinates: randomSatellite.geographicCoordinates,
    name: randomSatellite.name,
  });
});

app.post("/api/satellites", async (req: Request, res: Response) => {
  res.send('POST request to homepage');
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Visit http://localhost:${port}/api/satellites`
  );
});
