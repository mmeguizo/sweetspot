const Maintenance = require("../models/maintenance");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
//maintenance-requests
//addMaintenance
module.exports = (router) => {
  router.post("/maintenance-requests", async (req, res) => {
    const { name, email, unitNumber, serviceType, summary, details } = req.body;

    const newMaintenance = new Maintenance({
      id: uuidv4(),
      name,
      email,
      unitNumber,
      serviceType,
      summary,
      details,
    });

    try {
      const savedMaintenance = await newMaintenance.save();
      const { __v, ...maintenanceDoc } = savedMaintenance._doc;
      res.json({
        success: true,
        message: "Maintenance request created successfully",
        data: maintenanceDoc,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error creating maintenance request",
        error: err,
      });
    }
  });

  router.get("/getAllMaintenance", async (req, res) => {
    try {
      const allMaintenances = await Maintenance.find({}, "-__v -_id").lean();
      res.json({
        success: true,
        message: "Maintenance requests fetched successfully",
        data: allMaintenances,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error fetching maintenance requests",
        error: err,
      });
    }
  });

  router.put("/updateMaintenance/:id", async (req, res) => {
    const { name, email, unitNumber, serviceType, summary, details } = req.body;
    const id = req.params.id;
    try {
      const maintenance = await Maintenance.findByIdAndUpdate(
        id,
        {
          name,
          email,
          unitNumber,
          serviceType,
          summary,
          details,
        },
        { new: true }
      );

      const { __v, ...returnDoc } = maintenance._doc;

      res.json({
        success: true,
        message: "Maintenance request updated successfully",
        data: returnDoc,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error updating maintenance request",
        error: err,
      });
    }
  });

  router.delete("/deleteMaintenance/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const maintenance = await Maintenance.findByIdAndDelete(id);
      const { __v, ...returnDoc } = maintenance._doc;

      res.json({
        success: true,
        message: "Maintenance request deleted successfully",
        data: returnDoc,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error deleting maintenance request",
        error: err,
      });
    }
  });

  return router;
};
