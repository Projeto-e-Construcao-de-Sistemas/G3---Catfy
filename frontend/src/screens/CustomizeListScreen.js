import DashboardMenu from '../components/DashboardMenu';
import {getAdoptions, createAdoption, deleteAdoption, getCustomizes, deleteCustomize} from '../api';
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const CustomizeListScreen = {
    after_render: () => {
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', async () => {
                document.location.hash = `/evaluateorder/${editButton.id}`;
                // document.location.hash = `/order/${editButton.id}`;
                /*
                const accepted = true;
                if(accepted === true){
                  alert('Solicitação aceita');
                }
                */
            });
        });
    },
    render: async () => {
        const customizes = await getCustomizes();
        return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'evaluatecustom' })}
    <div class="dashboard-content">
      <h1>Personalizações</h1>
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
            ${customizes
            .map(
                (customize) => `
            <tr>
              <td>${customize._id}</td>
              <td>${customize.product}</td>
              <td>${customize.color}</td>
              <td>${customize.width}</td>
              <td>${customize.height}</td>
              <td>
              <button id="${customize._id}" class="edit-button">Avaliar</button>
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
export default CustomizeListScreen;
