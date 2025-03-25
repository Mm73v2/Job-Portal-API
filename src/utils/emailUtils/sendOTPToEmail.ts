import transporter from "../../config/nodemailerConfig";

type TSendOTPToEmail = {
  to: string;
  html: string;
};

const sendOTPToEmail = async (data: TSendOTPToEmail) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    ...data,
    from: "'Job Portal' <mohamedabobakr04@gmail.com",
    subject: "Verify Your Email",
    text: "Here is your otp code",
  });

  console.log("Message sent: %s", info.messageId);
};

export default sendOTPToEmail;
