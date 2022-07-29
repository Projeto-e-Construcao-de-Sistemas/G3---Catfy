import { getUserInfo } from '../localStorage';
import { showMessage, redirectUser } from '../utils';

const ReturnProduct = {

	after_render: () => {
		document
		  .getElementById('returnP-form')
		  .addEventListener('submit', async (e) => {
			let field1 = document.getElementById('orderid').value;
			let field2 = document.getElementById('wichProduct').value;
			let field3 = document.getElementById('returnReason').value;
			e.preventDefault();
			if (field1 == '' || field2 == '' || field3 == '') {
			  showMessage("Preencha todos os campos.");
			}
			else {
				showMessage("Recebemos sua solicitação de devolução e entraremos em contato em breve!");
				redirectUser();
			}});
		},
	  

	render: () => {
		const { name, email } = getUserInfo();

	  return `
	  <div class="form-container">
	  <form id="returnP-form" >
	  <ul class="form-items">
		<li>
		  <h1>Devolução de Produto</h1>
		</li>
		<li>
		  <p><b>${name}</b>, envie para nós mais informações sobre a devolução. Entraremos em contato através do <b>${email}</b> em breve, dentro do horário comercial.</p>
		</li>
		<li>
		  <label for="orderid">ID do Pedido</label>
		  <input type="text" name="orderid" id="orderid"  />
		</li>
		<li>
			<label for="wichProduct">Produto</label>
			<input type="text" name="wichProduct" id="wichProduct"  />
	  	</li>
		<li>
		  <label for="returnReason">Motivo de devolução</label>
		  <input type="text" name="returnReason" id="returnReason"  />
		</li>
		<li>
		  <button type="submit" class="primary"> Enviar </button>
		</li>        
	  </ul>
	</form>
	  </div>
	  `;
	},
  };
  
 export default ReturnProduct;