import axios from "axios"

const instance = axios.create({ baseURL: `http://localhost:4000/` })

const sendApplyData = async(token, front, back, video, text) => {
    try{
        const { data: { message } } = await instance.post('/data/apply', 
            {front, back, video, text},
            {headers: {authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}} 
        );
        return message;
    }catch(error){
        console.log(error);
    }
}

const sendResendData = async(token, front, back, video, text, _id) => {
    try{
        const { data: { message } } = await instance.post('/data/resend', 
            {front, back, video, text, _id}, 
            {headers: {authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}} 
        );
        return message;
    }catch(error){
        console.log(error);
    }
}

const sendServiceData = async(sendData) => {
    try{
        const { data: { message }} = await instance.post('/data/service', 
            {...sendData}, 
        );
        return message;
    }catch(error){
        return `服務申請失敗`;
    }
}

const sendEmail = async(to, subject, text) => {
    const { data } = await instance.post('/send-email', {to, subject, text});
    return data;
}

const sendDeleteData = async(token, deleted, _id) => {
    try{
        const { data: { message } } = await instance.post('/data/delete', 
            { _id, deleted }, 
            {headers: {authorization: `Bearer ${token}`, }} 
        );
        return message;
    }catch(error){
        console.log(error);
        return "error has occurred!"
    }
}

const fetchApplyData = async(token) => {
    try{
        const { data: { data, message } } = await instance.get('/data/fetch', 
            {headers: {authorization: `Bearer ${token}`, }} 
        );
        return { data, message };
    }catch(error){
        console.log(error);
    }
}

const fetchServiceData = async(token) => {
    try{
        const { data: { data, message } } = await instance.get('/user/service',
            {headers: {authorization: `Bearer ${token}`, }}
        );
        return { data, message };
    }catch(error){
        console.log(error);
    }
}

const deleteAppointment = async(_id, getState) => {
    const { data: { message } } = await instance.post('/appoint/delete', { _id, getState });
    return message;
}

export { sendApplyData, sendResendData, fetchApplyData, sendDeleteData, sendServiceData, sendEmail, fetchServiceData, deleteAppointment };

// selectedFrontImage, selectedBackImage, selectedVideo
// frontImage, backImage, Video