import '../styles/components/footer.scss';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/oysterpoint.svg';
import Data from '../pageData.json';

export default function Footer() {
  let location = useLocation();
  let panel = document.querySelector('.panel');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (panel) panel.style.maxHeight = null;
  }, [location]);

  const renderRefs = () => {
    const filtered = Data.filter((item) => item.url === location.pathname);

    //check that there is ref data for the current page
    if (filtered.length === 1 && filtered[0].references) {
      const refList = filtered[0].references.map((ref, index) => (
        <span key={index} dangerouslySetInnerHTML={{ __html: `<b>${index + 1}.</b>&nbsp;${ref} ` }} />
      ));
      return (
        <div className={`container references divider-${filtered[0].themeColor}`}>
          <button
            className={`accordion ${isOpen ? 'open' : ''}`}
            onClick={() => {
              setOpen(!isOpen);

              if (isOpen) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
              }
            }}
          >
            {location.pathname === '/' ? 'Reference' : 'References'}
          </button>
          <div className={`panel ${isOpen ? 'open' : ''}`}>{refList}</div>
        </div>
      );
    }
  };

  // the function below checks if current location matches one of our routes and returns true of false
  // the function is used for renderRefs() as we don't need this section if a user is on 404 page
  const checkPath = () => {
    const path = location.pathname;
    const routes = ['/', '/ocular-summit', '/neural-tributaries', '/tear-film-shores', '/prevalence-point'];

    for (let i in routes) {
      if (path === routes[i]) {
        return true; // change to false for testing
      }
    }
  };

  return (
    <footer>
      {checkPath() ? renderRefs() : null}

      <div className='container main'>
        <div className='footer-logo'>
          Site <br />
          Logo
        </div>
        <div className='content'>
          <div className='links'>
            <div>
              <a href='/'>ABOUT OYSTER POINT</a>
            </div>
            <div>
              <a href='/'>CONTACT US</a>
            </div>
            <div>
              <a href='/'>PRIVACY POLICY</a>
            </div>
            <div>
              <a href='/'>TERMS OF USE</a>
            </div>

            <div>
              <a href='/'>COOKIE POLICY</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
