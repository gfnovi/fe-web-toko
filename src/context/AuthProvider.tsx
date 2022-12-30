import { createContext, useState, useContext } from "react";
export type authContext = {
    auth: any
    setAuth:(c: any) => void
  }
const AuthContext= createContext<authContext>({auth:'',setAuth: () => {},})
// type Props={
//     children? :React.ReactNode
// }
export const AuthProvider =({children}:any)=>{
    const [auth, setAuth] = useState<any>()
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

// import React, { Dispatch, SetStateAction } from "react";

// type ContextProps = {
//   isLoggedIn: boolean;
//   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
//   loading: boolean;
//   setLoading: Dispatch<SetStateAction<boolean>>;
// };

// export const LoginContext = React.createContext<Partial<ContextProps>>({});


