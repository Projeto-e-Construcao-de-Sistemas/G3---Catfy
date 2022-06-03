import {
    parseRequestUrl,
} from '../utils';
import { getAdoptions } from '../api';
//pagina com as adoções; quando a gente popular vai aparecer. lembrar de botar o email nos detalhes do produto/adoção
const AdoptionScreen = {
    render: async () => {
        const { value } = parseRequestUrl();
        const adoptions = await getAdoptions({ searchKeyword: value });
        if (adoptions.error) {
            return `<div class="error">${adoptions.error}</div>`;
        }

        return `
    <ul class="products">
      ${adoptions
            .map(
                (adoption) => `
      <li>
        <div class="product">
          <a href="/#/adoption/${adoption._id}">
            <img src="${adoption.image}" alt="${adoption.name}" />
          </a>
        <div class="product-name">
          <a href="/#/adoption/1">
            ${adoption.name}
          </a>
        </div>
        </div>
      </li>
      `
            )
            .join('\n')}
    `;
    },
};
export default AdoptionScreen;
