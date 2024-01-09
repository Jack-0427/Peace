import dotenv from 'dotenv-defaults';
const jwt = require("jsonwebtoken");


export default{
    generateToken: ({ cardId }) => {
        dotenv.config();
        const token = jwt.sign({ cardId }, process.env.JWT_SIGN_SECRET);
        return token;
    },

    authenticateToken: (req, res, nex) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]
        if(!token){
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.JWT_SIGN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            nex()
        })
    }, 
}