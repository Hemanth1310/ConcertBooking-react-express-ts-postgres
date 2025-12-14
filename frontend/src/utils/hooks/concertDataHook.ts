import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import type { Concert } from "../../types";

const fetchAllConcerts = async():Promise<Concert[]>=>{
        const {data} = await api.get('/data/concerts')
        return data.payload.concerts
    
}

export const useConcerts = ()=>{
    return useQuery({
        queryKey:['concerts'],
        queryFn:fetchAllConcerts,
    })
}

// const fetchTicketTypes = (id:string) Promise<Concert[]>=>{
//     try{
//         const {data} = await api.get
//     }
// }