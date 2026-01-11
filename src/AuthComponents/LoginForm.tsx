import {useLoginForm} from '../hooks/useLoginForm';

export default function LoginForm(){

const {
   formData,
   loading,
   message,
   handleChange,
   handleSubmit
} = useLoginForm();

 


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
                 disabled={loading}
               >
                  {loading? 'Logging in...':'Login'}
               </button>
         </form>
         {message? <p>{message}</p>:''}
    </div>
)




}


