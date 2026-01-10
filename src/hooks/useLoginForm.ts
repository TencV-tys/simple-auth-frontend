import {useState} from 'react';

import type { LoginDatas } from '../types/auth';

import { AuthService } from '../services/authService';
export function useLoginForm(){
    
    const [formData,setFormData] = useState<LoginDatas>({
          email:'',
          password:''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
           const {name,value} = e.target;
           setFormData(prev=>({
            ...prev,
            [name]:value
           })) 

    }
  
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const result = await AuthService.login(formData);
           
        if(!result.success){
            setMessage(`${result.message}`);
            setLoading(false);
        }else{
            setMessage(`${result.message}`);
        }

    }

 
   return{
    formData,
    loading,
    message,
    handleChange,
    handleSubmit
}


}



