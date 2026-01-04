import getImageUrl from "../utils/getImageUrl";
import HeroComponent from "../components/HeroComponent";
import { useNavigate } from "react-router";
import useDataProvider from "../utils/dataProvider";
import Spinner from "../components/Spinner";
import ErrorFallback from "../components/ui/ErrorFallback";

/**
 * Home Page Component
 * * Responsibilities:
 * - Fetches and displays categorised and featured concert data.
 * - Handles loading and error states for the landing page.
 * - Manages navigation to individual concert detail pages.
 * * @returns {JSX.Element} The rendered Home page with Hero section and category scrolls.
 */


const Home = () => {
  const { catogorisedData, featuredData, isLoading, isError , refetch} = useDataProvider();
  const navigate = useNavigate();
  // 1. Loading State: High-priority full-screen spinner
  if (isLoading) {
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
      <Spinner/>
    </div>;
  }

  // 2. Error State: Provides user with a 'refetch' option via ErrorFallback
  if (isError) {
    return <ErrorFallback onRetry={refetch}/>
  }

  // 3. Null Check: Handles cases where API succeeds but returns no data
  if(!catogorisedData || !featuredData){
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Failed to fetch details</div>;
  }

  /**
   * Formats the concert name and navigates to the specific concert detail route.
   * @param id - The unique database ID of the concert.
   * @param name - The display name of the concert.
   */

  const handleNavigation = (id: number, name: string) => {
    const formattedName = name.replaceAll(" ", "_");
    navigate(`/concerts/${formattedName}/${id}`);
  };

  const concert_types = Object.keys(catogorisedData);
  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Header: Featured Concerts slider */}
      <HeroComponent featuredList={featuredData} />
      {/* Main Content: Iterating through dynamic concert categories (EDM, Classical, etc.) */}
      <div className="w-full mt-5 flex flex-col gap-10  p-5 md:p-0 ">
        {concert_types.map((concert_type) => (
          <div key={concert_type}>
            <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
              {concert_type.replaceAll("_", " ")}
            </h1>
            {/* Horizontal Scroll Row: Snap-aligned for mobile/desktop UX */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-4 p-4 md:p-6 lg:p-8 snap-x snap-proximity">
              {catogorisedData[concert_type].map((concert) => {
                // Formatting date for localized display (e.g., "Fri, Dec 14")
                const dateObject = new Date(concert.date);
                return (
                  <div
                    className="flex flex-col shrink-0 w-80 snap-start"
                    key={concert.id}
                  >
                    <img
                      className="h-52 w-80 cursor-pointer hover:opacity-70"
                      onClick={() => handleNavigation(concert.id, concert.name)}
                      src={getImageUrl(concert.imagePath)}
                    />
                    <div
                      className="text-2xl font-sans mt-3 cursor-pointer hover:font-stretch-105% hover:underline"
                      onClick={() => handleNavigation(concert.id, concert.name)}
                    >
                      {concert.name}
                    </div>
                    <div>{concert.description}</div>
                    <div>
                      {" "}
                      {dateObject.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="font-bold">@{concert.venue}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
