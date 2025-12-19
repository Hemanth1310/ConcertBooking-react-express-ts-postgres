export type UserData = {
    firstName:string,
    lastName:string,
    email:string,
    id:string
}

export type UserRegistrationData={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}
export type ConcertCategory = 
    | 'EDM_DJ_EVENTS'
    | 'GLOBAL_ARENA_STARS'
    | 'LOCAL_REGIONAL_SHOWS'
    | 'CLASSICAL_ORCHESTRAL'
    | 'FESTIVALS_MULTI_DAY';

export type Concert = {
    name: string;
    id: number;
    artist: string;
    date: Date;
    venue: string;
    description: string | null;
    category: ConcertCategory;
    isFeatured: boolean;
    imagePath:string;
}

export type TicketType = {
    name: string;
    id: number;
    concertId: number;
    price: number;
    availableQuantity: number;
    totalQuantity: number;
}

type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "FAILED"

export type Booking = {
    id: number;
    createdAt: Date;
    userId: string;
    ticketTypeId: number;
    quantity: number;
    totalPrice: number;
    status: BookingStatus;
}

export type BookingDetails= {
    ticketType: {
        concert: {
            name: string;
            id: number;
            artist: string;
            date: Date;
            venue: string;
            description: string | null;
            category: ConcertCategory;
            isFeatured: boolean;
            imagePath: string;
        };
    } & {
        name: string;
        id: number;
        price: number;
        availableQuantity: number;
        totalQuantity: number;
        concertId: number;
    };
} & {
    id: number;
    createdAt: Date;
    userId: string;
    ticketTypeId: number;
    quantity: number;
    totalPrice: number;
    status: BookingStatus;
} | null
