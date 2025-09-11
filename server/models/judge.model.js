import User from "./user.model";

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
    hook: {
        befaultCreate: (judge) => {
          judge.type = "judge";
        },
    }
  }
);

export default Judge;