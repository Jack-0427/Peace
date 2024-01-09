import axios from "axios";

const instance = axios.create({ baseURL: `http://localhost:4000` })

const fetchAll = async() => {
    const { data } = await instance.get('/admin/all');
    return data;
}

const fetchService = async() => {
    const { data } = await instance.get('/admin/service');
    return data;
}

const sendEmail = async(to, subject, text) => {
    const { data } = await instance.post('/send-email', {to, subject, text});
    return data;
}

const finishAppointment = async(_id) => {
    const { data: { message } } = await instance.post('/appoint/finish', { _id });
    return message;
}

const deleteAppointment = async(_id, getState) => {
    const { data: { message } } = await instance.post('/appoint/delete', { _id, getState });
    return message;
}

export { fetchAll, fetchService, sendEmail, finishAppointment, deleteAppointment };