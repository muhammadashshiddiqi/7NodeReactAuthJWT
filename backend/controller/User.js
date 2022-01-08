import userModal from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const getUser = async(request, respon) => {
    try {
        const user = await userModal.findAll({
            attributes:['id', 'name', 'email']
        });
        respon.json(user);

    } catch (error) {
        console.log(error);
    }
};

export const register = async(request, respon) => {
    const { nama, email, password, confPassword } = request.body;
    
    if(password !=  confPassword){
        return respon.status(400).json({msg: "Password dan Confirm tidak cocok !"});
    }
        
    const salt = await bcrypt.genSalt();
    const hashpass = await bcrypt.hash(password, salt);

    try {
         await userModal.create({
            name: nama,
            email: email,
            password: hashpass
         });

         respon.json ({msg: "Register Berhasil !"});
    } catch (error) {
        console.log(error);
    }
    
};

export const login = async (request, respon) => {

    try {

        const user = await userModal.findAll({
            where: {
                email: request.body.email
            }
        });

        const match = await bcrypt.compare(request.body.password, user[0].password);
        if(!match){
            return respon.status(400).json({ msg: "Wrong Password" });
        }
        
        const userID = user[0].id;
        const userName = user[0].name;
        const userEmail = user[0].email;

        const accessToken = jwt.sign({ userID, userName, userEmail }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ userID, userName, userEmail }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await userModal.update({refresh_token: refreshToken}, {
            where:{
                id: userID
            }
        });

        respon.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        respon.json({ accessToken });

    } catch (error) {
        respon.status(404).json({msg: "Email Tidak ditemukan"});
    }
};

export const logout = async (request, respon) => {
    const refreshToken = request.cookies.refreshToken;

    console.log('ini token : ' + refreshToken);

    if (!refreshToken){
        return respon.sendStatus(204);
    }

    const user = await userModal.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    if(!user[0]){
        return respon.sendStatus(204);
    }

    const userID = user[0].id;
    await userModal.update({refresh_token: null}, {
        where: {
            id: userID
        }
    });

    respon.clearCookie('refreshToken');
    return respon.sendStatus(200);
};