import jwt from "jsonwebtoken"
import configApp from "../config/user.config"


export const genToken = (payload:  string | object | Buffer, time: string) => {
    const token = jwt.sign(payload, String(configApp.dev.secret), {expiresIn: time});
    return token;
} ;

export const decodeToken = (token: string) => {
    const decodedToken = jwt.verify(token, String(configApp.dev.secret));
    return decodedToken;
};