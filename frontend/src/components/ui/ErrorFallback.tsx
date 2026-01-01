import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import type { Concert } from '../../types'

type Props = {
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Concert, Error>>
}

const ErrorFallback = ({refetch}:Props) => {
  return (
   <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
        <button onClick={() => refetch()}>Try Again</button>
      </div>
  )
}

export default ErrorFallback