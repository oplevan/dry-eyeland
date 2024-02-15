import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SignUp from './SignUp';
import '../styles/components/header.scss';
import Data from '../pageData.json';

export default function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState({ title: '', introText: '' });
  const menuRef = useRef(null);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      //get current page data for the map text overlay
      const filtered = Data.filter((item) => item.url === location.pathname)[0];
      setCurrentPage(filtered);

      //close menu when clicking a link
      menuRef.current.removeEventListener('click', () => {});
      menuRef.current.addEventListener('click', (e) => {
        if (e.target.nodeName === 'A') {
          setMenuOpen(false);
        }
      });
    }
  }, [location.key]);

  //scroll to next section
  const scrollDown = () =>
    document.querySelector('section.feature').scrollIntoView({
      behavior: 'smooth',
    });

  //render the menu items
  const navLinks = Data.slice(1).map((link, index) => (
    <NavLink key={index} to={link.url}>
      {link.title}
    </NavLink>
  ));

  return (
    <>
      <header>
        <div className={`header-bar${menuOpen ? ' top' : ''}`}>
          <Link to='/' className='logo' onClick={() => setMenuOpen(false)}>
            Site Logo
          </Link>
          <div className={`menu-icon${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div ref={menuRef} className={`menu${menuOpen ? ' open' : ''}`}>
          {navLinks}
          <SignUp />
        </div>
      </header>
      {location.pathname !== '/' && (
        <section className='hero'>
          <TransitionGroup>
            <CSSTransition key={currentPage && currentPage.url} classNames='item' timeout={{ enter: 4200, exit: 200 }}>
              <div className='content'>
                <h1>{currentPage && currentPage.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: currentPage && currentPage.introText }}></p>
                <div className='scroll-button' onClick={scrollDown}>
                  Find out more
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </section>
      )}
    </>
  );
}
