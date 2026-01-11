
import  React ,{createContext,useContext,useState,useEffect} from 'react';
import { AuthService } from '../services/authService';
import  type{ AuthContextType } from '../types/AuthContextType';
import  type {User} from '../types/auth';
import type {ReactNode} from 'react';
 const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps{
    children:ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps)=>{
         
      const [user,setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState<boolean>(true);

      useEffect(()=>{
        checkAuth();
      },[]);
 
           const checkAuth = async ()=>{

            try{
                const response = await fetch('http://localhost:3001/api/auth/me',{
                    credentials:'include'
                });
                
                if(response.ok){
                const userData = await response.json();
                 
                if(userData.success && userData.user){
                    setUser(userData.user);
                }else{
                    setUser(null);
                }


                }else{
                    setUser(null);
                }
                
            }catch(e){
                 console.error(e);
                       
            }finally{
                setLoading(false);
            }

           }

           const login = async (email:string, password:string)=>{
               
            const result = await AuthService.login({email,password});

            if(result.success && result.user){
                setUser(result.user);
            }else{
                throw new Error(result.message);
            }
               
            await checkAuth();
           };

const logout = async () => { 
  try {
    setLoading(true); // Show loading
    
    // Optional: Show "Logging out..." message
    // setMessage('Logging out...');
    
    const result = await AuthService.logout();
    
    if (result.success) {
      // Delay for UX before clearing state
      setTimeout(() => {
        setUser(null);
        setLoading(false);
        
        // Redirect to login after delay
        window.location.href = '/login';
      }, 1000); // 1 second delay
    } else {
      alert('Logout failed: ' + result.message);
      setLoading(false);
    }
  } catch (error) {
    console.error('Logout error:', error);
    setLoading(false);
  }
};
          
          const value:AuthContextType = {
            user,
            loading,
            login,
            logout,
            isAuthenticated:!!user
          }

           return(
            <AuthContext.Provider value={value}>
             {children}
            </AuthContext.Provider>
           );


}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}