import FeatureText from '../components/FeatureText';
import React, { useEffect } from 'react';
import ScrollContainer from '../components/ScrollContainer';
import SignUp from '../components/SignUp';
import '../styles/views/prevalence-point.scss';
import TextBlock from '../components/TextBlock';
// import Poll from '../components/Poll';
import { Helmet } from 'react-helmet';

export default function PrevalencePoint(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const renderImgOnMobile = <img src={require(`../assets/OP_DSA_PrevalencePoint_Graph.png`).default} />;

  return (
    <div className='page prevalence'>
      <Helmet>
        <title>Prevalence Point</title>
        <meta name='description' content='' />
      </Helmet>
      <ScrollContainer>
        <FeatureText
          image='DED_DSA_PrevalencePoint_Image1.png'
          title='Lorem, ipsum dolor sit amet consectetur adipisicing elit..<sup>1,4,5</sup>'
          body={[
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro laborum sapiente distinctio debitis tenetur dignissimos unde voluptate facilis saepe.',
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro laborum sapiente distinctio debitis tenetur dignissimos unde voluptate facilis saepe rem omnis laboriosam.',
          ]}
        />

        <TextBlock
          className='diagnosis-block'
          title='Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
          titleAlign='left'
          image='DED_DSA_PrevalencePoint_Image1.png'
          aspectRatio={props.aspectRatio}
        >
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro laborum sapiente distinctio debitis tenetur dignissimos unde voluptate facilis saepe
            rem omnis laboriosam, incidunt eveniet inventore adipisci consectetur ipsa quidem nostrum?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut deserunt itaque maiores sapiente tempore quidem voluptate eos fuga, perferendis atque,
            quos, nihil aspernatur cupiditate? Neque, velit quo. Nihil, ut tenetur!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut deserunt itaque maiores sapiente tempore quidem voluptate eos fuga, perferendis atque,
            quos, nihil aspernatur cupiditate? Neque, velit quo. Nihil, ut tenetur!
          </p>
          {/* Renders main-image here on mobile only */}
          {props.screenWidth ? <div className='video-container-mob'>{renderImgOnMobile}</div> : null}
        </TextBlock>
        <SignUp />
      </ScrollContainer>
    </div>
  );
}
