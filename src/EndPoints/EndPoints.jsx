import { Post , GetWithToken } from "./Requests"

// user requests
export const signUp =async(data)=>{
   const res= await Post("signup", data);
   return res
}

export const logIn  =async (data)=>{
   const res = await Post("login", data)
   return res
}


export const getLoggedInUser  =async (data)=>{
   const res = await GetWithToken("get-logged-in-user", data)
   return res
}
