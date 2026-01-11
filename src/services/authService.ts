const API_URL = 'http://localhost:3001/api/auth';

export class AuthService{

       static async login(data: {email:string, password:string}){
            try{
                 const {email,password} = data;

                 if(!email || !password){
                    return{
                        success:false,
                        message:'Fill all required fields'
                    }
                 }

                 const response = await fetch(`${API_URL}/login`,{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(data),
                    credentials:'include'
                 });
                 
                 const result = await response.json();
                
                 return result;


                
             }catch(e:unknown){
               console.error('Error in login services:',e);
               return{
                success:false,
                message:'Cannot connect to the server'
               }
            }

       }
   
            
       static async signup(data:{name:string, email:string, password:string, confirmPassword:string}){
           try{
              
            if(!data.name || !data.email || !data.password){
                return{
                    success:false,
                    message:"Fill all required fields"
                };
            }
             
            if(data.password !== data.confirmPassword){
                return{
                    success:false,
                    message:'please correct your password match it to your real password'
                }
            }

            const response = await fetch(`${API_URL}/signup`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
                credentials:'include'
            });

            const result = await response.json();

            return result;
              

           }catch(e:unknown){
            console.error(`Error on signup services: ${e}`)
            return{
                success:false,
                message:"Cannot connect to the server"
            }
           }
             
 
       }

        static async logout(){
               try{
                   const response = await fetch(`${API_URL}/logout`,{
                    method:"POST",
                    credentials:'include'
                   });
              if(response.ok){
               
                    return{
                        success:true,
                        message:"Logged out successfully"
                    }

           
              }
                const result = await response.json();

                return{
                    success:false,
                    message:result.message || 'Logout failed'
                }

               }catch(e:unknown){
                      console.error('Logout error:', e);
       return {
      success: false,
      message: 'Network error during logout'
    };
               }
       } 



}