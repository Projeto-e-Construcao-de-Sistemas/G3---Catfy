import {
    parseRequestUrl,
    showLoading,
    showMessage,
    hideLoading,
} from '../utils';
import { getAdoption, updateAdoption, uploadProductImage } from '../api';

const AdoptionEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document
            .getElementById('edit-adoption-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                showLoading();
                const data = await updateAdoption({
                    _id: request.id,
                    name: document.getElementById('nomeGato').value,
                    description: document.getElementById('description').value,
                    image: document.getElementById('imageGato').value,
                    city: document.getElementById('city').value,
                    relatedEmail: document.getElementById('relatedEmail').value,
                });
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    document.location.hash = '/adoption';
                }
            });
        document
            .getElementById('image-gato')
            .addEventListener('change', async (e) => {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('image', file);
                showLoading();
                const data = await uploadAdoptionImage(formData);
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    showMessage('Image uploaded successfully.');
                    document.getElementById('image').value = data.image;
                }
            });
    },
    render: async () => {
        const request = parseRequestUrl();
        const adoption = await getAdoption(request.id);
        return `
    <div class="content">
      <div>
<!--        <a href="/#/productlist">Back to products</a>-->
      </div>
      <div class="form-container">
        <form id="edit-adoption-form">
          <ul class="form-items">
            <li>
              <h1>Gatinho ${adoption._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Nome</label>
              <input type="text" name="name" value="${
            adoption.name
        }" id="nomeGato" />
            </li>
            <li>
              <label for="description">Descrição</label>
              <input type="text" name="description" value="${
            adoption.description
        }" id="description" />
            </li>
            <li>
              <label for="image">Imagem (680 x 830)</label>
              <input type="text" name="image" value="${
            adoption.image
        }" id="imageGato" />
              <input type="file" name="image-file" id="image-gato" />
            </li>
            <li>
              <label for="city">Cidade</label>
              <input type="text" name="city" value="${
            adoption.city
        }" id="city" />
            </li>
            <li>
              <label for="relatedEmail">Email para contato</label>
              <input type="text" name="relatedEmail" value="${
            adoption.relatedEmail
        }" id="relatedEmail" />
            </li>
            <li>
              <button type="submit" class="primary">Confirmar</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
    `;
    },
};
export default AdoptionEditScreen;
