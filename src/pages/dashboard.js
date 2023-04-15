import { useState, useEffect } from "react"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import app, { auth } from "@/configs/firebase"

import { MdLogout } from "react-icons/md"
import { FiSettings } from "react-icons/fi"

import Navbar from "@/components/Navbar"
import Recorder from "@/components/Recorder"
import Sidebar from "@/components/Sidebar"

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")

  const [tab, setTab] = useState("home")

  useEffect(() => {
    console.log(tab)
  }, [tab])

  const [email, setEmail] = useState("allenshibu@outlook.in")
  const [password, setPassword] = useState("hello123")

  const signup = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const login = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully")
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-full flex flex-row">
        <Sidebar tab={tab} setTab={setTab} />
        <div className="h-full w-full">
          <Navbar />
          <div className="absolute right-0 w-72 h-64 bg-white shadow flex flex-col gap-4">
            <p>Dr. Smith</p>
            <p>smith@mvkshlth.com</p>
            <button className="w-full px-4 flex flex-row justify-between">
              Account
              <FiSettings />
            </button>
            <button className="w-full px-4 flex flex-row justify-between">
              Log Out
              <MdLogout />
            </button>
          </div>
          <div className="w-full h-full flex mt-10 flex-col">
            <div className="py-8 px-8 mx-8 flex flex-col gap-4 bg-slate-100 rounded-xl">
              <p className="text-2xl">Patient Details</p>
              <div className="flex flex-col justify-center items-start gap-4 text-3xl">
                <p>
                  Name: <span className="font-bold">John Doe</span>
                </p>
                <p>
                  Age: <span className="font-bold">65</span>
                </p>
              </div>
            </div>
            <div className="h-full flex flex-col justify-evenly items-center mt-8">
              <div className="w-full h-full flex flex-row justify-evenly items-center">
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="text-3xl">Symptoms</p>
                  <textarea
                    className="h-full w-full"
                    onChange={(e) => {
                      setSymptoms(e.target.value)
                    }}
                    placeholder="Please start recording to generate symptoms"
                  ></textarea>
                </div>
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="text-3xl">Diagnosis</p>
                  <textarea
                    className="h-full w-full"
                    onChange={(e) => {
                      setDiagnosis(e.target.value)
                    }}
                    placeholder="Please start recording to generate diagnosis"
                  ></textarea>
                </div>
              </div>
              <Recorder />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
