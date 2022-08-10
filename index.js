import path from path;
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetchRegionPumps from "./modules/fetchRegionPumps.js";
import savePumps from "./modules/savePumps.js";
import updatePumps from "./modules/updatePumps.js";
import regions from "./utils/regions.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/.env" });

try {
  console.log(`Trying to connect to localhost...`);
  await mongoose.connect(
    "mongodb://admin:Get2FuelDB@localhost:27017/osservaprezzi?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
  );
  console.log("Connection succeded");
} catch (error) {
  console.error("Connection failed");
  console.error(error);
  try {
    console.log(`Trying to connect to ${process.env.LOCAL_IP}...`);
    await mongoose.connect(
      `mongodb://${process.env.LOCAL_IP}:27017/osservaprezzi`,
      {
        authSource: "admin",
        user: process.env.USER,
        pass: process.env.PW,
      }
    );
    console.log("Connection succeded");
  } catch (error) {
    console.error("Connection failed");
    console.error(error);
    try {
      console.log(`Trying to connect to ${process.env.REMOTE_IP}...`);
      await mongoose.connect(
        `mongodb://${process.env.REMOTE_IP}:27017/osservaprezzi`,
        {
          authSource: "admin",
          user: process.env.USER,
          pass: process.env.PW,
        }
      );
    } catch (error) {
      console.error("Connection failed");
      console.error(error);
    }
  }
}

for (let i = 1; i <= 20; i++) {
  console.log(`Fetching data for region ${i}: ${regions[i]}`);
  const fetchedPumps = await fetchRegionPumps(i);
  console.log("Fetching complete");
  // savePumps(fetchedPumps, i);
  updatePumps(fetchedPumps);
  console.log(`Saving entries for region ${i}: ${regions[i]} to DB`);
  if (i === 20) {
    i = 0;
  }
}

console.log("finish");
