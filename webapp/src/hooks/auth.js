import { ACCESS_TOKEN_NAME } from "../config";
import { useSelector } from 'react-redux';

export const useLoginStatus = () => {
    const {isSignedIn} = useSelector(state=>state) 
    if(isSignedIn){
        return true;
    }else{
        if(sessionStorage.getItem(ACCESS_TOKEN_NAME)){
            return true;
        }
        return false;
    }
}