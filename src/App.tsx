import { useState } from "react";
import LoginForm from "./AuthComponents/LoginForm"
import SignUpForm from "./AuthComponents/SignUpForm";


export default function App(){
   const [isLogin, setIsLogin] = useState(true);


return(
  <>
     <section>
          <div>Auth App</div>
                 
                 <div>
                       <button onClick={()=> setIsLogin(true)}>Login</button>
                       <button onClick={()=>setIsLogin(false)}>Sign Up</button>
                 </div>
              
              {isLogin? <LoginForm/> : <SignUpForm/>}

              <p>Check browser console for form data</p>
          
     </section>
  </>
)


}