import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({ baseURL: `http://localhost:4000`});

const DataContext = createContext({
    msg: "",
    warn: false,
    open: false,
    Review: async() => {},
    handleOpen: () => {},
    handleClose: () => {},
    setWarnState: () => {},
    setWarnMessage: () => {},
});

const useData = () => useContext(DataContext);

const DataProvider = (props) => {
    const [msg, setMsg] = useState("");
    const [warn ,setWarn] = useState(false);
    const [open, setOpen] = useState(false);

    const Review = async(_id, comment) => {
        try{
            const { data: { message } } = await instance.post('/admin/review', { _id, comment });
            setMsg(message);
            setWarn(false);
            return message;
        }catch(err){
            console.log(err);
            setMsg("審核資料失敗")
            setWarn(true);
            return err;
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const setWarnMessage = (mess) => {
        setMsg(mess);
    }

    const setWarnState = (state) => {
        setWarn(state);
    }

    return (
        <DataContext.Provider
            value={{
                msg,
                warn,
                open,
                Review,
                handleOpen,
                handleClose,
                setWarnState,
                setWarnMessage,
            }}
            {...props}
        />
    );
}



export { useData, DataProvider };