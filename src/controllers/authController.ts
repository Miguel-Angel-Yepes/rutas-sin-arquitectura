import { Request, Response } from "express";
import { User } from "../entities/userEntity";
const jwt = require('../utils/jwt');
import bcrypt from 'bcrypt'


export const login = async (req: Request, res: Response) => {
    try {
    const {
        email,
        password
    } = req.body;

    if(!email) return res.status(400).send({ msg: "El email es obligatorio"});
    if(!password) return res.status(400).send({ msg: "La contraseña es obligatoria"});


        const user = await User.findOneBy({email: email.toLowerCase()})
        if (!user) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).send({ msg: "Contraseña incorrecta" });
        }

        res.status(200).send({
            access: jwt.createAccessToken(user),
            refresh: jwt.createRefreshToken(user),
        });

        
    } catch (error) {
        return res.status(500).send({ msg: "Error en el servidor" });
    }
}