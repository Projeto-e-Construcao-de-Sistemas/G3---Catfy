import DashboardMenu from '../components/DashboardMenu';
import { getAdoptions, createAdoption, deleteAdoption } from '../api';
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const AdoptionListScreen = {
    after_render: () => {
        document
            .getElementById('create-product-button')
            .addEventListener('click', async () => {
                const data = await createAdoption();
                document.location.hash = `/adoption/${data.adoption._id}/edit`;
            });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/adoption/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm('Tem certeza que deseja deletar esse anúncio de adoção?')) {
                    showLoading();
                    const data = await deleteAdoption(deleteButton.id);
                    if (data.error) {
                        showMessage(data.error);
                    } else {
                        rerender(AdoptionListScreen);
                    }
                    hideLoading();
                }
            });
        });
    },
    render: async () => {
        const adoptions = await getAdoptions();
        return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'products' })}
    <div class="dashboard-content">
      <h1>Adoções</h1>
      <button id="create-product-button" class="primary">
        Publicar Adoção
      </button>
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>DESCRIÇÃO</th>
              <th>CIDADE</th>
              <th>EMAIL</th>
              <th class="tr-action">AÇÃO</th>
            <tr>
          </thead>
          <tbody>
            ${adoptions
            .map(
                (adoption) => `
            <tr>
              <td>${adoption._id}</td>
              <td>${adoption.name}</td>
              <td>${adoption.description}</td>
              <td>${adoption.city}</td>
              <td>${adoption.relatedEmail}</td>
              <td>
              <button id="${adoption._id}" class="edit-button">Editar</button>
              <button id="${adoption._id}" class="delete-button">Deletar</button>
              </td>
            </tr>
            `
            )
            .join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    `;
    },
};
export default AdoptionListScreen;
