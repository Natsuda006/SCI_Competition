import { Op } from "sequelize";
import Activity from "../models/activity.model.js";
import db from "../models/index.js";

const User = db.User;

const activityControllers = {};

// Helper function to check if user is admin or teacher
const checkUserPermission = async (req, res) => {
    try {
        console.log("Activity Controller - Checking user permission for user ID:", req.userId);
        const user = await User.findByPk(req.userId);
        if (!user) {
            console.log("Activity Controller - User not found");
            return res.status(404).send({ message: "User not found!" });
        }
        
        console.log("Activity Controller - User type:", user.type);
        
        if (user.type !== "admin" && user.type !== "teacher") {
            console.log("Activity Controller - User does not have permission");
            return res.status(403).send({ message: "Require admin or teacher role!" });
        }
        
        console.log("Activity Controller - User has permission");
        return user;
    } catch (error) {
        console.log("Activity Controller - Error checking permission:", error);
        return res.status(500).send({ message: error.message });
    }
};

activityControllers.create = async (req, res) => {
    console.log("Activity Controller - Create activity request received");
    console.log("Activity Controller - Request body:", req.body);
    
    // Check if user has permission to create activities
    const user = await checkUserPermission(req, res);
    if (!user || user.message) return; // If there's an error message, we've already sent a response

    const { name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_email, contact_phone, status } = req.body;

    // Check for required fields
    if (!name) {
        return res.status(400).send({ message: "Name is required!" });
    }
    
    if (!description) {
        return res.status(400).send({ message: "Description is required!" });
    }
    
    if (!type) {
        return res.status(400).send({ message: "Type is required!" });
    }
    
    if (!level) {
        return res.status(400).send({ message: "Level is required!" });
    }
    
    if (team_size === undefined || team_size === null) {
        return res.status(400).send({ message: "Team size is required!" });
    }
    
    if (!date) {
        return res.status(400).send({ message: "Date is required!" });
    }
    
    if (!location) {
        return res.status(400).send({ message: "Location is required!" });
    }
    
    if (!reg_open) {
        return res.status(400).send({ message: "Registration open date is required!" });
    }
    
    if (!reg_close) {
        return res.status(400).send({ message: "Registration close date is required!" });
    }
    
    if (!contact_name) {
        return res.status(400).send({ message: "Contact name is required!" });
    }
    
    if (!contact_email) {
        return res.status(400).send({ message: "Contact email is required!" });
    }
    
    if (!contact_phone) {
        return res.status(400).send({ message: "Contact phone is required!" });
    }
    
    if (!status) {
        return res.status(400).send({ message: "Status is required!" });
    }

    try {
        const existingActivity = await Activity.findOne({ where: {name:name} });
        if(existingActivity) {
            return res.status(400).send({ message: "Activity already exists!" });
        }

        const newActivity = {
          name,
          description,
          type,
          level,
          team_size: parseInt(team_size),
          date: new Date(date),
          location,
          reg_open: new Date(reg_open),
          reg_close: new Date(reg_close),
          contact_name,
          contact_email,
          contact_phone,
          status,
        };

        const activity = await Activity.create(newActivity);
        res.status(201).send(activity);
    } catch (err) {
        res.status(500).send({ message: err.message || "Something error" });
    }
}

activityControllers.getAll = async (req, res) => {
  try {
    const data = await Activity.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
}

activityControllers.getById = async(req, res) => {
  try {
    const id = req.params.id;
    const data = await Activity.findOne({where: {id}});
    if (!data) {
      return res.status(404).send({message: "Activity not found by id: " + id});
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
}

activityControllers.update = async (req, res) => {
    // Check if user has permission to update activities
    const user = await checkUserPermission(req, res);
    if (!user || user.message) return; // If there's an error message, we've already sent a response

  const id = req.params.id;

  const {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_email,
    contact_phone,
    status,
  } = req.body;

  if (
    !name &&
    !description &&
    !type &&
    !level &&
    !team_size &&
    !date &&
    !location &&
    !reg_open &&
    !reg_close &&
    !contact_name &&
    !contact_email &&
    !contact_phone &&
    !status
  ) {
    return res.status(400).send({ message: "Data can not be empty!" });
  }

  const newActivity = {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_email,
    contact_phone,
    status,
  };

  try {
    const [num] = await Activity.update(newActivity, { where: { id } });
    if (num === 1) {
      res.send({ message: "Updated success!" });
    } else {
      res.status(404).send({
        message: `Cannot update Activity with id: ${id}. Maybe Activity not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

activityControllers.delete = async (req, res) => {
    // Check if user has permission to delete activities
    const user = await checkUserPermission(req, res);
    if (!user || user.message) return; // If there's an error message, we've already sent a response

  const id = req.params.id;
  try {
    const num = await Activity.destroy({ where: { id } });
    if (num == 1) {
      res.send({ message: "Deleted success!" });
    } else {
      res.status(404).send({
        message: `Cannot Deleted Activity with id: ${id}. Maybe Activity not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something error while "Deleted by id: ${id}" the Activity`,
    });
  }
}

activityControllers.search = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res
        .status(400)
        .send({ message: "Missing 'name' query parameter." });
    }

    const activities = await Activity.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    res.send(activities);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export default activityControllers;