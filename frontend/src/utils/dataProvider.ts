import type { Concert } from "../types"
import { useConcerts } from "./hooks/concertDataHook"


const dataProvider = ()=>{
    const {data:concerts,isLoading,isError} = useConcerts()

    const catogorisedData : Record<string , Concert[]> = {}
    const featuredData : Concert[]  =[]

    concerts?.forEach((concert)=>{
        if(concert.isFeatured){
            featuredData.push(concert)
        }

        const category = concert.category
        if(!catogorisedData[category]){
            catogorisedData[category]=[]
        }

        catogorisedData[category].push(concert)
    })

    return {catogorisedData,featuredData,isLoading,isError}
    
}

export default dataProvider