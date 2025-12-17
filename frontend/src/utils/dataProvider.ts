import { useMemo } from "react";
import type { Concert, ConcertCategory } from "../types";
import { useConcerts } from "./hooks/concertDataHook";

const dataProvider = () => {
  const { data: concerts, isLoading, isError } = useConcerts();

  const prcessedData = useMemo(() => {
    const catogorisedData: Record<string, Concert[]> = {};
    const featuredData: Concert[] = [];
    const concertNames: string[] = [];
    const concertCategories: ConcertCategory[] = [];
    const concertsData: Concert[] = concerts ? concerts : [];

    concerts?.forEach((concert) => {
      if (concert.isFeatured) {
        featuredData.push(concert);
      }

      const category: ConcertCategory = concert.category;
      if (!catogorisedData[category]) {
        catogorisedData[category] = [];
      }
      if (!concertCategories.includes(category)) {
        concertCategories.push(category);
      }

      catogorisedData[category].push(concert);
      concertNames.push(concert.name);
    });

    return {
      catogorisedData,
      featuredData,
      concertNames,
      concertCategories,
      concertsData,
    };
  }, [concerts]);

  return { ...prcessedData, isLoading, isError };
};

export default dataProvider;
