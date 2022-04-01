import mongoose from "mongoose";
import pumpSchema from "../schemas/pumpSchema.js";
import getFuelsObject from "../utils/getFuelsObject.js";

const pumpModel = mongoose.model("pump", pumpSchema);

const updatePumps = (pumps) => {
  pumps.forEach(async (pump) => {
    try {
      const fuels = getFuelsObject(pump.fuels);

      const res = await pumpModel.updateOne(
        { pumpId: pump.id },
        {
          lastUpdate: new Date(pump.insertDate),
          fuels: { ...fuels },
        }
      );
      if (res.modifiedCount) {
        console.log(pump.id);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export default updatePumps;
