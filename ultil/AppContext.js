import { createContext, useState } from "react";
import { create } from "react-test-renderer";


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    // data sử dụng chung
    const [isLogin, setisLogin] = useState(false);
    const [inforuser, setinforuser] = useState({});
    const [userRole, setUserRole] = useState(null);

    return (

        <AppContext.Provider value={{ isLogin, setisLogin, inforuser, setinforuser, number, setnumber }}>
            {children}
            const [inforuser, setinforuser] = useState({ })
            const [number, setnumber] = useState(0)
        </AppContext.Provider>
    )
}