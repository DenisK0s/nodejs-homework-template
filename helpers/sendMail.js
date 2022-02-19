const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* eslint-disable */
const sendMail = async (data) => {
  try {
    const newMail = { ...data, from: "kostenkoden89@gmail.com" };
    await sgMail.send(newMail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
