import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../helper';
import '../styles/components/cookie-banner.scss';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(!getCookie('cookiesAccepted'));

  const acceptCookies = () => {
    setCookie('cookiesAccepted', 'true', 365);
    setShowBanner(false);
  };

  if (showBanner) {
    return (
      <div className='cookie-banner'>
        <div className='content'>
          <div className='close-button' onClick={acceptCookies} />
          <p>
            This website is for presentation purposes only. It doesn't collect any data, brand images have been removed and copy replaced with "Lorem ipsum...".
          </p>
          <div className='buttons'>
            <div className='button' onClick={acceptCookies}>
              Got it
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
