import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false
  }
},{
  hook: {
    beforeCreate: async (user) => {
      if(user.password){
        const salt = bcrypt.genSalt(10)
        // await bcrypt.hash(user.password) == bcrypt.hashsync(user.password)
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if(user.changed('password')){
        const salt = bcrypt.genSalt(10);
        // await bcrypt.hash(user.password) == bcrypt.hashsync(user.password)
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function (candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
}

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error createing table", error);
  });

export default User;