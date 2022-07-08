import { getUserInfo, getShipping, setShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';
import {viaCepApi} from "../api";

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById('address').value,
          complemento: document.getElementById('complemento').value,
          city: document.getElementById('city').value,
          postalCode: document.getElementById('postalCode').value,
          uf: document.getElementById('uf').value,
        });
        document.location.hash = '/payment';
      });
    document.getElementById('postalCode').addEventListener('blur', async () => {
      const cep = document.getElementById('postalCode').value;
      const response = await viaCepApi(cep);
      document.getElementById('address').value = (response.logradouro);
      document.getElementById('city').value = (response.localidade);
      document.getElementById('uf').value = (response.uf);
    });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { address, city, postalCode, uf } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true})}
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
            <h1>Envio</h1>
          </li>
          <li>
            <label for="postalCode">CEP</label>
            <input type="text" name="postalCode" id="postalCode" value="" />
          </li>
          <li>
            <label for="address">Endereço</label>
            <input type="text" name="address" id="address"  />
          </li>
          <li>
            <label for="complemento">Complemento</label>
            <input type="text" name="complemento" id="complemento"  />
          </li>
          <li>
            <label for="city">Cidade</label>
            <input type="text" name="city" id="city"   />
          </li>
          <li>
            <label for="uf">Estado</label>
            <input type="text" name="state" id="uf"  />
          </li>

          <li>
            <button type="submit" class="primary">Continuar</button>
          </li>        
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;
