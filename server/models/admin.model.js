import User from "./user.model";

const Admin = User.init(
    {},
  {
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
    hook: {
        befaultCreate: (admin) => {
          admin.type = "admin";
        },
    }
  }
);

export default Admin;