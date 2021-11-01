import React, { useEffect } from 'react'
import "./Contact.css";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import { SiGmail } from "react-icons/si";
import "aos/dist/aos.css"
import Aos from "aos";
import Navbar from './Navbar';
import Bbar from './Bbar';

function Contact() {
    useEffect(() => {
        Aos.init({duration:1000})
      }, []);
    return (
        <>
        <Navbar/>
        <div className="image5">
          
        <div className="C-center">
        
            <div className="C-container C-font" data-aos="fade-up">
                <div className="C-title">
                  Hi guys
                </div>
                <div>
                <span className="C-icon"><RiIcons.RiEarthFill/></span> serching developer for your company? I'm currently available for work.
                </div>
                <div>
                <sapan className="C-icon"><FaIcons.FaQuestionCircle/></sapan> Maybe wanna learn something new or anything to ask?
                </div>
                <div>
                <span className="C-icon"><MdIcons.MdOutlineDeveloperMode/></span> Wanna Collaborate or pitch in for some Fun/Real projects?
                </div>
                <div className="C-mail">
                <div>
                <SiGmail/> Gmail<br/>
                lavakumar16000@gmail.com
                </div>
                </div>
            </div>
        </div>
        </div>
        <Bbar/>
        </>
    )
}

export default Contact
