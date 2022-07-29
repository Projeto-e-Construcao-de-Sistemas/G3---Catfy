import { getUserInfo } from '../localStorage';
import {parseRequestUrl, showMessage} from '../utils';
import { getCustomize} from "../api.js";

const EvaluateOrderScreen = {
	
	after_render: () => {
		document
		  .getElementById('evaluate-form')
		  .addEventListener('submit', async (e) => {
		
			/* // let field1 = document.getElementById('evaluatePrice').value;
			let field2 = document.getElementById('evaluatemessage').value;
			e.preventDefault();
			if (field2 == '') {
			  showMessage("Preencha os campos.");
			}
			else {
				//sgMail.send(messageAccept);
				showMessage("Email enviado ao cliente!"); */
			});
		},

    render: async () => {
		const { name, email } = getUserInfo();
		const request = parseRequestUrl();
		const customize = await getCustomize(request.id);
      return `
	  <html>
      <div class="form-container">
	  	<form id="evaluate-form" >
	  		<ul class="form-items">
				<li>
					<h1>Avaliar solicitação de produto personalizado</h1>
				</li>
				<li> Cliente: ${customize.name} </li>
				<li> Email: ${customize.email} </li>
				<li> Produto: ${customize.product} </li>
				<li> Cor: ${customize.color} </li>
				<li> Tamanho: ${customize.width} x ${customize.height} </li>
				<li> Observações: ${customize.etc}</li>
				<!--
				<li>
					<label for="evaluatePrice">Preço</label>
					<input type="text" name="evaluatePrice" id="evaluatePrice"  />
				</li>
				<li>
					<label for="evaluatemessage">Mensagem</label>
					<input type="text" name="evaluatemessage" id="evaluatemessage"  />
				</li>
				<li>
					<button type="submit" class="primary"> Aceitar </button>
				</li>    
				<li>
					<button  type="submit" class="primary"> Recusar </button>
				</li>   
				-->   
			</ul>
		</form>

		<!--
		<label>Enviar e-mail para:</label>
		<input type="text" id="inputEmail" />
		<button onclick="sendMail()">Enviar e-mail</button>
		-->

	  </div>

	  <script>
		const sendMail = () => {
			const email = document.getElementById("inputEmail").value;

			fetch("http://localhost:4004", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: email,
				from: "lojacatfy@gmail.com",
				subject: "Teste e-mail",
				text: "Texto exemplo",
				html: "<strong>Exemplo de mensagem</strong>",
			}),
			});
		};
		</script>

	  </html>
      `;
    },
  };

  export default EvaluateOrderScreen;
