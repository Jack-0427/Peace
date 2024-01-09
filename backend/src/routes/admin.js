import { Router } from "express";
import User from "../models/UserData";
import Service from "../models/ServiceData";
import Admin from "../models/AdminData";
import bycrypt from "../help/bycrypt";
import jwt from "../help/jwt";

const router = Router();

router.get('/admin/all', async(req, res) => {
    try{
        const data = await User.find();
        res.send({ data, message: "成功取得申請者資訊" });
    }catch(err){
        res.status(400).send({ data: [], message: err });
    }
})

router.get('/admin/service', async(req, res) => {
    try{
        const data = await Service.find();
        res.send({ data, message: "成功取得服務資訊" });
    }catch(err){
        res.status(400).send({ data: [], message: err });
    }
})

router.get('/user/service', jwt.authenticateToken, async(req, res) => {
    try{
        const { cardId } = req.user;
        const { name } = await User.findOne({ cardId });
        const data = await Service.find({ name });
        res.send({ data, message: "成功取得服務資訊" });
    }catch(err){
        res.status(400).send({ data: [], message: err });
    }
})

router.post('/admin/review', async(req, res) => {
    try{
        const { _id, comment } = req.body;
        await User.updateOne( { _id }, { $set: { comment: comment, hasBeenReviewed: true } })
        res.send({ message: "審核資料成功" })
    }catch(err){
        res.status.send({ message: "審核資料失敗" })
    }
})

router.post('/admin/login', async(req, res) => {
    try{
        const { name, password } = req.body;
        const isPasswordMatch = await bycrypt.compareAdmin(name, password);
        if (isPasswordMatch) {
            res.send({ message: "登入成功" })
        }
        else{
            const user = await Admin.findOne({ name });
            if (user){
                res.send({ message: "密碼錯誤" })
            }
            else{
                res.send({ message: "查無此人" })
            }
        }
    }catch(err){
        res.status(400).send({ message: "登入失敗" })
    }
})

router.post("/admin/register", async(req, res) => {
    let { name, password } = req.body;
    let user = await Admin.findOne({ name });
    if(user){
        res.send({ message: "已經註冊過了" })
    }
    else{
        let HashPassword = await bycrypt.getHash(password);
        await Admin.create({ password: HashPassword, name });
        res.send({ message: "成功註冊" })
    }
});

router.post("/appoint/finish", async(req, res) => {
    try{
        let { _id } = req.body;
        await Service.updateOne( { _id }, { $set: { state: "預約完成" } });
        res.send({ message: "修改註冊狀態成功" });
    }catch(err){
        res.status(400).send({ message: "修改註冊狀態失敗" });
    }
})

router.post("/appoint/delete", async(req, res) => {
    try{
        let { _id, getState } = req.body;
        await Service.updateOne( { _id }, { $set: { state: getState } });
        res.send({ message: "修改註冊狀態成功" });
    }catch(err){
        res.status(400).send({ message: "修改註冊狀態失敗" });
    }
})

export default router;