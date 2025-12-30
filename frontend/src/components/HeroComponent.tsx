import React, { useEffect, useState } from "react";
import type { Concert } from "../types";
import getImageUrl from "../utils/getImageUrl";
import { useNavigate } from "react-router";

type Props = {
  featuredList: Concert[];
};

const HeroComponent = ({ featuredList }: Props) => {
  // const featuredList = concerts?.filter(
  //   (concert) => concert.isFeatured === true
  // );
  const [currentSLide, setCurrentSlide] = useState(0);
  const navigation = useNavigate();
  const totalSlides = featuredList.length;

  useEffect(() => {
    if (totalSlides == 0) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const concert = featuredList[currentSLide];
  const dateObject = new Date(concert.date);

  const handleNavigation = () => {
    const formattedName = concert.name.replaceAll(" ", "_");
    navigation(`/concerts/${formattedName}/${concert.id}`);
  };
  return (
    <div
      className="w-full overflow-hidden relative transition-opacity duration-1000 ease-in-out md:mt-5 md:rounded-2xl"
      onClick={handleNavigation}
    >
      <div
        key={concert.id}
        className="relative h-128 bg-cover bg-top flex flex-col justify-center items-center p-4"
        style={{ backgroundImage: `url('${getImageUrl(concert.imagePath)}')` }}
      >
        <div>
          <div className="absolute z-10 inset-0 bg-black/40 " />
          <div className="relative z-20 h-full flex flex-col items-center text-white p-4">
            <p>{concert.artist}'s</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-serif">
              {concert.name}
            </h1>
            <div className="text-2xl font-extralight">
              {concert.description}
            </div>
            <div className="mt-4 text-2xl font-extralight">
              {dateObject.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="font-sans font-bold">@{concert.venue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
