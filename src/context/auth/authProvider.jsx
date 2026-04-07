import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getUser } from "../../api/userServices";




export default function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);


    const me = async () => {
        const userEmail = JSON.parse(localStorage.getItem('user'));
        if (!userEmail) {
            return null;
        }

        const res = await getUser("/user");
        const resData = res.data;
        const userData = resData.find((item) => item.email === userEmail);
        if (!userData) {
            return null;
        }

        const userProfile = {
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            phone: userData.phone,
            image: userData.image,
            address: userData.address,
            isActive: userData.isActive
        };


        localStorage.setItem("user", JSON.stringify(userProfile.email));


        return userProfile;

    }

    const initialize = async () => {
        try {
            const userProfile = await me();
            if (userProfile) {
                setUser(userProfile);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error) {
            console.log(error)
            setUser(null);
            setAuthenticated(false);
        } finally {
            setAuthLoading(false);
        }
    }

    useEffect(() => {
        initialize();
    }, []);


    const login = async (data) => {
        try {
            const res = await getUser("/user");


            const resData = res.data;
            console.log(resData);

            const userData = resData.find((item) => item.email === data.email);

            if (!userData) {
                throw ('Email Incorrect');
            };

            // const passwordMatched = await bcrypt.compare("rahul", userData.password);

            if (data.Password !== userData.password) {
                throw ('Unauthoried Access: Password Incorrect');
            };
            //    enqueueSnackbar('Login successfully!', { variant: 'success' });
            const userProfile = {
                id: userData.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone,
                image: userData.image,
                address: userData.address,
                isActive: userData.isActive
            };
            setAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userProfile.email));

            setUser(userProfile);
            return userProfile;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const logout=()=>{

        localStorage.removeItem('user');
        setUser(null);
        setAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ user, setUser, login, authenticated, authLoading,logout }}>
            {children}
        </AuthContext.Provider>
    )
}
