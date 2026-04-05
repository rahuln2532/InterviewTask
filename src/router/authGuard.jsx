import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export default function AuthGuard({ children}) {
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = sessionStorage.getItem('user');
        if (!authenticated && !userEmail) {
            navigate('/', { replace: true });
        }
    }, [authenticated, navigate]);


    if(!authenticated) return null;

    return children;
}