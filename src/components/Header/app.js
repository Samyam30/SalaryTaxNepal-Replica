"use client"
import Image from "next/image"
import eattance from "../images/desk.gif"
export default function Header(){
  return(
    <>
    <div className="interactive-flow">
      <a href="https://eattendance.com/"><Image src={eattance} className="giff" alt="intro"></Image></a>
    </div>
    <div className="header-info">
    <h1>Salary Tax Calculator Nepal</h1>
    </div>
    
    </>
  )
}