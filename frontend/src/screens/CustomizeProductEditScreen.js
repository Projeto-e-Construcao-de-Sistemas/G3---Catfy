import {hideLoading, parseRequestUrl, showLoading, showMessage} from "../utils.js";
import {getAdoption, getCustomize, updateAdoption, updateCustomize} from "../api.js";
import {getUserInfo} from "../localStorage.js";

const CustomizeProduct = {
	after_render: () => {
		const request = parseRequestUrl();
		document
			.getElementById('edit-custom-form')
			.addEventListener('submit', async (e) => {
				e.preventDefault();
				showLoading();
				const { name, email } = getUserInfo();
				const data = await updateCustomize({
					_id: request.id,
					product: document.getElementById('productChoose').value,
					color: document.getElementById('productColor').value,
					width: document.getElementById('width').value,
					height: document.getElementById('height').value,
					etc: document.getElementById('ps').value,
					name: name,
					email: email,
				});
				hideLoading();
				if (data.error) {
					showMessage(data.error);
				} else {
					showMessage("Pedido de personalização enviado com sucesso!")
					document.location.hash = '/customizeproduct';
				}
			});
	},
	render: async () => {
		const request = parseRequestUrl();
		const customize = await getCustomize(request.id);
		return `
	  <div class="form-container">
	  <form id="edit-custom-form">
	  <ul class="form-items">
		<li>
		  <h1>Produto Personalizado ${customize._id.substring(0, 8)}</h1>
		</li>
		<li>	  
			<p> Você deseja nichos ou prateleiras de tamanhos personalizados? Faça seu orçamento aqui!</p>
		</li>
		<li>
		  <label for="productChoose">Produto</label>
		  <input type="text" name="productChoose" id="productChoose" placeholder="Nicho ou prateleira" list="listProduct">
			<datalist id="listProduct">
				<option value="">produtos:</option>
				<option value="Nicho"></option>
				<option value="Prateleira"></option>
			</datalist>
			</input>
		</li>
		<li>
		  <label for="productColor">Cor</label>
		  <input type="text" name="productColor" id="productColor" placeholder="Cor desejada" list="listColor">
			<datalist id="listColor">
				<option value="">cores:</option>
				<option value="Preto"></option>
				<option value="Madeira"></option>
				<option value="Branco"></option>
				<option value="Rosa"></option>
				<option value="Azul"></option>
				<option value="Vermelho"></option>
			</datalist>
			</input>
		</li>
		<li>
		  <label for="size">Tamanho</label>
		  <input type="text" name="largura" id="width" placeholder="largura (cm)" /> X
		  <input type="text" name="altura" id="height" placeholder="altura (cm)" />
		</li>
		<li>
		  <label for="ps">Observações</label>
		  <input type="text" name="ps" id="ps" />
		</li>

		<li>
		  <button type="submit" class="primary">Enviar</button>
		</li>        
	  </ul>
	</form>
	  </div>
	  `;
	},
  };
  
 export default CustomizeProduct;