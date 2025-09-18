import User from "./user.model.js";

const Judge = User.init(
    {},
  { 
    scopes: {
      defaultScope: {
        where: {
          type: "judge",
        },
      },
    },
  },
  {
    hooks: {
        befaultCreate: (judge) => {
          judge.type = "judge";
        },
    }
  }
);

export default Judge;