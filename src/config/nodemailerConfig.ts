import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    // type: "OAuth2",
    user: "mohamedabobakr04@gmail.com",
    pass: "puhewvdkofggjmxt",
    // clientId:
    //   "172995117574-60n90ki7cd974aur5br22akfg8q8b2qg.apps.googleusercontent.com",
    // clientSecret: "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",
    // refreshToken:
    //   "1//0418NdMSG1F2BCgYIARAAGAQSNwF-L9Ir40qhyLqy4lh3oHaErnj_htndsT5SZnqms00yfHG3tyuTFcTD2xUSZe1drtywA03fg0E",
  },
});

export default transporter;
