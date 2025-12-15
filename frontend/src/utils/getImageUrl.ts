import api from "./axiosConfig"

const image_base_url = import.meta.env.VITE_API_BASE_URL

const getImageUrl =(name:string)=>{
    const formattedFileName = name.replaceAll(' ','_') 
    const finalUrl  = image_base_url+"/images/"+formattedFileName
    console.log(finalUrl)
    return finalUrl
}

export default getImageUrl