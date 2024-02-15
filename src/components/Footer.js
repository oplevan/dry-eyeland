import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import "../styles/components/footer.scss";
import logo from "../assets/oysterpoint.svg";
import Data from "../pageData.json"
import { PlaneHelper } from "three";

export default function Footer() {
    let location = useLocation();
    let panel = document.querySelector('.panel');
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
        if(panel) panel.style.maxHeight = null;
    }, [location]);

    const renderRefs = () => {
        const filtered = Data.filter(item => item.url === location.pathname);
        
        //check that there is ref data for the current page
        if (filtered.length === 1 && filtered[0].references) {
            const refList = filtered[0].references.map((ref, index) =>
                <span key={index} dangerouslySetInnerHTML={{__html: `<b>${index + 1}.</b>&nbsp;${ref} `}}/>);
            return (<div className={`container references divider-${filtered[0].themeColor}`}>
                

                {/* <h3>References</h3> */}

                <button className={`accordion ${isOpen ? "open" : ""}`} onClick={() => {
                    setOpen(!isOpen);
                    
                    if(isOpen) {
                        panel.style.maxHeight = null;
                    }
                    else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                }}>{location.pathname === "/" ? "Reference" : "References"}</button>
                <div className={`panel ${isOpen ? "open" : ""}`}>
                    {refList}
                </div>
                
                {/* {renderFootnotes(filtered[0].footnotes)} */}
            </div>);
        }
    }

    // const renderFootnotes = (data) => {
    //     if (data) {
    //         return (
    //             <div className="footnotes">
    //                 {data.map((footnote, index) => <p key={index}>{footnote}</p>)}
    //             </div>
    //         );
    //     }
    // };

    // the function below checks if current location matches one of our routes and returns true of false
    // the function is used for renderRefs() as we don't need this section if a user is on 404 page
    const checkPath = () => {
        const path = location.pathname;
        const routes = ["/", "/ocular-summit", "/neural-tributaries", "/tear-film-shores", "/prevalence-point"];
        
        for (let i in routes) {
            if (path === routes[i]) {
                return true; // change to false for testing
            }
        }
    }
    
    return (
        <footer>
            {checkPath() ? renderRefs() : null}

            <div className="container main">
                <div className="company">
                    <img className="oyster-point-logo" src={logo} alt="Oyster Point logo" />
                    <p>&copy; 2021 Oyster Point Pharma, Inc.</p>
                    <p>Oyster Point&trade;, the Oyster Point logo and Dry Eyeland&trade; are trademarks of Oyster Point Pharma, Inc.</p>
                </div>
                <div className="content">
                    <div className="links">
                        <div>
                            <a href="https://oysterpointrx.com/who-we-are/" target="_blank">
                                ABOUT OYSTER POINT
                            </a>
                            <p>
                                Oyster Point Pharma, Inc
                                <br />
                                202 Carnegie Center, Suite 109
                                <br />
                                Princeton, New Jersey 08540
                                <br />
                                United States
                            </p>
                        </div>
                        <div>
                            <a href="https://oysterpointrx.com/contact-us/" target="_blank">
                                CONTACT US
                            </a>
                            <p>General Inquiries</p>
                            <p>
                                <a href="tel:6093829032">(609) 382-9032</a>
                            </p>
                            <p>
                                <a href="mailto:info@oysterpointrx.com">info@oysterpointrx.com</a>
                            </p>
                            <p>OP-COM-000052</p>
                        </div>
                        <div>
                            <a href="https://oysterpointrx.com/privacy-policy/" target="_blank">
                                PRIVACY POLICY
                            </a>
                        </div>
                        <div>
                            <a href="https://oysterpointrx.com/terms-of-use/" target="_blank">
                                TERMS OF USE
                            </a>
                        </div>

                        <div>
                            <a href="https://oysterpointrx.com/cookie-policy/" target="_blank">
                                COOKIE POLICY
                            </a>
                        </div>
                    </div>
                    <div className="mobile-only">
                        <p>
                            Oyster Point Pharma, Inc
                            <br />
                            202 Carnegie Center, Suite 109
                            <br />
                            Princeton, New Jersey 08540
                            <br />
                            United States
                        </p>
                        <p>General Inquiries</p>
                        <p>
                            <a href="tel:6093829032">(609) 382-9032</a>
                        </p>
                        <p>
                            <a href="mailto:info@oysterpointrx.com">info@oysterpointrx.com</a>
                        </p>
                        <p>OP-COM-000052</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}