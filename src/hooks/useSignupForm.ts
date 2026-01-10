import { useState } from "react";
import type { SignUpDatas } from "../types/auth";

export function useSignupForm(){
     
    const [formData, setFormData] = useState<SignUpDatas>({
        name:'',
        email:"",
        password:'',
        confirmPassword:''
    });

     const [loading, setLoading] = useState(false);
        
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

         try{
             console.log('');
         }catch(e){
           console.error(e); 
         }

      }
    

      return {
        formData,
        loading,
        handleChange,
        handleSubmit
      }
    



}