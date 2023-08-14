import {GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    
    try{
        const result = await signInWithPopup(FirebaseAuth,googleProvider);
        console.log(result);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName,email,photoURL,uid} = result.user;
        return {
            ok:true,
            displayName,email,photoURL,uid
        }

    }catch(error){
        console.log('error',error);
        const errorMessage = error.message;
        return {
            ok:false,
            errorMessage
        }

    }
}

export const registerUserWithEmailPassword =async ({email, password, displayName})=>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL} = resp.user;
        await updateProfile(FirebaseAuth.currentUser,{displayName});

        return {
            ok:true,
            uid,photoURL,email,displayName
        }

    } catch(error) {
        return {ok:false, errorMessage:error.message}
    }
}

export const loginWithEmailPassword = async ({email,password}) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        console.log(result);
        const {displayName,photoURL,uid} = result.user;
    
        return {
            ok:true,
            displayName,email,photoURL,uid
        }

    }catch(error){
        console.log(error.message);
        return {ok:false, errorMessage:error.message}
    }
}

export const logoutFirebase = async()=>{
   return await FirebaseAuth.signOut();
}
