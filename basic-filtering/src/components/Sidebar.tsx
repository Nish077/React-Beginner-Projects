import { BsFiles, BsPerson } from "react-icons/bs"
import { IoSettingsOutline } from "react-icons/io5"

const Sidebar = () => {
  return (
    <div className="w-16 pt-5 text-white fixed h-screen border border-[#242424] p-4 rounded-sm shadow-sm flex flex-col items-center space-y-10">
        <div className="text-white">Logo</div>
        <div className="text-xl"><BsFiles/></div>
        <div className="text-2xl"><BsPerson/></div>
        <div className="text-white text-xl"><IoSettingsOutline/></div>
    </div>
  )
}

export default Sidebar