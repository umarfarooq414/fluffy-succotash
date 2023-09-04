const mongoose = require("mongoose");

const genericFilter = async (req, res) => {
  const { modelName, ...filters } = req.body;

  try {
    const Model = mongoose.model(modelName);

    const result = await Model.find(filters);
    res.json(result);
  } catch (error) {
    console.error("Error executing generic filter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { genericFilter };
