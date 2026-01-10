
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
                setUser(userData);
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

           }

           const logout = async ()=>{ 
            await AuthService.logout();
            setUser(null);
           }
          
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