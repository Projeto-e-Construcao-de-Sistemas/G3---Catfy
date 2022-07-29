import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
  rerender,
} from '../utils';
import { createReview, getProduct } from '../api';
import Rating from '../components/Rating';
import { getUserInfo } from '../localStorage';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    // adicionar ao carrinho
    /*
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
    // adicionar aos favoritos
    document.getElementById('add-favorites').addEventListener('click', () => {
      document.location.hash = `/favorites/${request.id}`;
    });
    */
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/favorites/${request.id}`;
    });
    document.getElementById('add-button2').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
    

    if (document.getElementById('review-form')) {
      document
        .getElementById('review-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();
          const data = await createReview(request.id, {
            comment: document.getElementById('comment').value,
            rating: document.getElementById('rating').value,
          });
          hideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
            showMessage('Avaliação enviada com sucesso!', () => {
              rerender(ProductScreen);
            });
          }
        });
    }
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    const userInfo = getUserInfo();
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Voltar para página inicial</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li> 
              <button id="add-button" class="ico">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
            </li>
            <!--
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
            </li>
            -->
            <li>
              Preço: <strong>R$ ${product.price}</strong>
            </li>
            <li>
              Descrição:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Preço: R$ ${product.price}
              </li>
              <!-- TODO: QTD EM ESTOQUE
              <li>
                Status : 
                  ${
                    product.countInStock > 0
                      ? `<span class="success">In Stock</span>`
                      : `<span class="error">Unavailable</span>`
                  }
              </li>
              -->
              <li>
                  <button id="add-button2" class="fw primary">Adicionar ao carrinho</button>
            </ul>
        </div>
      </div>
     
      <div class="content">
      <h2>Avaliações</h2>
      ${product.reviews.length === 0 ? `<div>Ainda não há avaliações para esse produto.</div>` : ''}  
      <ul class="review">
      ${product.reviews
        .map(
          (review) =>
            `<li>
            <div><b>${review.name}</b></div>
            <div class="rating-container">
            ${Rating.render({
              value: review.rating,
            })}
            </div>
            <div>
            ${review.comment}
            </div>
            <div>
            Avaliado em:
            ${review.createdAt.substring(0, 10)}
            </div>
            
          </li>`
            
        )
        .join('\n')}

        <li>
       
        ${
          userInfo.name
            ? `
            <div class="form-container">
            <form id="review-form">
              <ul class="form-items">
              <li> <h3>Avalie o produto!</h3></li>
                <li>
                  <label for="rating">Ranking</label>
                  <select required name="rating" id="rating">
                    <option value="">Selecione:</option>
                    <option value="1">1 = Ruim</option>
                    <option value="2">2 = Regular</option>
                    <option value="3">3 = Bom</option>
                    <option value="4">4 = Muito bom</option>
                    <option value="5">5 = Excelente</option>
                  </select>
                </li>
                <li>
                  <label for="comment">Comentário</label>
                  <textarea required  name="comment" id="comment" ></textarea>
                </li>
                <li>
                  <button type="submit" class="primary">Enviar</button>
                </li>
              </ul>
            </form>
            </div>`
            : ` <div>
              Por favor, <b><a href="/#/signin">faça login</a></b> para enviar uma avaliação.
            </div>`
        }
      </li>
    </ul> 

      </div>
    </div>`;
  },
};
export default ProductScreen;
