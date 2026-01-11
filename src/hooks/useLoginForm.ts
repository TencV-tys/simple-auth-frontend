import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginDatas } from '../types/auth';

import { AuthService } from '../services/authService';
export function useLoginForm(){
    
    const [formData,setFormData] = useState<LoginDatas>({
          email:'',
          password:''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const nav = useNavigate();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
           const {name,value} = e.target;
           setFormData(prev=>({
            ...prev,
            [name]:value
           })) 
 
    }
  
   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const result = await AuthService.login(formData);
    
    if (!result.success) {
      setMessage(`❌ ${result.message}`);
    } else {
      setMessage(`✅ ${result.message}`);
      
      // SIMPLE REDIRECT THAT ALWAYS WORKS
      setTimeout(() => {
        if (result.user?.role === 'ADMIN') {
          window.location.href = '/admin';  // Hard redirect
        } else {
          window.location.href = '/dashboard';
        }
      }, 1000);
    }
    
  } catch (e: any) {
    setMessage(`❌ ${e.message}`);
  } finally {
    setLoading(false);
  }
};

 
   return{
    formData,
    loading,
    message,
    handleChange,
    handleSubmit
}


}



