const express = require("express");
const cors = require("cors");
const app = express();
const sgMail = require("@sendgrid/mail");

// Para rodar digitar node index.js

// chave privada
sgMail.setApiKey("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");

// para não dar erro de cors
app.use(cors());

// para parsear json
app.use(express.json());

// endpoint
app.post("/", (req, res) => {
  // chamada para disparar email com os dados recebidos na requisição
  sgMail
    .send(req.body)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).send();
});

// roda servidor
app.listen(4004, () => console.log("Aplicativo rodando em: localhost:4004"));
