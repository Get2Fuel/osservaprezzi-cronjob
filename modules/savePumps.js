import mongoose from "mongoose";
import pumpSchema from "../schemas/pumpSchema.js";
import splitAddress from "../utils/splitAddress.js";
import getFuelsObject from "../utils/getFuelsObject.js";
import regions from "../utils/regions.js";

const pumpModel = mongoose.model("pump", pumpSchema);

const savePumps = (pumps, regionId) => {
  pumps.forEach((pump) => {
    try {
      const fuels = getFuelsObject(pump.fuels);

      const [address, zip, town, province] = splitAddress(pump.address);

      const pumpObj = new pumpModel({
        pumpId: pump.id,
        coordinates: {
          longitude: pump.location.lng,
          latitude: pump.location.lat,
        },
        region: regions[regionId],
        province,
        town,
        zip: typeof zip === "undefined" ? null : zip,
        address: address,
        name: pump.name,
        brand: pump.brand,
        lastUpdate: new Date(pump.insertDate),
        fuels: { ...fuels },
      });

      pumpObj.save();
    } catch (error) {
      console.error(error);
    }
  });
};

export default savePumps;
