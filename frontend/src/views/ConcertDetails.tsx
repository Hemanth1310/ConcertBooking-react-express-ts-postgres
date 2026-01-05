import { useNavigate, useParams } from "react-router";
import getImageUrl from "../utils/getImageUrl";
import {
  useConcertDetails,
  useTicketInfo,
} from "../utils/hooks/concertDataHook";
import Authentication from "../components/Authentication";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorFallback from "../components/ui/ErrorFallback";

/**
 * ConcertDetails Page Component
 * * Responsibilities:
 * - Displays comprehensive data for a single concert.
 * - Manages ticket selection and availability status (Scarcity/Fast Filling/Available).
 * - Implements an "Auth-to-Action" flow: if a guest tries to book, it opens the login modal
 * and redirects them to the booking page automatically upon successful login.
 */


const ConcertDetails = () => {
  const { name, id } = useParams();
  const navigation = useNavigate();
  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingTicketId, setPendingTicketId] = useState<number | null>(null);
  //Concert Data from useQuery: based on ConcertID
  const {
    data: concert,
    isLoading,
    isError,
    refetch,
  } = useConcertDetails(Number(id));
  //Ticket Info Data from useQuery: based on ConcertID
  const { data: ticketInfo, isLoading: isTicketsLoading } = useTicketInfo(
    Number(id)
  );

  /**
   * Post-Login Sync:
   * Monitors for when a guest successfully logs in while having a 'pending' ticket.
   * Automatically triggers the navigation once the Auth context updates.
   */

  useEffect(() => {
    if (userData && pendingTicketId && !isModalOpen) {
      navigation(`/booking/${name}/${id}/${pendingTicketId}`);
    }
  }, [userData, pendingTicketId, isModalOpen, navigation, name, id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
     <ErrorFallback onRetry={refetch}/>
    );
  }
  if (!concert) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        Failed to fetch details
      </div>
    );
  }
  const dateObject = new Date(concert.date);

  //Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /**
   * Captures the user's intent to book.
   * If logged in: Redirects directly to booking.
   * If guest: Saves the ticket ID in 'pendingTicketId' and opens Auth modal.
   */

  const handleNavigation = (ticketType: number) => {
    if (userData) {
      navigation(`/booking/${name}/${id}/${ticketType}`);
    } else {
      setPendingTicketId(ticketType);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
        Concert Details
      </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <img
            className="h-64 w-full md:h-128"
            src={getImageUrl(concert.imagePath)}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
            {name?.replaceAll("_", " ")}
          </h1>
          <div className="text-2xl font-light">{concert.description}</div>
          <div className="text-lg">
            {" "}
            {dateObject.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="font-bold">@{concert.venue}</div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl mt-10 md:text-3xl font-bold font-mono py-5">
          Tickets Information
        </h1>
        {isTicketsLoading && <div>Loading, please wait</div>}
        {ticketInfo && ticketInfo.length > 0 ? (
          <div className="">
            {ticketInfo.map((ticket) => {
              const availabilityPercent =
                ticket.availableQuantity / ticket.totalQuantity;
              return (
                <div
                  key={ticket.id}
                  className="flex flex-col md:flex-row gap-2 items-center rounded-2xl shadow-md justify-between"
                >
                  <div
                    className={`flex-1 flex flex-col px-10 py-5 items-center md:items-start  `}
                  >
                    <div
                      className={`flex-1  text-2xl rounded-tl-2xl rounded-tr-2xl flex items-center text-gray-800`}
                    >
                      {ticket.name}
                    </div>
                    {availabilityPercent <= 0.3 && (
                      <div className="text-red-600">Scarsity</div>
                    )}
                    {availabilityPercent <= 0.5 &&
                      availabilityPercent > 0.3 && (
                        <div className="text-orange-400">Fast Filling</div>
                      )}
                    {availabilityPercent > 0.5 && (
                      <div className="text-green-600">Available</div>
                    )}
                  </div>
                  <div
                    className={`flex-2 w-full flex py-5 px-10 md:px-0 items-center justify-between md:justify-evenly `}
                  >
                    <div>
                      <div className="text-2xl ">Spots Left</div>
                      <p>{ticket.availableQuantity}</p>
                    </div>
                    <div>
                      <div className="text-2xl ">Price</div>
                      <p>${ticket.price}</p>
                    </div>
                  </div>

                  <div className={`flex p-5 items-center justify-between  `}>
                    <div
                      onClick={() => handleNavigation(ticket.id)}
                      className="bg-gray-900 px-5 py-3 rounded-2xl text-white text-2xl cursor-pointer hover:opacity-70"
                    >
                      Book
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-20 font-mono italic text-gray-500 text-center">
            "Error Fetching Tickets info, Please comback later"
          </div>
        )}
      </div>
      <Authentication
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ConcertDetails;
