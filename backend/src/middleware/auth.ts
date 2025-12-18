import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { decodedToken } from '../types';

const JWT_secret = process.env.JWT_secret || "123456789"

declare global {
    namespace Express {
        interface Request {
            user?: decodedToken; 
        }
    }
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction)=>{

    if (req.method === 'OPTIONS') {
        return next();
    }
    
    const authHeader = req.headers.authorization

    const token = authHeader?.split(" ")[1]

    if(!token){
        return res.status(401).json({error:"Access Denied: No token provided."})
    }

    try {
        const decode = jwt.verify(token,JWT_secret) as decodedToken
        req.user = decode
        console.log(decode)
        next()
    }catch(error){
        res.status(403).json({error:"Access Denied: Invalid or expired token."})
    }
}

export default authenticateToken