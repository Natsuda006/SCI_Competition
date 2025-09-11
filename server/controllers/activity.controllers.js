import { Op, where } from "sequelize";
import Activity from "../models/activity.model.js";

const activityController = {};

activityController.create = async (req, res) => {
    const { name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_email, contact_phone, status } = req.body;

    if (
      (!name ||
        !description ||
        !type ||
        !level ||
        !team_size ||
        !date ||
        !location ||
        !reg_open ||
        !reg_close ||
        !contact_name ||
        !contact_email ||
      !contact_phone || !status)
    ) {
      res.status(400).send({ message: "Data can not be empty!" });
      return;
    }

    await Activity.findOne({ where: {name:name} }).then((ac) => {
        if(ac) {
            res.status(400).send({ message: "Activity already exists!" });
            return;
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

        Activity.create(newActivity).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).send({ message: err.message || "Something error" })
        });
    })
}

activityController.getAll = async (req, res) => {
  await Activity.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({message: err.message});
  })
}

activityController.getById = async(req, res) => {
  const id = req.params.id

  await Activity.findOne({where: {id}}).then((data) => {
    res.send(data);
  }).then((err) => {
    res.status(404).send({message: "Activity not found by id: " + id});
  })
}

activityController.update = async (req, res) => {
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
    res.status(400).send({ message: "Data can not be empty!" });
    return;
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

  await Activity.update(newActivity, { where: { id } })
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Updated success!" });
      } else {
        res.status(404).send({
          message: `Cannot update Activity with id: ${id}. Maybe Activity not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
}

activityController.delete = async (req, res) => {
  const id = req.params.id;
  await Activity.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Deleted success!" });
      } else {
        res.status(404).send({
          message: `Cannot Deleted Activity with id: ${id}. Maybe Activity not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something error while "Deleted by id: ${id}" the Activity`,
      });
    });
}

activityController.search = async (req, res) => {
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



export default activityController;