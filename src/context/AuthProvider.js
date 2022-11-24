import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);


    //create-User
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //signIn-user
    const logIn = ( email, password ) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //sign-Out
    const logOut = () => {
        signOut(auth)
    }
    //manageUser
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user observerb')
            setUser(currentUser);
        })
        return () => unsubscribe();
    },[])

    const info = {
        createUser,
        logIn,
        user,
        logOut,

    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;