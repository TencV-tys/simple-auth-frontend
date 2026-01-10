import { useState } from "react";
import type { SignUpDatas } from "../types/auth";
import { AuthService } from "../services/AuthService";
export function useSignupForm(){
     
    const [formData, setFormData] = useState<SignUpDatas>({
        name:'',
        email:"",
        password:'', 
        confirmPassword:''
    });
      
    const [message,setMessage] = useState<string>('');
     const [loading, setLoading] = useState<boolean>(false);
        
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}= e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
        }));
     }

      const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
         setLoading(true);
          setMessage(''); 
         try{
             const result = await AuthService.signup(formData);
            
             if(!result.success){
              setMessage(`${result.message}`);
              setLoading(false);
             }else{
              setMessage(`${result.message}`);
             }

         }catch(e){
           console.error(e); 
         }

      }
    

      return {
        formData,
        loading,
        message,
        handleChange,
        handleSubmit
      }
    



}