const API_URL = 'http://localhost:3001/api/admin';

export class AdminServices{

            static async getAllUsers(page:number = 1, limit:number = 10){
                  try{
                      
                    const users = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`,{
                        credentials:'include'
                    }); 

                    const result = await users.json();
                        
                    if(!result.success){
                       return{
                        success:false,
                        message:result.message
                       }
                    }    

                    return{
                        success:true,
                        message:result.message,
                        user:result.user,
                        pagination:result.pagination
                    }


                  }catch(e){
                      console.error(e);
                      return{
                        success:false,
                        message:"Failed to fetch users"
                      }
                  }


            }
              
            static async getDelete(id:number){
                
                try{
                   
                    const deleteResponse = await fetch(`${API_URL}/users/${id}`,{
                        method:"DELETE",
                        credentials:'include'
                    });

                    const deleteResult = await deleteResponse.json();

                    if(!deleteResult.success){
                        return{
                            sucess:false,
                            message:deleteResult.message
                        }
                    }

                    return{
                        success:true,
                        message:deleteResult.message
                    }


                }catch(e){
                    console.error(e);
                    return{
                        success:false,
                        message:"Failed to fetch deletee"
                    }
                }


            }



}