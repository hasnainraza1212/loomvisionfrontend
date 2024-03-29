import axios from "axios"
const createConfig = (token)=>({
   headers:{Authorization:`Bearer ${token}`,
}
})
export const url = "https://coral-kangaroo-boot.cyclic.app/api/v1/"
export const Post =async (endpoint, data)=>{
   try{
      const res = await axios.post(url+endpoint, data)
      return res.data
   }catch (error) {
        return error
   }
  
}
export const GetWithToken =async (endpoint, token)=>{
   try{
      const res = await axios.get(url+endpoint, createConfig(token))
      return res.data
   }catch (error) {
   //    // if(!error.response.data.success){
   //    //    return {success:false}
   //    // }
   //    if (error.response && error.response.status === 401) {
   //       // Handle 401 Unauthorized - Log the user out
   //       console.log("User logged out due to token expiry or unauthorized access");
   //       // Clear token from local storage
   //       localStorage.clear();
   //     }
   //     return { success: false, message: "Unauthorized or token expired" };
   console.log(error)
     }
   }
  



