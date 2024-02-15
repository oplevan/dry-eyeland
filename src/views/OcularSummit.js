import React from 'react';
import FeatureText from '../components/FeatureText';
import ScrollContainer from '../components/ScrollContainer';
import SignUp from '../components/SignUp';
import NextUp from '../components/NextUp';
import TextBlock from '../components/TextBlock';
import '../styles/views/ocular-summit.scss';
import { Helmet } from 'react-helmet';

export default function OcularSummit(props) {
  const symptoms = [
    { image: 'redness', text: 'Symptom' },
    { image: 'inflammation', text: 'Symptom' },
    { image: 'dryness', text: 'Symptom' },
    { image: 'watery', text: 'Symptom' },
    { image: 'discomfort', text: 'Symptom' },
    { image: 'burning', text: 'Symptom' },
    { image: 'blurry', text: 'Symptom' },
    { image: 'sensitivity', text: 'Symptom' },
  ];

  const renderSymptoms = symptoms.map((symptom, index) => (
    <div className='symptom' key={index}>
      <span>
        <img src={require(`../assets/icons/${symptom.image}.svg`).default} alt='' />
      </span>
      <span dangerouslySetInnerHTML={{ __html: symptom.text }}></span>
    </div>
  ));

  const renderVideoOnMobile = (
    <video autoPlay muted loop playsInline>
      <source src={require(`../assets/videos/ocular-summit.mp4`).default} type='video/mp4'></source>
    </video>
  );

  return (
    <div className='page ocular'>
      <Helmet>
        <title>Ocular Summit</title>
        <meta
          name='description'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
      </Helmet>
      <ScrollContainer>
        <FeatureText
          image='DED_DSA_OcularSummit_Image1.png'
          title='Lorem ipsum dolor sit amet, consectetur.<sup>1-3</sup>'
          body={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<sup>1-3</sup>',
          ]}
        />

        <TextBlock
          className='symptoms'
          title='Common dry eye symptoms include:'
          titleAlign='left'
          //image="ocular-layer.jpg"
          video='ocular-summit.mp4'
          aspectRatio={props.aspectRatio}
        >
          <div className='symptom-block'>{renderSymptoms}</div>
          {props.screenWidth ? <div className='video-container-mob'>{renderVideoOnMobile}</div> : null}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<sup>1-3</sup>
          </p>
        </TextBlock>
        <NextUp url='/neural-tributaries' />
        <SignUp />
      </ScrollContainer>
    </div>
  );
}
