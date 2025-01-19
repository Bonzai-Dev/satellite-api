import express, { Request, Response } from "express";
import config from "./config/index";
import { fetchApi, fetchSatellites } from "./api/fetch";
import Satellite from "./modules/satellite";
import { gstime } from "satellite.js";

const app = express();
app.use(express.json());
const port = config.port;

app.get("/api/satellites", async (req: Request, res: Response) => {
  const tle: string = await fetchApi( 
    "https://api.wheretheiss.at/v1/satellites/25544/tles?format=text"
  );

  const gmst = gstime(new Date());
  const satellite = new Satellite(tle, gmst);
  
  res.json(satellite.geographicCoordinates);
});

app.get("/api/satellites/random", async (req: Request, res: Response) => {
  res.json(await fetchSatellites("https://api.wheretheiss.at/v1/satellites"));
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Visit http://localhost:${port}/api/satellites`
  );
});
