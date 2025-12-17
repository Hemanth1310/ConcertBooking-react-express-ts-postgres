
const image_base_url = import.meta.env.VITE_API_BASE_URL

const getImageUrl =(name:string)=>{
    const finalUrl  = image_base_url+name
    return finalUrl
}

export default getImageUrl