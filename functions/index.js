const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gvxcapitalgroups@gmail.com',
    pass: 'GVXcapitalgroups2023',
  },
});

// Função para enviar e-mails
exports.sendEmail = functions.https.onRequest((req, res) => {
  const { to, subject, text } = req.body;

  // Configuração do e-mail a ser enviado
  const mailOptions = {
    from: 'gvxcapitalgroups@gmail.com',
    to,
    subject,
    text,
  };

  // Envia o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('E-mail enviado: ' + info.response);
  });
});