import { Router } from "express";
import User from "../models/UserData";
import Account from "../models/AccountData";
import Service from "../models/ServiceData";
import jwt from "../help/jwt";
import out from "../help/outApi";

const router = Router();

const multer = require('multer');

// 配置 Multer 中间件
const upload = multer();

router.post("/apply", jwt.authenticateToken, upload.any(), async(req, res) => {
    try{
        let { cardId } = req.user;
        let { front, back, video, text } = req.body;
        const { name } = await Account.findOne({ cardId });
        
        let frontImgURL = front.front.link;
        let frontImgDeleteHash = front.front.deletehash;
        let backImgURL = back.back.link;
        let backImgDeleteHash = back.back.deletehash;
        let videoURL = video ? video.video.link : undefined;
        let videoDeleteHash = video ? video.video.deletehash : undefined;
        let agreement = text;

        const idData = new FormData();
        idData.append("deletehashes[]", front.front.deletehash);
        idData.append("deletehashes[]", back.back.deletehash);
        if (video){
            idData.append("deletehashes[]", video.video.deletehash);
        }
        const addToAlbumResponse = await out.uploadToAlbum(idData);  
        const addToAlbumData = await addToAlbumResponse.json();
        console.log(addToAlbumData, "add");
        console.log(name);
        if (video){
            await User.create({ cardId, name, frontImgURL, backImgURL, videoURL, frontImgDeleteHash, backImgDeleteHash, videoDeleteHash, agreement });
        }
        else{
            await User.create({ cardId, name, frontImgURL, backImgURL, frontImgDeleteHash, backImgDeleteHash, agreement });
        }
        res.status(200).send({ message: `影像資料全部成功上傳`});
    }catch(error){
        res.status(400).send({ message: `Something went wrong: ${error}`});
        console.log(error)
    }
});

router.post("/resend", jwt.authenticateToken, upload.any(), async(req, res) => {
    try{
        let { front, back, video, text, _id } = req.body;

        let frontImgURL = front ? front.front.link : undefined;
        let frontImgDeleteHash = front ? front.front.deletehash : undefined;
        let backImgURL = back ? back.back.link : undefined;
        let backImgDeleteHash = back ? back.back.deletehash : undefined;
        let videoURL = video ? video.video.link : undefined;
        let videoDeleteHash = video ? video.video.deletehash : undefined;
        let agreement = text;
        
        if (front && back){
            await User.updateOne( { _id }, { $set: { comment: "", hasBeenReviewed: false, frontImgURL: frontImgURL, frontImgDeleteHash: frontImgDeleteHash, backImgURL: backImgURL, backImgDeleteHash: backImgDeleteHash, agreement: agreement } });
        }
        else if(front){
            await User.updateOne( { _id }, { $set: { comment: "", hasBeenReviewed: false, frontImgURL: frontImgURL, frontImgDeleteHash: frontImgDeleteHash, agreement: agreement } });
        }
        else if(back){
            await User.updateOne( { _id }, { $set: { comment: "", hasBeenReviewed: false, backImgURL: backImgURL, backImgDeleteHash: backImgDeleteHash, agreement: agreement } });
        }
        else{
            await User.updateOne( { _id }, { $set: { agreement: agreement } });
        }

        const idData = new FormData();
        if (front){
            idData.append("deletehashes[]", front.front.deletehash);
        }
        if (back){
            idData.append("deletehashes[]", back.back.deletehash);
        }
        // if (video){
        //     idData.append("deletehashes[]", video.video.deletehash);
        // }
        const addToAlbumResponse = await out.uploadToAlbum(idData);  
        const addToAlbumData = await addToAlbumResponse.json();
        console.log(addToAlbumData, "add");
        // console.log(name);
        // if (video){
        //     await User.create({ cardId, name, frontImgURL, backImgURL, videoURL, frontImgDeleteHash, backImgDeleteHash, videoDeleteHash });
        // }
        // else{
        //     await User.create({ cardId, name, frontImgURL, backImgURL, frontImgDeleteHash, backImgDeleteHash });
        // }
        res.status(200).send({ message: `重新上傳影像資料成功`});
    }catch(error){
        res.status(400).send({ message: `Something went wrong: ${error}`});
        console.log(error)
    }
});

router.post("/service", async(req, res) => {
    try{
        await Service.create(req.body);
        res.status(200).send({ message: `服務申請成功` });
    }catch(err){
        console.log(err);
        res.status(400).send({ message: `服務申請失敗` });
    }
})

router.post("/delete", jwt.authenticateToken, async(req, res) => {
    try{
        const { _id, deleted } = req.body;
        await User.updateOne( { _id }, { $set: { deleted: deleted } });
        if (deleted){
            res.status(200).send({ message: `申請註銷成功`});
        }
        else{
            res.status(200).send({ message: `恢復申請成功`});
        }
    }catch(err){
        res.status(400).send({ message: `申請註銷失敗`});
    }
})

router.get("/fetch", jwt.authenticateToken, async(req, res) => {
    try{
        let { cardId } = req.user;
        const data = await User.findOne({ cardId });
        res.status(200).send({ data: data, message: `獲取申請資料成功`});
    }catch(error){
        res.status(400).send({ data: undefined, message: `Something went wrong: ${error}`});
        console.log(error)
    }
});

export default router;