import React, { useState } from 'react';
import '../styles/components/sign-up.scss';

export default function SignUp() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e) => {
    //submit the form
    let input = e.target.parentElement.querySelector('input').value;
    let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(emailRegEx)) {
      setError(false);
      setSubmitted(true);
    } else {
      setError(true);
    }
    return false;
  };

  const view = () => {
    if (submitted) {
      return <p className='submitted'>THANK YOU!</p>;
    } else {
      return (
        <div className='inner-wrap'>
          <div className='input-container'>
            <form
              id='sign-up'
              className='input-box'
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input type='email' name='email' placeholder='Email Address' />

              {window.innerWidth < 768 ? error && <p className='submit-error error-on-mobile'>*Please provide a valid email address.</p> : null}
              <div className={`button ${error && 'change-margin-on-error'}`} onClick={submit}>
                SIGN UP
              </div>
            </form>
            {window.innerWidth > 768 ? error && <p className='submit-error'>*Please provide a valid email address.</p> : null}
          </div>
          <div className='message'>By clicking "sign up" no data will be stored. This website is for demonstration purposes only.</div>
        </div>
      );
    }
  };

  return (
    <section className='sign-up'>
      <div className='container'>
        <h2>Interested in receiving updates?</h2>
        {view()}
      </div>
    </section>
  );
}
