import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import bcrypt from "bcryptjs-react";
import { getUser } from "../../api/userServices";




export default function AuthProvider({ children }) {
    const [authenticated, setAutheticated] = useState(false);
    const [user, setUser] = useState();


    const me = async () => {


        const userEmail = JSON.parse(localStorage.getItem('user'));
        const res = await getUser("/user");
        const resData = res.data;
        const userData = resData.find((item) => item.email === userEmail);
       
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
        setAutheticated(true);

        localStorage.setItem("user", JSON.stringify(userProfile.email));

        
        return userProfile;

    }

    const initialize = async () => {
        
            const userProfile = await me();
           
            setUser(userProfile);
   
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

            if (data.Password!==userData.password) {
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
         setAutheticated(true);
            localStorage.setItem("user", JSON.stringify(userProfile.email));

            setUser(userProfile);
            return userProfile;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    return (
        <AuthContext.Provider value={{  user, setUser, login , authenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
