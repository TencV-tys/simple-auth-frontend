
import {useState,useEffect} from 'react';
import { AdminServices } from '../../services/adminServices';


interface User{
    id:number;
    name:string;
    email:string;
    role:'USER' | 'ADMIN';
    createdAt:string;
}

interface PaginationInfo{
    currentPage:number;
    totalPages:number;
    totalUsers:number;
    hasNextPage:boolean;
    hasPrevPage:boolean;
}

 export function UserListHooks(){
            
    const [users,setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage:1,
        totalPages:1,
        totalUsers:0,
        hasNextPage:false,
        hasPrevPage:false
    })

    const [itemsPerPage,setItemsPerPage] = useState<number>(10);
    const [pageInput, setPageInput] = useState<string>('1');


    useEffect(()=>{
        fetchUsers(1, itemsPerPage);
    },[itemsPerPage]);


    const fetchUsers = async (page:number =1, limit:number= itemsPerPage)=>{
               setLoading(true);
               try{
                const result = await AdminServices.getAllUsers();
                
                if(result.success){
                    setUsers(result.user || []);
                    setPagination(result.pagination || {
                        currentPage:1,
                        totalPages:1,
                        totalUsers:0,
                        hasNextPage:false,
                        hasPrevPage:false
                    })

                    setPageInput(page.toString());
                }else{
                    setMessage(`No users: ${result.message}`);
                    setUsers([]);
                }
                

               }catch(e){
                console.error(e);
                setMessage(`Unexpected shits happening: ${e}`);
                setUsers([]);

               }finally{
                setLoading(false);
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
   const handlePageChange = (newPage:number) =>{
    if(newPage < 1 || newPage > pagination.totalPages) return;

    fetchUsers(newPage,itemsPerPage);
   }

   const handleItemsPerPageChange = (value:number) => {
    setItemsPerPage(value);
   }
          
    return{
        users, 
        loading,
        message,
        fetchUsers,
        handleDelete,
        formatDate,
        handleItemsPerPageChange,
        handlePageChange,
        pagination,
        itemsPerPage,
        pageInput,
        setPageInput
    }

 }

