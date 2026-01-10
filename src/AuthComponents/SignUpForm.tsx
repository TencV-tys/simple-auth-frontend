
import { useSignupForm } from '../hooks/useSignupForm'; 

export default function SignUpForm(){
       
    const {
        formData,
        loading,
        handleChange,
        handleSubmit
    } = useSignupForm();

    

    return(
        <div>
            
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your name'
            />
             </div>
             
             <div>
            <input
             type='email'
             name='email'
             value={formData.email}
             onChange={handleChange}
             placeholder='enter email'
            />
            </div>
            <div>
             <input
               type='password'
               name='password'
               value={formData.password}
               onChange={handleChange}
               placeholder='enter password'
             />
            </div>
            <div>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  placeholder='Confirm password'

                />
            </div>
             
             <button type='submit'
                disabled={loading}
             >
              {loading? 'Creating Account...' : 'Sign Up'}
             </button>

             </form>
        </div>
    )

}
