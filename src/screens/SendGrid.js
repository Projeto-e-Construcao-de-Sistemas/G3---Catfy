// require('dotenv').config();
// console.log(process.env.SENDGRID_API_KEY);
// console.log('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');

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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') 

const messageAccept = {
        to: 'contatojlira@gmail.com',
        from: 'catfy.org@gmail.com',
        subject: 'Resposta a solicitação de produto personalizado.',
        text: 'Solicitação de produto personalizado.',
        html: 'Olá, cliente! Recebemos sua solicitação para realizar a personalização de um produto. Gostariamos de informar que aceitamos sua solicitação e o preço do serviço ficou em <preço>. <msg>.',
};

sgMail.send(messageAccept)
    .then(() => {
        console.log("Email enviado com sucesso!!");
    })
    .catch((error) => {
        console.log(error);
    })
;
/*
em caso de nao aceitar:

const messageAccept = {
        to: 'contatojlira@gmail.com',
        from: 'catfy.org@gmail.com',
        subject: 'Resposta a solicitação de produto personalizado.',
        text: 'Solicitação de produto personalizado.',
        html: 'Olá, cliente! Recebemos sua solicitação para realizar a personalização de um produto. Gostariamos de informar que infelizmente não aceitaremos sua solicitação. <preço>',
};

sgMail.send(messageAccept)
    .then(() => {
        console.log("Email enviado com sucesso!!");
    })
    .catch((error) => {
        console.log(error);
    })
    
*/ 

/*
estava  no backend data

const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
  const { email, subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'John Doe <john@mg.yourdomain.com>',
        to: `${email}`,
        subject: `${subject}`,
        html: `<p>${message}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Erro ao enviar o email.' });
        } else {
          console.log(body);
          res.send({ message: 'Email enviado com sucesso!' });
        }
      }
    );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
  */ 