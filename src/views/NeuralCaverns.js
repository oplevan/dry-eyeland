import React from 'react';
import FeatureText from '../components/FeatureText';
import ScrollContainer from '../components/ScrollContainer';
import SignUp from '../components/SignUp';
import '../styles/views/neural-caverns.scss';
import NextUp from '../components/NextUp';
import TextBlock from '../components/TextBlock';
import navTo from '../App';
import { Helmet } from 'react-helmet';

export default function NeuralCaverns(props) {
  const renderImgOnMobile = <img src={require(`../assets/ocular-layer.jpg`).default} />;
  const renderVideoOnMobile = (
    <video autoPlay muted loop playsInline>
      <source src={require(`../assets/videos/neural-tributaries.mp4`).default} type='video/mp4'></source>
    </video>
  );
  return (
    <div className='page neural'>
      <Helmet>
        <title>Neural Tributaries</title>
        <meta name='description' content='Lorem ipsum dolor sit amet, consectetur adip.' />
      </Helmet>
      <ScrollContainer>
        <FeatureText
          image='DED_DSA_NeuralTributaries_Image1.png'
          title='Lorem ipsum dolor sit amet, consectetur adipiscing elit.<sup>1-4</sup>'
          body={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..<sup>5</sup>',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          ]}
        />

        <TextBlock
          className='trigeminal-block'
          title='Lorem ipsum.<sup>5</sup>'
          titleAlign='left'
          //image='ocular-layer.jpg'
          video='neural-tributaries.mp4'
          aspectRatio={props.aspectRatio}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit:</p>
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nobis ipsam eum veritatis voluptas magnam. Ea suscipit dicta explicabo
              blanditiis tempore. Animi cum delectus assumenda facilis nemo quis molestias dolor.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, dicta? Natus delectus voluptas totam quisquam numquam, quo tempore autem aperiam
              consequatur alias nulla et deleniti magni excepturi porro minima rem?
            </li>
          </ul>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, debitis earum consequatur quam id alias nemo veritatis, aut qui doloremque ipsum
            sed nisi nulla ipsam odit in doloribus, sequi illo?
          </p>

          {props.screenWidth ? <div className='video-container-mob'>{renderVideoOnMobile}</div> : null}
        </TextBlock>

        <TextBlock className='classification-block' title='Lorem ipsum, dolor sit amet consectetur adipisicing elit' titleAlign='right'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe alias molestiae animi provident dolore a molestias, facilis perspiciatis.</p>

          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/basal.svg').default} />
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique odit aliquid molestias sed, dolor ut labore iure excepturi laborum, quam
              placeat beatae eos aliquam quia dignissimos error quos aperiam distinctio!
            </p>
          </div>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/reflex.svg').default} />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium, porro, quas hic aperiam doloremque modi unde vel similique nihil eligendi
              velit? Libero iste quis dolorum modi amet nihil voluptatem!
            </p>
          </div>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/emotional.svg').default} alt='Lorem ipsum' />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum consequatur ducimus aut dolores at sit illo quis fuga explicabo eum! Error
              similique facere officia et, tempora quas aspernatur mollitia debitis?
            </p>
          </div>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/closed.svg').default} alt='Lorem ipsum' />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum consequatur ducimus aut dolores at sit.</p>
          </div>
        </TextBlock>

        <TextBlock className='did-you-know-block' title='Did you know?' titleAlign='left'>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/bulb.svg').default} alt='Lorem ipsum' />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum consequatur ducimus aut dolores at sit.</p>
          </div>
        </TextBlock>

        <NextUp url='/tear-film-shores' />

        <SignUp />
      </ScrollContainer>
    </div>
  );
}
