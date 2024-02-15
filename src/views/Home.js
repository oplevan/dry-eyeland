import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';

import "../styles/views/home.scss";
import logo from "../assets/dryeyeland.svg";
import logoMobile from "../assets/logo_dryeyeland-m.svg"
import {Helmet} from "react-helmet";

export default function Home(props) {
    const [exitTrigger, setExitTrigger] = useState(true);
    const history = useHistory();

    useEffect(() => {
        //change to eye dome image
        if (props.imageRef.current) {
            props.imageRef.current.mesh.position.x = 0;
            props.imageRef.current.mesh.position.y = 0;
            props.imageRef.current.mesh.position.z = 0;
        }
    }, []);

    const startButton = () => {
        //trigger the state to fade out and show next view
        setExitTrigger(false);
    };
    
    return (
        <>
        <Helmet>
                <title>Dry Eyeland | Oyster Point</title>
                <meta name="description" content="Come explore a world where a loss of tear film homeostasis leads to dry eye disease." />
            </Helmet>
        <CSSTransition
            in={exitTrigger}
            timeout={400}
            classNames="fade"
            onExited={() => history.push("/ocular-summit")}
        >
            <div className="page home">
                <h1>Welcome to</h1>
                <img src={props.screenWidth ? logoMobile : logo} alt="Dry Eyeland" className="dry-eyeland-logo"/>
                <p>
                Come explore a world where a loss of tear film homeostasis leads to dry eye disease.<sup>1</sup>
                </p>
                <div className="button get-started" onClick={startButton}>Get Started</div>
            </div>
        </CSSTransition>
        </>
    )
}