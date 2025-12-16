import type { Concert, ConcertCategory } from "../types"
import { useConcerts } from "./hooks/concertDataHook"


const dataProvider = ()=>{
    const {data:concerts,isLoading,isError} = useConcerts()

    const catogorisedData : Record<string , Concert[]> = {}
    const featuredData : Concert[]  =[]
    const concertNames : string[] = []
    const concertCategories: ConcertCategory[] = []

    concerts?.forEach((concert)=>{
        if(concert.isFeatured){
            featuredData.push(concert)
        }
        

        const category : ConcertCategory = concert.category
        if(!catogorisedData[category]){
            catogorisedData[category]=[]
        }
        if(!concertCategories.includes(category)){
            concertCategories.push(category)
        }

        catogorisedData[category].push(concert)
        concertNames.push(concert.name)
        
    })

    return {catogorisedData,featuredData,isLoading,isError, concertNames,concertCategories}
    
}

export default dataProvider