import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import type { BookingDetails, Concert, TicketType } from "../../types";

const fetchAllConcerts = async():Promise<Concert[]>=>{
    try{
         const {data} = await api.get('/data/concerts')
        return data.payload.concerts
    }catch(error){
        console.log(error)
    }   
    return []
}

const fetchConcertById =async(concertId:number):Promise<Concert|null>=>{  
    try{
         const {data} = await api.get(`/data/concerts/${concertId}`)
        return data.payload.concert

    }catch(error){
        console.log(error)
    }   
    return null
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
        const {data} = await api.get(`/data/ticketInfo/${id}`)
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

const fetchBookingByID=async(id:string):Promise<BookingDetails|null>=>{
    try{
        const {data} = await api.get(`/api/booking/${id}`)
        return data.payload
    }catch(error){
        console.log(error)
    }
    return null
}

export const useBooking  = (bookingId:string)=>{
    return useQuery({
        queryKey:['booking',bookingId],
        queryFn:()=>fetchBookingByID(bookingId)
    })
}


const fetchBookingsByUser = async() : Promise<BookingDetails[]|null>=>{
    console.log("is fetch booking flag")
    try{
        const {data} =await api.get('/api/bookings')
        return data.payload.bookingHistory
    }catch(error){
        console.log(error)
    }
    return null
}

export const useBookingHistory=(userID:string)=>{
    console.log("is booking flag")
    return useQuery({
        queryKey:['bookingHistory',userID],
        queryFn:()=>fetchBookingsByUser(),
        enabled:!!userID,
    })
}