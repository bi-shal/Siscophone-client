import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)


    //create-User
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        setLoading(true);
    }
    //signIn-user
    const logIn = ( email, password ) => {
        return signInWithEmailAndPassword(auth, email, password)
        setLoading(true);
    }
    //sign-Out
    const logOut = () => {
        signOut(auth);
        setLoading(true);
    }
    //Google-SignIn
    const googleSignIn = (provider) => {
        return signInWithPopup(auth, provider)
        setLoading(true);
    }


    //manageUser
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('user observerb')
            setUser(currentUser);
            setLoading(false)
        })
        return () => unsubscribe();
    },[])

    const info = {
        createUser,
        logIn,
        user,
        logOut,
        googleSignIn,
        loading,
        

    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;