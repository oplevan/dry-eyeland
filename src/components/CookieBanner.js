import React, {useState, useEffect} from 'react';
import {getCookie, setCookie} from "../helper";
import '../styles/components/cookie-banner.scss';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(!getCookie("cookiesAccepted"));

    const acceptCookies = () => {
        setCookie("cookiesAccepted", "true", 365);
        setShowBanner(false);
    };

    if (showBanner) {
        return (
            <div className="cookie-banner">
                <div className="content">
                    {/* i've assumed the close button accepts cookies. if not, change to: setShowBanner(false) */}
                    <div className="close-button" onClick={acceptCookies}/>
                    <p>
                        We use cookies to track & improve your experience. Details of the cookies can be found by
                        clicking
                        the "Cookie Policy" link. By clicking "Accept Cookies," you agree to the use of such cookies.
                    </p>
                    <div className="buttons">
                        <div className="button" onClick={acceptCookies}>Accept cookies</div>
                        <a target="_blank" href="https://oysterpointrx.com/cookie-policy/" className="button">Cookie policy</a>
                    </div>
                </div>
            </div>
        );
    } else {
        //dont show the banner
        return null;
    }
}