
type Props = {
    onRetry: ()=>void
}

const ErrorFallback = ({onRetry}:Props) => {
  return (
   <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
        <button onClick={onRetry}>Try Again</button>
      </div>
  )
}

export default ErrorFallback