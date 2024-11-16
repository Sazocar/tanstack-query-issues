import { FiRefreshCcw } from "react-icons/fi";

export const LoadingSpinner = () => {
  return (
    <div className="w-full grid place-content-center">
      <FiRefreshCcw size={40} className="animate-spin"/>
    </div>
  )
}
