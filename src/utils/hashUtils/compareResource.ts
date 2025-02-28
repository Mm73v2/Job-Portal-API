import bcrypt from "bcrypt";
const compareResource = (resource: string, encryptedResource: string) => {
  return bcrypt.compareSync(resource, encryptedResource);
};

export default compareResource;
