import React from 'react';
import {useState,useEffect} from 'react';
import { AdminServices } from '../../services/adminServices';
import { AuthService } from '../../services/authService';

interface User{
    id:number;
    name:string;
    email:string;
    role:'USER' | 'ADMIN';
    createdAt:string;
}
 export function UserListHooks(){
            
    const [users,setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    useEffect(()=>{
        fetchUsers();
    },[]);


    const fetchUsers = async ()=>{
               setLoading(true);
               try{
                const result = await AdminServices.getAllUsers();
                
                if(result.success){
                    setUsers(result.user);
                }else{
                    setMessage(`No users: ${result.message}`);
                }
                

               }catch(e){
                console.error(e);
                setMessage(`Unexpected shits happening: ${e}`);
               }


    } 

    const handleDelete = async(userId:number)=>{
           
        if(!window.confirm("Are you sure?")) return;

        setMessage('Deleting user....');

        try{
             const result = await AdminServices.getDelete(userId);
             
             if(result.success){
                    setMessage('User deleted successfully');
                    
                    setUsers(users.filter(user=> user.id !== userId));

             }else{
                setMessage(`Failed to delete: ${result.message}`);
             }

        }catch(e){
            setMessage(`Unexpected shits happening: ${e}`);
            console.error(e);
        }

    }

      const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

          
    return{
        users,
        loading,
        message,
        fetchUsers,
        handleDelete,
        formatDate
    }

 }

