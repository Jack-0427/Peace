import dotenv from 'dotenv-defaults';

export default {
    uploadFile: async(formData) => {
        dotenv.config();
        const response = await fetch('https://api.imgur.com/3/upload', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${process.env.CLIENT_ID}`,
            },
                body: formData,
            });
        const data = await response.json();
        return data;
    },

    uploadToAlbum: async(idData) => {
        dotenv.config();
        const addToAlbumResponse = await fetch(`https://api.imgur.com/3/album/${process.env.ALBUM_DELETEHASH}/add`, {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${process.env.CLIENT_ID}`, // 将YOUR_ACCESS_TOKEN替换为您的Imgur访问令牌
            },
            body: idData,
            // redirect: 'follow'
        });
    return addToAlbumResponse;
}}