import FeatureText from '../components/FeatureText';
import React from 'react';
import ScrollContainer from '../components/ScrollContainer';
import SignUp from '../components/SignUp';
import NextUp from '../components/NextUp';
import '../styles/views/tear-film.scss';
import TextBlock from '../components/TextBlock';
import { Helmet } from 'react-helmet';

export default function TearFilm(props) {
  const renderImgOnMobile = <img src={require(`../assets/ocular-layer.jpg`).default} />;

  const renderVideoOnMobile = (
    <video autoPlay muted loop playsInline>
      <source src={require(`../assets/videos/tear-film-shores.mp4`).default} type='video/mp4'></source>
    </video>
  );
  return (
    <div className='page tear'>
      <Helmet>
        <title>Tear Film Shores</title>
        <meta name='description' content='lorem ipsum dolor sit am rem, consectetur adipiscing elit non proident.' />
      </Helmet>
      <ScrollContainer>
        <FeatureText
          image='DED_DSA_TearFilmShores_Image1.png'
          title='Lorem ipsum dolor sit am rem, con adipiscing elit non proident.<sup>1,3,4</sup>'
          body={[
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga cumque magni voluptates doloremque! Aspernatur eveniet expedita quaerat fugit dolorum, iste adipisci reprehenderit sequi nam illo velit ullam eligendi nesciunt perspiciatis.<sup>1,3-7</sup>',
          ]}
        />

        <TextBlock
          className='trigeminal-block'
          title='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga cumque magni voluptates doloremque.<sup>8</sup>'
          titleAlign='left'
          //image="ocular-layer.jpg"
          video='tear-film-shores.mp4'
          aspectRatio={props.aspectRatio}
        >
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam voluptatibus officiis eveniet aperiam necessitatibus soluta quo temporibus officia.
            Cupiditate libero labore, dolore adipisci dolores assumenda ullam repudiandae corporis amet nobis?
          </p>
          {/* Renders main-image here on mobile only */}
          {props.screenWidth ? <div className='video-container-mob'>{renderVideoOnMobile}</div> : null}
        </TextBlock>

        <TextBlock className='components-block' title='Lorem, ipsum dolor sit amet consectetur adipisicing elit.' titleAlign='right'>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/mucins.svg').default} alt='Lorem ipsum' />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid nobis tempore vel quas ullam suscipit cumque fuga, vero laborum, libero expedita
              blanditiis nesciunt! Aperiam illum quisquam recusandae porro sequi illo!
            </p>
          </div>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/aqueous.svg').default} alt='Lorem ipsum' />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid nobis tempore vel quas ullam suscipit cumque fuga, vero laborum, libero expedita
              blanditiis nesciunt! Aperiam illum quisquam recusandae porro sequi illo!
            </p>
          </div>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/lipids.svg').default} alt='Lorem ipsum' />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid nobis tempore vel quas ullam suscipit cumque fuga, vero laborum, libero expedita
              blanditiis nesciunt! Aperiam illum quisquam recusandae porro sequi illo!
            </p>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ullam, minus iste nobis nemo iusto.</p>
        </TextBlock>

        <TextBlock className='substitute-block' title='There is no substitute for a patient’s own natural tear film.<sup>1,15</sup>' titleAlign='left'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel debitis dolor sequi harum libero at nesciunt illo ducimus, voluptatibus ad
            quaerat itaque molestiae laboriosam repellendus? Earum expedita reprehenderit error!
          </p>
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel debitis dolor sequi harum libero at nesciunt illo ducimus, voluptatibus ad
              quaerat itaque molestiae laboriosam repellendus? Earum expedita reprehenderit error!
            </li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel debitis dolor sequi harum libero at nesciunt illo ducimus.</li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel debitis dolor sequi harum libero at nesciunt illo ducimus, voluptatibus ad
              quaerat itaque molestiae laboriosam repellendus?
            </li>
          </ul>
        </TextBlock>

        <TextBlock className='did-you-know-block' title='Did you know?' titleAlign='right'>
          <div className='icon-text'>
            <div className='image'>
              <img src={require('../assets/icons/bulb-blue.svg').default} alt='Lorem ipsum' />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel debitis dolor sequi harum libero at nesciunt illo ducimus, voluptatibus ad
              quaerat itaque molestiae laboriosam repellendus? Earum expedita reprehenderit error!
            </p>
          </div>
        </TextBlock>

        <NextUp url='/prevalence-point' />

        <SignUp />
      </ScrollContainer>
    </div>
  );
}
