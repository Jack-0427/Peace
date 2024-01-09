import { Router } from "express";
import Account from "../models/AccountData";
import bycrypt from '../help/bycrypt';
import jwt from "../help/jwt";

const router = Router();

router.post("/login", async(req, res) => {
    let { cardId, password } = req.body;
    let user = await Account.findOne({ cardId });
    if(!user){
       res.send({ token: undefined, isLoggedIn: false, message: "尚未註冊" })
    }
    else{
        const isPasswordMatch = await bycrypt.compare(cardId, password);
        if (isPasswordMatch) {
            const token = jwt.generateToken({ cardId });
            
            res.send({ token, isLoggedIn: true, message: "成功登入" })
        }
        else{
            res.send({ token: undefined, isLoggedIn: false, message: "密碼錯誤" })
        }
    }
});

router.post("/register", async(req, res) => {
    let { cardId, password, name } = req.body;
    let user = await Account.findOne({ cardId });
    if(user){
        res.send({ message: "已經註冊過了" })
    }
    else{
        let HashPassword = await bycrypt.getHash(password);
        await Account.create({ cardId, password: HashPassword, name })
        res.send({ message: "成功註冊" })
    }
});

router.get('/', (req, res) => {
    res.send({ message: "hello world." });
})

router.get("/cards", async(req, res) => {
    
});

export default router;