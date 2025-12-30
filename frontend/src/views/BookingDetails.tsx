import { useParams } from "react-router";
import { useBooking } from "../utils/hooks/concertDataHook";
import type { Concert, TicketType } from "../types";
import Spinner from "../components/Spinner";

const BookingDetails = () => {
  const { bookingID } = useParams();
  const {
    data: bookingDetails,
    isLoading: isBookingDetailsLoading,
    isError: isBookingDetailsError,
    refetch,
  } = useBooking(bookingID ?? "");

  if (isBookingDetailsLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner />
      </div>
    );
  }
  if (isBookingDetailsError) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }
  if (!bookingDetails) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        Failed to fetch details
      </div>
    );
  }

  const dateObject = new Date(bookingDetails.ticketType.concert.date);
  const concert: Concert = bookingDetails.ticketType.concert;
  const TicketInfoById: TicketType = bookingDetails.ticketType;

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <div className="flex w-full items-center justify-center">
        <div className="w-full h-full border-gray-400 border-2 rounded-2xl p-10 flex flex-col gap-4">
          <div className="flex gap-10 text-2xl items-center">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              celebration
            </span>
            <div className="font-bold">{concert.venue}</div>
          </div>
          <div className="flex gap-10 text-2xl items-center">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              star_shine
            </span>
            <div className="font-bold">{concert.artist}</div>
          </div>
          <div className="flex gap-10 text-2xl items-center ">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              calendar_month
            </span>
            <div>
              {" "}
              {dateObject.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex gap-10 text-2xl items-center ">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              timer
            </span>
            <div> {dateObject.toLocaleTimeString("en-US")}</div>
          </div>
          <div className="flex gap-10 text-2xl items-center">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              location_on
            </span>
            <div className="font-bold">@{concert.venue}, Berlin</div>
          </div>
          <div className="flex gap-10 text-2xl items-center">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              local_activity
            </span>
            <div className="">{TicketInfoById.name}</div>
          </div>
          <div className="flex gap-10 text-2xl items-center">
            <div className="">
              <u>Checkout Details</u>
            </div>
          </div>
          <div className="flex flex-col items-center px-10 gap-3">
            <div className="flex w-full justify-between">
              <div>Number Of Tickets</div>
              <div>{bookingDetails.quantity}</div>
            </div>
            <div className="flex w-full justify-between">
              <div>Cost per ticket</div>
              <div>{TicketInfoById.price}</div>
            </div>
            <div className="w-full h-1 bg-black"></div>
            <div className="flex w-full font-bold justify-between">
              <div>Total</div>
              <div>${bookingDetails.totalPrice}</div>
            </div>
          </div>
          <div className="flex w-full gap-10 text-2xl items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
