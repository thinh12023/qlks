const express = require("express");
const router = express.Router();

require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

const { template } = require("../config/mail-template");
const { createResponse } = require("../utils/common");

router.use(cors());
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }))


router.post("/send_mail", async (req, res) => {
  try {
    let data = req.body;
    const transport = nodemailer.createTransport({
      // service: "Gmail",
      // host: "smtp.ethereal.email",
      // port: 25,
      // secure: false, // true for 465, false for other ports
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '1688shoponline@gmail.com',
        pass: '1688shop',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    })

    const response = await transport.sendMail({
      form: "1688shoponline@gmail.com",
      to: `${data.mails}`,
      subject: `K-Zone Star Hotel : ${data.titles}`,
      attachments: [{
        filename: 'logo.png',
        path: __dirname + '/mail_img/logo.png',
        cid: 'unique@kreata.ee',
      }],
      html: `${template(data)}`,
    });
    return res.status(200).json(createResponse(1, response, "Success!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, error, "Failed!"));
  }
})


module.exports = router;