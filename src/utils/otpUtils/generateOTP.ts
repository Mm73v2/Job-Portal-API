const generateOTP = (): string =>
  Math.floor(Math.random() * 9000 + 1000).toString();

export default generateOTP;
