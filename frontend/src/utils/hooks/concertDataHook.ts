import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import type { Concert, TicketType } from "../../types";

const fetchAllConcerts = async():Promise<Concert[]>=>{
    try{
         const {data} = await api.get('/data/concerts')
        return data.payload.concerts
    }catch(error){
        console.log(error)
    }   
    return []
}

const fetchConcertById =async(concertId:number):Promise<Concert|undefined>=>{  
    try{
         const {data} = await api.get(`/data/concerts/${concertId}`)
        return data.payload.concert

    }catch(error){
        console.log(error)
    }   
    return 
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

const fetchTicketTypes = async (id:number): Promise<TicketType[]>=>{
    try{
        const {data} = await api.get(`/data/ticketInfos/${id}`)
        return data.payload.ticketInfo
    }catch(error){
        console.log(error)
    }    
    return []

}

export const useTicketInfo = (id:number)=>{
    return useQuery({
        queryKey:['ticketInfo',id],
        queryFn:()=>fetchTicketTypes(id)
    })
}