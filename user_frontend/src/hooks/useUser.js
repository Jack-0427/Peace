import { createContext, useContext, useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom"

const UserContext = createContext({
    open: false, 
    token: "",
    isLoggedIn: false,
    isChecked: false,
    message: "",
    success: false,
    topRef: null,
    UserLogin: () => {},
    UserLogOut: () => {},
    setChecked: () => {},
    setWarn: () => {},
    setWarnState: () => {},
    handleClose: () => {},
    handleOpen: () => {},
})

const useUser = () => useContext(UserContext)

const instance = axios.create({ baseURL: `http://localhost:4000/` })

const UserProvider = (props) => {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const topRef = useRef(null);

    const location = useLocation();

    // Check localStorage on page load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    // Update localStorage when token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    }, [token]);

    useEffect(() => {
        if (isChecked === true && decodeURIComponent(location.pathname) !== "/器官捐贈移植/線上申請/填寫申請資料"){
            console.log(1);
            setIsChecked(false);
        }
        console.log(decodeURIComponent(location.pathname));
    }, [location])

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const UserLogin = async({ cardId, password }) => {
        try{
            const { data } = await instance.post('/login', { cardId, password });
            setToken(data.token);
            setIsLoggedIn(data.isLoggedIn);
            return data.message;
        }catch(err){
            return err
        }
    }

    const UserLogOut = () => {
        setToken("");
        setIsLoggedIn(false);
    }

    const setChecked = (event) => {
        setIsChecked(event.target.checked);
    }

    const setWarn = (mes) => {
        setMessage(mes);
    }

    const setWarnState = (ifWarned) => {
        setSuccess(ifWarned);
    }

    return (
        <UserContext.Provider
            value={{
                open,
                token,
                topRef,
                message,
                success,
                isLoggedIn,
                isChecked,
                UserLogin,
                UserLogOut,
                setChecked,
                setWarn,
                setWarnState,
                handleClose,
                handleOpen,
            }}
            {...props}
        />
    );
}

export { UserProvider, useUser }