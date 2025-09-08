import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
       required: true,
 
    },
    description: {
        type: DataTypes.STRING,
        required: true, 
    },
    type: {
        type: DataTypes.STRING,
        required: true,
    },
    level: {
        type: DataTypes.STRING,
        required: true,
    },
    team_size: {
        type: DataTypes.INTEGER,
       required: true,
        min: 1,
    },
    date: {
        type: DataTypes.DATE,
         required: true,
    },
    location: {
        type: DataTypes.STRING,
         required: true,
    },
    reg_open: {
        type: DataTypes.DATE,
        requiredl: true,
    },
    reg_close: {
        type: DataTypes.DATE,
        required: true,
    },
    contact_name: {
        type: DataTypes.STRING,
         required: true,
    },
    contact_phone: {
        type: DataTypes.STRING,
         required: true,
    },
    contact_email: {
        type: DataTypes.STRING,
        required: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address" ],
    },
    status: {
        type: DataTypes.STRING,
        enm:["draft","open","closed","inprogress","completed"],
        default: "draft",
    },
      created_at: {
        type: DataTypes.DATE,
        default: Date.now,
    },
    update_at: {
        type: DataTypes.DATE,
        default: Date.now,
    },
});

// Activity.sync({ force: false })
//     .then(() => {
//         console.log("Activity table created or already exists");
//     })
//     .catch((error) => {
//         console.log("Error creating Activity table", error);
//     });

export default Activity;