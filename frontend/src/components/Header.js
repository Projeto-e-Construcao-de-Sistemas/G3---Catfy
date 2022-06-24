import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';
import HomeScreen from '../screens/HomeScreen.js';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
  <div class="brand">
    <!--
    <button id="aside-open-button">
      &#9776;
    </button>  -->
    <a href="/#/">Catfy</a>
  </div>
  <div class="search">
  <form class="search-form"  id="search-form">
    <input type="text" name="q" id="q" value="${value || ''}" placeholder="Pesquisar produto" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `<a href="/#/signin">Login</a>`
  }    
    <a href="/#/adoption">Adoção</a>
    <a href="/#/cart">Favoritos</a>
    <a href="/#/cart">Carrinho</a>
    ${isAdmin ? `<a href="/#/dashboard">Painel de Controle</a>` : ''}
  </div>`;
  },
  after_render: () => {
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    // document
    //   .getElementById('aside-open-button')
    //   .addEventListener('click', async () => {
    //     document.getElementById('aside-container').classList.add('open');
    //   });
  },
};
export default Header;
