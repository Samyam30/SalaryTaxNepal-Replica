"use client"
import Link from "next/link";
import { AiFillMail } from "react-icons/ai";
export default function Footer(){
  return(
    <div className="foothead">
    <div className="footer">All text and design is copyright &#169; 2024 Eattendance.com. All rights reserved.</div>
    <div className="logoi"><AiFillMail className="heee"/><Link className="hili" href="mailto:info@eattendance.com"> info@eattendance.com</Link></div>
    </div>
  )
}