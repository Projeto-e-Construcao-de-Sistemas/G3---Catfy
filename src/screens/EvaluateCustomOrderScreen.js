import DashboardMenu from '../components/DashboardMenu';
import { getOrders, deleteOrder } from '../api';
import { showLoading, hideLoading, rerender, showMessage } from '../utils';

const EvaluateCustomOrderScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Tem certeza de que deseja excluir este pedido?')) {
          showLoading();
          const data = await deleteOrder(deleteButton.id); // recusar
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(EvaluateCustomOrderScreen);
          }
          hideLoading();
        }
        /*
        const accepted = false;
        if(accepted === false){
          alert('Solicitação recusada');
        }
        */
      });
    });
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', async () => {
        document.location.hash = `/evaluateorder`; 
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
    const orders = await getOrders();
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'orders' })}
    <div class="dashboard-content">
      <h1>Produtos Personalizados</h1>
       
      <div class="order-list">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Cor</th>
              <th>Largura</th>
              <th>Altura</th>
              <th>Observações</th>
              <th class="tr-action">AÇÃO</th>
            <tr>
          </thead>
          <tbody>
            ${orders
              .map(
                (order) => `
            <tr>
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.user.name}</td>
              <td>${order.paidAt || 'No'}</td>
              <td>
              <button id="${order._id}" class="edit-button">Avaliar</button>
              
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
export default EvaluateCustomOrderScreen;

