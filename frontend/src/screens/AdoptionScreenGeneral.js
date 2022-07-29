import {
    hideLoading,
    parseRequestUrl, rerender, showLoading, showMessage,
} from '../utils';
import {createAdoption, createProduct, deleteProduct, getAdoptions} from '../api';
const AdoptionScreenGeneral = {

    after_render: () => {
        document
            .getElementById('create-product-button')
            .addEventListener('click', async () => {
                const data = await createAdoption();
                document.location.hash = `/adoption/${data.adoption._id}/edit`;
            });

        // const deleteButtons = document.getElementsByClassName('delete-button');
        // Array.from(deleteButtons).forEach((deleteButton) => {
        //     deleteButton.addEventListener('click', async () => {
        //         if (confirm('Tem certeza que deseja deletar esse produto?')) {
        //             showLoading();
        //             const data = await deleteProduct(deleteButton.id);
        //             if (data.error) {
        //                 showMessage(data.error);
        //             } else {
        //                 rerender(ProductListScreen);
        //             }
        //             hideLoading();
        //         }
        //     });
        // });
    },

    render: async () => {
        const { value } = parseRequestUrl();
        const adoptions = await getAdoptions({ searchKeyword: value });
        if (adoptions.error) {
            return `<div class="error">${adoptions.error}</div>`;
        }
        return `
<div class="dashboard-content">
<button id="create-product-button" class="primary">
        Publicar Adoção
      </button>
    <ul class="products">
      ${adoptions
            .map(
                (adoption) => `
      <li>
        <div class="product">
            <img src="${adoption.image}" alt="${adoption.name}" />
        <div class="product-name">
        <h2>${adoption.name}</h2>
         <p>${adoption.description}</p>
         <p>${adoption.city}</p>
         <p>${adoption.relatedEmail}</p>
        </div>
        </div>
      </li>
   
      `
            )
            .join('\n')}
    `;
    },
};
export default AdoptionScreenGeneral;

