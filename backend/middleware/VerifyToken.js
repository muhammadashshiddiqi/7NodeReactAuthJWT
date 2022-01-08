import jwt from "jsonwebtoken";


export const verify_token = (request, respon, next) => {
    const autHeader = request.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if(token == null){
        return respon.sendStatus(401);
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return respon.sendStatus(403);
        }

        request.email = decoded.email;
        next();
    });


}