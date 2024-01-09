import express from 'express';
import cors from 'cors';
import db from './db';
import routes from './routes';

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

db.connect();
const app = express();

app.use(cors());

app.use(express.json());

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);

app.post('/send-email', (req, res) => {
  // 從請求中獲取郵件相關資訊（收件人、主題、內容等）
  const { to, subject, text } = req.body;

  // 建立郵件傳輸器
  const transporter = nodemailer.createTransport({
    // 設定您的郵件服務商的相關資訊（SMTP 伺服器、帳號、密碼等）
    // 這裡僅為示範，請根據您的實際情況進行設定
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.FROM_ADDR,
      pass: process.env.PASSWORD,
    },
  });

  // 設定郵件的內容
  const mailOptions = {
    from: process.env.FROM_ADDR,
    to,
    subject,
    text,
  };

  // 發送郵件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('郵件發送失敗');
    } else {
      res.status(200).send('郵件已成功發送');
    }
  });
});


app.use('/', routes);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
