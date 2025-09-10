const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendVerification = async (email, otp) => {
  try {
   
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Alert from Dosel Technologies",
      html: `<p>Thankyou for choosing Dosel Technologies <b>${otp}</b> </p> <p> it will be valid for <b> 3 minutes</b></p>`,
    });
    // console.log("Message sent: %s", info);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
};

exports.mailuser = async (email) => {
  try {
   
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "notification from veda global",
      html: `<p>Thankyou for choosing veda global  </p> <p> Your Account created successfully</p>`,
    });
    // console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
};


exports.mailclient = async (formData) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      company,
      quantity,
      message,
    } = formData;

    const htmlContent = `
      <h2>New Request from Veda Global Form</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Email:</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Phone:</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Country:</td><td style="padding: 8px; border: 1px solid #ddd;">${country}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Company:</td><td style="padding: 8px; border: 1px solid #ddd;">${company}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Quantity:</td><td style="padding: 8px; border: 1px solid #ddd;">${quantity}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;">Message:</td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
      </table>
      <p>Thank you for choosing Veda Global!</p>
    `;

    let info = await transporter.sendMail({
      from: `"Veda Global" <${process.env.EMAIL}>`,
      to: email,
      subject: "Request Received – Veda Global",
      html: htmlContent,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


exports.mailUserContact = async (form) => {
  const html = `
    <h3>Hi ${form.name},</h3>
    <p>Thank you for contacting Veda Global.</p>
    <p>We have received your message and will get back to you soon.</p>
    <hr>`;

  await transporter.sendMail({
    from: `"Veda Global" <${process.env.EMAIL}>`,
    to: form.email,
    subject: "We Received Your Message – Veda Global",
    html,
  });
};