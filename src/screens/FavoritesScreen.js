/* eslint-disable no-use-before-define */
import { parseRequestUrl, rerender, showMessage } from '../utils';
import { getProduct } from '../api';
import { getFavoritesItems, setFavoritesItems } from '../localStorage';

const addToFavorites = (item, forceUpdate = false) => {
  let favoritesItems = getFavoritesItems();
  const existItem = favoritesItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      favoritesItems = favoritesItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    favoritesItems = [...favoritesItems, item];
  }
  setFavoritesItems(favoritesItems);
  if (forceUpdate) {
    rerender(FavoritesScreen);
  }
};

const removeFromFavorites = (id) => {
  setFavoritesItems(getFavoritesItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/favorites';
    showMessage("Produto removido dos Favoritos!");
  } else {
    rerender(FavoritesScreen);
  }
};

const FavoritesScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getFavoritesItems().find((x) => x.product === qtySelect.id);
        addToFavorites({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromFavorites(deleteButton.id);
      });
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToFavorites({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    
    const favoritesItems = getFavoritesItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Lista de Favoritos</h3>
          </li>
          ${
            favoritesItems.length === 0
              ? '<div>Lista de favoritos está vazia. <a href="/#/">Vá as compras</a>'
              : favoritesItems
                  .map(
                    (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.name}
                  </a>
              </div>
              
              <div>
              <button type="button" class="delete-button" id="${
                item.product
              }">
                Deletar
              </button>
              </div>
              </div>
              <div class="cart-price">
                R$ ${item.price}
              </div>
            </li>
            `
                  )
                  .join('\n')
          } 
        </ul>
      </div>

    </div>
    `;
  },
};

export default FavoritesScreen;
