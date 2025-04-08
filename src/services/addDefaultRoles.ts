import { Role } from "../models";

const addDefaultRoles = async () => {
  const roles = ["jobSeeker", "jobProvider"];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { role }, // Check if the role already exists
      defaults: { role }, // If not, create the role
    });
  }
};

export default addDefaultRoles;
