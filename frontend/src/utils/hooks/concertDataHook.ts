import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import type { BookingDetails, Concert, TicketType } from "../../types";


//Fetching query for all Concerts
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

//Fetching query for Concert based on concertID
const fetchConcertById =async(concertId:number):Promise<Concert>=>{  
    const {data} = await api.get(`/data/concerts/${concertId}`)
    return data.payload.concert
}

export const useConcertDetails =(concertID:number)=>{
    
    return useQuery({
        queryKey:['concert',concertID],
        queryFn:()=>fetchConcertById(concertID)
    })
}

//Fetching query for ticket types based on concertID
const fetchTicketTypes = async (id:number): Promise<TicketType[]>=>{
        const {data} = await api.get(`/data/ticketInfo/${id}`)
        return data.payload.ticketInfo
}

export const useTicketInfo = (id:number)=>{
    return useQuery({
        queryKey:['ticketInfo',id],
        queryFn:()=>fetchTicketTypes(id),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
    })
}

//Fetching query for ticket types based on BookingID
const fetchBookingByID=async(id:string):Promise<BookingDetails>=>{
    const {data} = await api.get(`/api/booking/${id}`)
    //data includes booking and associated concert and tickettype info
    return data.payload
}

export const useBooking  = (bookingId:string)=>{
    return useQuery({
        queryKey:['booking',bookingId],
        queryFn:()=>fetchBookingByID(bookingId)
    })
}


const fetchBookingsByUser = async() : Promise<BookingDetails[]>=>{
        const {data} =await api.get('/api/bookings')
        return data.payload.bookingHistory
}

export const useBookingHistory=()=>{
    return useQuery({
        queryKey:['bookingHistory'],
        queryFn:()=>fetchBookingsByUser(),
    })
}


const fetchRecentBookings = async():Promise<BookingDetails[]>=>{
    const {data} =await api.get('/api/recentBookings')
    return data.payload.recentBookings
}

export const useRecentBookings=()=>{
    return useQuery({
        queryKey:['recentBookings'],
        queryFn:()=>fetchRecentBookings()
    })
}