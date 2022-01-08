import jwt from "jsonwebtoken";
import userModal from "../models/UserModel.js";

export const refreshToken =  async(request, respon) => {
    try {
        const refresh_token = request.cookies.refreshToken;
        if (!refresh_token){
            return respon.sendStatus(401);
        }
        const user = await userModal.findAll({
            where: {
                refresh_token: refresh_token
            }
        });

        if(!user[0]){
            return respon.sendStatus(403);
        }

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return respon.sendStatus(403);
            }

            const userId = user[0].id;
            const userName = user[0].name;
            const userEmail = user[0].email;

            const access_token = jwt.sign({ userId, userName, userEmail }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            respon.json({access_token});

        });

    } catch (error) {
        console.log(error);
    }
};