import { useSelector } from "react-redux";

export default function Hero() {
  const user = useSelector((state) => state.user?.name || "Guest");
  return (
    <div className="h-10/12 px-4 flex flex-col items-center justify-center">
      <p className="mb-4 text-center text-3xl lg:text-4xl font-medium text-indigo-400">Hello, {user}</p>
      <h1 className='text-center text-3xl lg:text-5xl font-bold text-gray-300'>What can I help with?</h1>
    </div>
  )
}