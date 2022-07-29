import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import Customize from "../models/customizeModel";

const customizeRouter = express.Router();
customizeRouter.get(
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
        const customizes = await Customize.find({ ...searchKeyword });
        res.send(customizes);
    })
);

customizeRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const customize = await Customize.findById(req.params.id);
        res.send(customize);
    })
);

customizeRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const customize = new Customize({
            product: 'produto',
            color: 'cor',
            width: 'largura',
            height: 'altura',
            etc: 'etc',
            name: 'nome',
            email: 'email',
        });
        const createdCustomize = await customize.save();
        if (createdCustomize) {
            res
                .status(201)
                .send({ message: 'Pedido de produto personalizado criado', customize: createdCustomize });
        } else {
            res.status(500).send({ message: 'Erro ao criar pedido de produto personalizado' });
        }
    })
);
customizeRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const customizeId = req.params.id;
        const customize = await Customize.findById(customizeId);
        if (customize) {
            customize.product = req.body.product;
            customize.color = req.body.color;
            customize.width = req.body.width;
            customize.height = req.body.height;
            customize.etc = req.body.etc;
            customize.name = req.body.name;
            customize.email = req.body.email;
            const updatedCustomize = await customize.save();
            if (updatedCustomize) {
                res.send({ message: 'Pedido de personalização de produto atualizado', customize: updatedCustomize });
            } else {
                res.status(500).send({ message: 'Erro ao atualizar o pedido de personalização' });
            }
        } else {
            res.status(404).send({ message: 'Pedido de personalização não encontrado' });
        }
    })
);
customizeRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const customize = await  Customize.findById(req.params.id);
        if (customize) {
            const deletedCustomize = await customize.remove();
            res.send({ message: 'Personalização deletada', customize: deletedCustomize });
        } else {
            res.status(404).send({ message: 'Personalização não encontrada' });
        }
    })
);

export default customizeRouter;
