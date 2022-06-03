import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import Adoption from "../models/adoptionModel";

const adoptionRouter = express.Router();
adoptionRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const searchKeyword = req.query.searchKeyword
            ? {
                name: {
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                },
            }
            : {};
        const adoptions = await Adoption.find({ ...searchKeyword });
        res.send(adoptions);
    })
);

adoptionRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        res.send(product);
    })
);

adoptionRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const adoption = new Adoption({
            name: "gatinho fofo",
            description: "gatinho com apenas 2 meses, vermifugado",
            image: "https://blog.cobasi.com.br/wp-content/uploads/2022/01/gato-filhote-de-2-meses-pode-ficar-sozinho-meio.jpg",
            city: "Rio de Janeiro",
            relatedEmail: "meu+email@email.com"
        });
        const createdAdoption = await adoption.save();
        if (createdAdoption) {
            res
                .status(201)
                .send({ message: 'Anúncio de adoção criado', adoption: createdAdoption });
        } else {
            res.status(500).send({ message: 'Erro ao criar anúncio de adoção' });
        }
    })
);
adoptionRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const adoptionId = req.params.id;
        const adoption = await Adoption.findById(adoptionId);
        if (adoption) {
            adoption.name = req.body.name;
            adoption.description = req.body.price;
            adoption.image = req.body.image;
            adoption.city = req.body.brand;
            adoption.relatedEmail = req.body.category;

            const updatedAdoption = await adoption.save();
            if (updatedAdoption) {
                res.send({ message: 'Adoção atualizada', adoption: updatedAdoption });
            } else {
                res.status(500).send({ message: 'Erro ao atualizar a adoção' });
            }
        } else {
            res.status(404).send({ message: 'Adoção não encontrada' });
        }
    })
);
adoptionRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const adoption = await  Adoption.findById(req.params.id);
        if (adoption) {
            const deletedAdoption = await adoption.remove();
            res.send({ message: 'Product Deleted', product: deletedAdoption });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default adoptionRouter;
