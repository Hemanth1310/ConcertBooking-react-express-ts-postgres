import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import type { Concert } from "../../types";

const fetchAllConcerts = async():Promise<Concert[]>=>{
        const {data} = await api.get('/data/concerts')
        return data.payload.concerts
    
}

const fetchConcertById =async(concertId:number):Promise<Concert>=>{
    const {data} = await api.get(`/data/concerts/${concertId}`)
    return data.payload.concert
}


export const useConcerts = ()=>{
    return useQuery({
        queryKey:['concerts'],
        queryFn:fetchAllConcerts,
    })
}

export const useConcertDetails =(concertID:number)=>{
    
    return useQuery({
        queryKey:['concert',concertID],
        queryFn:()=>fetchConcertById(concertID)
    })
}

// const fetchTicketTypes = (id:string) Promise<Concert[]>=>{
//     try{
//         const {data} = await api.get
//     }
// }