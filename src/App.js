import './styles/global.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Scene, TextureLoader } from 'three';

import { UseThree, ZoomBlurImage, zoomBlurShader } from './three-helper';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap, { Power1 } from 'gsap';

import Data from './pageData.json';

import Home from './views/Home';
import OcularSummit from './views/OcularSummit';
import NeuralCaverns from './views/NeuralCaverns';
import TearFilm from './views/TearFilm';
import PrevalencePoint from './views/PrevalencePoint';
import NotFound from './views/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { getCookie, setCookie } from './helper';
import useWindowDimensions from './useWindowDimensions';

function App() {
  let location = useLocation();
  let history = useHistory();
  const [textureLoaded, setTextureLoaded] = useState(false);
  let scene, composer;
  const threeRef = useRef();
  const zoomBlurPass = useRef();
  const imageRef = useRef();
  const loader = new TextureLoader();

  const { width, height } = useWindowDimensions(); // listens for view width change
  const aspectRatio = height / width;
  // get the screen width
  const breakpoint = 768;
  const screenWidth = width <= breakpoint || (aspectRatio > 1 && aspectRatio < 1.5);

  console.log(aspectRatio);

  var mapImage;
  var homeImage;
  if (screenWidth) {
    mapImage = require('./assets/map-image-mobile.jpg').default;
    homeImage = require('./assets/home-background-m.jpg').default;
  } else {
    mapImage = require('./assets/map-image.jpg').default;
    homeImage = require('./assets/home-background.jpg').default;
  }

  useEffect(() => {
    const lastPage = getCookie('lastPage');
    if (lastPage && lastPage !== location.pathname) {
      history.push(lastPage);
      window.location.reload();
    }
    //load three instance
    threeRef.current = UseThree().init({
      canvas: document.getElementById('map-container'),
    });

    initScene();
    setTimeout(() => {
      imageRef.current.resize();
    }, 500);
    animate();
  }, []);

  function initScene() {
    scene = new Scene();
    imageRef.current = ZoomBlurImage(threeRef.current);

    const toLoad = location.pathname === '/' ? homeImage : mapImage;
    imageRef.current.setMap(
      loader.load(toLoad, (texture) => {
        imageRef.current.textureName = location.pathname === '/' ? 'home' : 'map';
        imageRef.current.resize();

        return texture;
      })
    );

    scene.add(imageRef.current.mesh);

    composer = new EffectComposer(threeRef.current.renderer);
    composer.addPass(new RenderPass(scene, threeRef.current.camera));
    zoomBlurPass.current = new ShaderPass(zoomBlurShader);
    zoomBlurPass.current.renderToScreen = true;
    composer.addPass(zoomBlurPass.current);

    threeRef.current.onAfterResize(() => {
      imageRef.current.resize();
    });
  }

  function changePosition(fromHome = false) {
    const page = Data.filter((image) => image.url === location.pathname)[0];
    var mapPosition;
    if (page && page.mapPosition) {
      if (screenWidth && aspectRatio < 1.5 && aspectRatio > 1) {
        mapPosition = page.mapPosition.tablet;
      } else if (screenWidth) {
        mapPosition = page.mapPosition.mobile;
      } else {
        mapPosition = page.mapPosition.desktop;
      }
      // const mapPosition = screenWidth ? page.mapPosition.mobile : page.mapPosition.desktop;

      //zoom out to show all of map
      const zoomOut = () =>
        new Promise((resolve, reject) => {
          gsap
            .to(imageRef.current.mesh.position, {
              x: screenWidth ? -5 : 0,
              y: 0,
              z: screenWidth ? 30 : 0,
              duration: 1.4,
              delay: 0.2,
            })
            .then(() => resolve());

          gsap.to(zoomBlurPass.current.uniforms['strength'], {
            keyframes: [{ value: 0.1 }, { value: 0.3 }, { value: 0 }],
            duration: 1.6,
            delay: 0,
            ease: Power1.easeOut,
          });
        });

      //zoom in to specified location position
      const zoomIn = (delay = 1.7) =>
        new Promise((resolve, reject) => {
          gsap
            .to(imageRef.current.mesh.position, {
              x: (mapPosition.x / 100) * threeRef.current.size.wWidth,
              y: (mapPosition.y / 100) * threeRef.current.size.wHeight,
              z: mapPosition.z,
              duration: 1.4,
              delay: delay,
            })
            .then(() => resolve());

          gsap.to(zoomBlurPass.current.uniforms['strength'], {
            keyframes: [{ value: 0.1 }, { value: 0.3 }, { value: 0 }],
            duration: 1.6,
            delay: delay,
            ease: Power1.easeOut,
          });
        });

      //begin animation sequence
      if (imageRef.current.mesh.position.z > 0 && !fromHome) {
        //include zoom out
        Promise.all([zoomOut(), zoomIn()]);
      } else {
        //first time loading, just zoom in
        Promise.all([zoomIn(0.5)]);
      }
    }
  }

  function shouldSwitch() {
    //only change the texture image when required - prevent performance issues

    if (location.pathname === '/' && imageRef.current.textureName !== 'home') {
      //change map image to home image
      imageRef.current.setMap(
        loader.load(homeImage, (texture) => {
          imageRef.current.textureName = 'home';

          return texture;
        })
      );
    } else if (location.pathname !== '/' && imageRef.current.textureName === 'home') {
      //change home image to map image
      const zoomEffect = () =>
        gsap.to(zoomBlurPass.current.uniforms['strength'], {
          keyframes: [{ value: 0.1 }, { value: 0.5 }],
          duration: 0.6,
          ease: Power1.easeIn,
        });
      const zoomIn = () =>
        gsap
          .to(imageRef.current.mesh.position, {
            z: 99.9,
            duration: 0.6,
            delay: 0.2,
          })
          .then(() => {
            //imageRef.current.setMap(loader.load(require("./assets/20_6158_Precision_Eyeland-M-Comp_w10-green-test_crop_NEW2_18.jpg").default,
            imageRef.current.setMap(
              loader.load(mapImage, (texture) => {
                imageRef.current.textureName = 'map';
                imageRef.current.resize();
                return texture;
              })
            );
            gsap.to(imageRef.current.mesh.position, {
              x: (-18 / 100) * threeRef.current.size.wWidth,
              y: (-2 / 100) * threeRef.current.size.wHeight,
              z: 99.9,
              duration: 0,
            });
            //make sure aspect ratio is correct
            setTimeout(() => {
              imageRef.current.resize();
            }, 100);
            changePosition(true);
          });

      zoomEffect();
      zoomIn();
    } else if (location.pathname === '/' && imageRef.current.textureName !== 'map') {
      return;
    } else {
      changePosition();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    composer.render();
  }

  useEffect(() => {
    //link changed, scroll to top to see map animation
    window.scrollTo(0, 0);

    //make sure aspect ratio is correct
    setTimeout(() => {
      imageRef.current.resize();
    }, 500);

    //change map position to new location path
    if (textureLoaded) {
      shouldSwitch();
    } else {
      if (location.pathname !== '/') {
        changePosition();
      }

      setTextureLoaded(true);
    }

    //add browser cookie to save new location path (save for 31 days)
    setCookie('lastPage', location.pathname, 31);
  }, [location]);

  return (
    <>
      <Header />

      <canvas id='map-container' />

      <Switch>
        <Route exact path='/'>
          <Home screenWidth={screenWidth} imageRef={imageRef} />
        </Route>
        <Route exact path='/ocular-summit'>
          <OcularSummit screenWidth={screenWidth} aspectRatio={aspectRatio} />
        </Route>
        <Route exact path='/neural-tributaries'>
          <NeuralCaverns screenWidth={screenWidth} aspectRatio={aspectRatio} />
        </Route>
        <Route exact path='/tear-film-shores'>
          <TearFilm screenWidth={screenWidth} aspectRatio={aspectRatio} />
        </Route>
        <Route exact path='/prevalence-point'>
          <PrevalencePoint screenWidth={screenWidth} aspectRatio={aspectRatio} />
        </Route>
        <Route path='*' component={NotFound} />
      </Switch>

      <Footer />

      <CookieBanner />
    </>
  );
}

export default App;
