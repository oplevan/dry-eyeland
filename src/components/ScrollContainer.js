import {NavLink} from "react-router-dom";
import React, {useRef, useEffect, useState} from "react";
import "../styles/components/scroll-container.scss";
import Data from "../pageData.json";

export default function ScrollContainer(props) {
    const navRef = useRef(null);
    const scrollRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        //handles the scrolling nav
        const config = {
            //root: document.querySelector('nav'),
            rootMargin: window.innerWidth < 768 ? "0px 0px -90px 0px" : "0px 0px -160px 0px",
        };

        const observer = new IntersectionObserver(entries => {
            const [{isIntersecting}] = entries
            if (isIntersecting) {
                setIsSticky(true);
            } 
            else if (window.scrollY < 100) {
                setIsSticky(false);
            }
            else {
                setIsSticky(window.innerWidth < 768 ? true : false);
            }
        }, config);

        observer.observe(scrollRef.current);
        window.onscroll = function() {
            if(window.pageYOffset > 25) {
              setScrolled(true);
            }
            else {
                setScrolled(false);
            }
          };
        return () => {
            observer.disconnect();
        };
    }, []);
    //scroll to next section
    const scrollDown = () => document.querySelector('section.feature').scrollIntoView({
        behavior: 'smooth'
    });
    const navItems = Data.filter(item => item.navImage);

    const renderDots = navItems.map((item, index) =>
        <span key={index} className="dot">
            <NavLink to={item.url} onClick={() => window.scrollTo(0, 0)}>
                <p>{item.title}</p>
                <div className="image">
                    <img src={require(`../assets/${item.navImage}`).default} alt={item.title}/>
                </div>
            </NavLink>
        </span>
    )

    return (
        <div className="gap" ref={scrollRef}>
             <div className={scrolled ? "fade scroll-arrow" : "scroll-arrow"} onClick={scrollDown}>
                        <div className="arrow-icon"/>
                    </div>
            <nav ref={navRef} className={isSticky ? "sticky" : ""}>{renderDots}</nav>
            <div id="scroll-area">{props.children}</div>
        </div>
    )
}