import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdSettings, IoMdNotifications } from "react-icons/io";
import Logo from "../assets/doctor.png";
import Image from "next/image";

export default function Navbar({ accountActionsOpen, setAccountActionsOpen }) {
  return (
    <div className="h-20 w-full px-8 flex flex-row justify-end items-center gap-10 border border-gray-200">
      <div className="w-full  flex  items-center gap-6 ">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <p>EzyCare</p>
      </div>
      <IoMdSettings className="text-4xl" />
      <IoMdNotifications className="text-4xl" />
      <MdOutlineAccountCircle
        className="text-5xl"
        onClick={() => {
          setAccountActionsOpen(!accountActionsOpen);
        }}
      />
    </div>
  );
}
