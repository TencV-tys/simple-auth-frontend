import {useState} from 'react';

import type { LoginDatas } from '../types/auth';

export function useLoginForm(){
    
    const [formData,setFormData] = useState<LoginDatas>({
          email:'',
          password:''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
           const {name,value} = e.target;
           setFormData(prev=>({
            ...prev,
            [name]:value
           }))

    }
  
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
    }


   return{
    formData,
    loading,
    handleChange,
    handleSubmit
}


}



