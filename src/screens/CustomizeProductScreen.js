import {
    hideLoading,
    parseRequestUrl, rerender, showLoading, showMessage,
} from '../utils';
import {createAdoption, createCustomize, createProduct, deleteProduct, getAdoptions} from '../api';
const CustomizeProductScreen = {

    after_render: () => {
        document
            .getElementById('create-custom-button')
            .addEventListener('click', async () => {
                const data = await createCustomize();
                document.location.hash = `/customizeproduct/${data.customize._id}`;
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
        //const { value } = parseRequestUrl();
        //const adoptions = await getAdoptions({ searchKeyword: value });
       // if (adoptions.error) {
            //return `<div class="error">${adoptions.error}</div>`;
        //}
        return `
    <div class="dashboard-content">
    <main class="bg">

         <section id="fundo">

                <h2 class="centro">o produto que você desejar + do seu jeitinho + a felicidade do seu gatinho</h2>
                    <h3 class="centro">ao alcance de alguns cliques ;)</h3>
                        <p class="centro">Personalização de produtos é com a gente!</p>
                            <div class="espacamento"><img class="imagens" src="https://www.hauspanther.com/wp-content/uploads/2021/06/CatastrophicCreationsCatClimbingFurniture1.jpg" style="width:50%; height:300px" alt="quatro gatinhos brincando em meio a prateleiras e arranhadores"></div>

                <h3 class="centro">De personalização a gente entende: conheça o que oferecemos</h3>
                    <div id="breve-resumo">
                        <div id="guias">
                            <h4>Produtos</h4>
                                <p>Você é o cara, você é quem comanda! Escolha entre personalizar nichos ou prateleiras.</p>
                            <h4>Cores</h4>
                                <p>Enjoado do bom e velho tom de burro quando foge? Aqui até o arco-íris fica com inveja.</p>                 
                            <h4>Dimensões</h4>
                                <p>Seu gatinho é grandinho ou pequenino demais? Dá pra resolver!</p>
            
                        </div>
                        <div id="infos">
                            <h4>Psiu, chega aê!</h4>
                                <p>Pedido de personalização de produto enviado? Beleza, agora é o seguinte:</p>
                                <p>Nossa central irá avaliar o seu pedido e pensar com carinho...</p>
                                <p>Estaremos sempre dispostxs a atendê-lx, mas vai que seu pedido é muito doido, né?!</p>
                        </div>
                    </div>

                    <h4 class="centro">Não perca tempo!</h4>
                        <h5 class="centro">Venha personalizar com a gente!</h5>
       <div id="flexB">      
       <button id="create-custom-button" class="primary">
        Personalizar Produto
      </button></div>

            </section>

        </main>

    `;
    },
};
export default CustomizeProductScreen;

