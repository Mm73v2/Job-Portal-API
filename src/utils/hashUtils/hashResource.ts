import bcrypt from "bcrypt";

const hashResource = (resource: string): string => {
  const hashedPassword = bcrypt.hashSync(resource, 10);
  return hashedPassword;
};

export default hashResource;
