
export interface User{
    id:number;
    name:string;
    email:string;
    role:string;
}

export interface LoginDatas{
  email:string;
  password:string;
}

export interface SignUpDatas{
    name:string;
    email:string;
    password:string;
}