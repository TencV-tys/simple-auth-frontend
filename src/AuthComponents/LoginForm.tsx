import React,{useState} from 'react';

import type { LoginDatas } from '../types/auth';


const LoginForm: React.FC = ()=>{

const [formData, setFormData] = useState<LoginDatas>({
    email:'',
    password:''
});

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name,value} = e.target;
  setFormData(prev=>({
      ...prev,
      [name]:value,
  }));

}


const handleSubmit = (e:React.FormEvent)=> {
       e.preventDefault();

}


return(
    <div>
         <h1>Login</h1>

         <form onSubmit={handleSubmit}>
               <input 
                 type='email'
                 id='email'
                 name='email'
                 value={formData.email}
                 onChange={handleChange}
               />
               <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
               />

               <button 
                 type='submit'
               >
                  Login
               </button>
         </form>
    </div>
)




}


export default LoginForm;