import Account from '../models/AccountData';
import Admin from '../models/AdminData';

const bcrypt = require('bcrypt');

const saltRounds = 10;

export default{
    getHash: async(password) => {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    },
    compare: async(cardId, password) => {
        let user = await Account.findOne({ cardId });
        const isPasswordMatch = bcrypt.compare(password, user.password);
        return isPasswordMatch;
    },
    compareAdmin: async(name, password) => {
        let user = await Admin.findOne({ name });
        const isPasswordMatch = bcrypt.compare(password, user.password);
        return isPasswordMatch;
    },
    getUserId: async(cardId, plainText) => {
        let user = await Account.findOne({ cardId });
        if(!user){
            return ["尚未註冊", false];
        }
        else{
            const isPasswordMatch = bcrypt.compare(plainText, user.password);
            if (isPasswordMatch) {
                return [user._id.toHexString(), true];
            } 
        }
        return ["密碼錯誤", false];
    }
}