import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export default function AuthGuard({ children}) {
    const { authenticated, authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;

        if (!authenticated) {
            navigate('/', { replace: true });
        }
    }, [authenticated, authLoading, navigate]);


    if (authLoading) return null;
    if(!authenticated) return null;

    return children;
}
