const DashboardMenu = {
  render: (props) => {
    return `
    <div class="dashboard-menu">
      <ul>
       
       <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
          <a href="/#/dashboard">Painel de Controle</a>
        </li>
        <li class="${props.selected === 'orders' ? 'selected' : ''}">
          <a href="/#/orderlist">Pedidos</a>
        </li>
        <li class="${props.selected === 'products' ? 'selected' : ''}">
          <a href="/#/productlist">Produtos</a>
        </li>
        <li class="${props.selected === 'evaluatecustom' ? 'selected' : ''}">
        <a href="/#/evaluatecustom">Produto Personalizado</a>
        </li>
        <li class="${props.selected === 'adoption' ? 'selected' : ''}">
          <a href="/#/adoptionlist">Adoções</a>
        </li>
      </ul>
    </div>
    `;
  },
};
export default DashboardMenu;
