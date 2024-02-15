import { Mesh, PerspectiveCamera, PlaneBufferGeometry, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from 'three';

export const zoomBlurShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    resolution: { type: 'v2', value: new Vector2(window.innerWidth, window.innerHeight) },
    strength: { type: 'f', value: 0 },
  },
  vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
  fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float strength;
        
        float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}
        
        void main() {
            vec2 center = .5 * resolution;
            vec4 color=vec4(0.0);
            float total=0.0;
            vec2 toCenter=center-vUv*resolution;
            float offset=random(vec3(12.9898,78.233,151.7182),0.0);
            for(float t=0.0;t<=40.0;t++){
            float percent=(t+offset)/40.0;
            float weight=4.0*(percent-percent*percent);
            vec4 samplee=texture2D(tDiffuse,vUv+toCenter*percent*strength/resolution);
            samplee.rgb*=samplee.a;
            color+=samplee*weight;
            total+=weight;
        }
        
        gl_FragColor=color/total;
        gl_FragColor.rgb/=gl_FragColor.a+0.00001;
        }
      `,
};

export function UseThree() {
  // default conf
  const conf = {
    canvas: null,
    antialias: true,
    alpha: false,
    camera_fov: 50,
    camera_pos: new Vector3(0, 0, 100),
    mouse_raycast: false,
    window_resize: true,
  };

  // size
  const size = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
  };

  let afterResizeCallbacks = [];

  // returned object
  const obj = {
    conf,
    renderer: null,
    camera: null,
    cameraCtrl: null,
    size,
    init,
    setSize,
    onAfterResize,
  };

  /**
   * init three
   */
  function init(params) {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        conf[key] = value;
      }
    }

    obj.renderer = new WebGLRenderer({ canvas: conf.canvas, antialias: conf.antialias, alpha: conf.alpha });

    obj.camera = new PerspectiveCamera(conf.camera_fov);
    obj.camera.position.copy(conf.camera_pos);

    if (conf.window_resize) {
      onResize();
      if (window.innerWidth > 767) {
        window.addEventListener('resize', onResize);
      } else {
        window.addEventListener('orientationchange', function () {
          var afterOrientationChange = function () {
            onResize();
            window.removeEventListener('resize', afterOrientationChange);
          };
          window.addEventListener('resize', afterOrientationChange);
        });
      }
    }

    return obj;
  }

  /**
   * add after resize callback
   */
  function onAfterResize(callback) {
    afterResizeCallbacks.push(callback);
  }

  /**
   * resize listener
   */
  function onResize() {
    setSize(window.innerWidth, window.innerHeight);
    afterResizeCallbacks.forEach((c) => c());
  }

  /**
   * update renderer size and camera
   */
  function setSize(width, height) {
    size.width = width;
    size.height = height;
    size.ratio = width / height;
    obj.renderer.setPixelRatio(window.devicePixelRatio);
    obj.renderer.setSize(width, height, false);
    obj.camera.aspect = size.ratio;
    obj.camera.updateProjectionMatrix();

    const wsize = getCameraSize();
    size.wWidth = wsize[0];
    size.wHeight = wsize[1];
  }

  /**
   * calculate camera visible area size
   */
  function getCameraSize() {
    const vFOV = (obj.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(vFOV / 2) * Math.abs(obj.camera.position.z);
    const w = h * obj.camera.aspect;
    return [w, h];
  }

  return obj;
}

export function ZoomBlurImage(three) {
  let geometry, material, mesh;

  const uMap = { value: null };
  const uCenter = { value: new Vector2(0.5, 0.5) };
  const uStrength = { value: 0 };
  const uUVOffset = { value: new Vector2(0, 0) };
  const uUVScale = { value: new Vector2(1, 1) };

  init();

  return { geometry, material, mesh, uCenter, uStrength, setMap, resize };

  function init(params) {
    geometry = new PlaneBufferGeometry(1, 1, 1, 1);

    material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        map: uMap,
        center: uCenter,
        strength: uStrength,
        uvOffset: uUVOffset,
        uvScale: uUVScale,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // adapted from from https://github.com/evanw/glfx.js
      fragmentShader: `
        uniform sampler2D map;
        uniform vec2 center;
        uniform float strength;
        uniform vec2 uvOffset;
        uniform vec2 uvScale;
        varying vec2 vUv;

        float random(vec3 scale, float seed) {
          /* use the fragment position for a different seed per-pixel */
          return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
        }
        
        void main() {
          vec2 tUv = vUv * uvScale + uvOffset;
          if (abs(strength) > 0.001) {
            vec4 color = vec4(0.0);
            float total = 0.0;
            vec2 toCenter = center * uvScale + uvOffset - tUv;
            
            /* randomize the lookup values to hide the fixed number of samples */
            float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
            
            for (float t = 0.0; t <= 20.0; t++) {
              float percent = (t + offset) / 20.0;
              float weight = 2.0 * (percent - percent * percent);
              vec4 texel = texture2D(map, tUv + toCenter * percent * strength);

              /* switch to pre-multiplied alpha to correctly blur transparent images */
              texel.rgb *= texel.a;

              color += texel * weight;
              total += weight;
            }

            gl_FragColor = color / total;

            /* switch back from pre-multiplied alpha */
            gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
            gl_FragColor.a = 1.0 - abs(strength);
          } else {
            gl_FragColor = texture2D(map, tUv);
          }
        }
      `,
    });

    mesh = new Mesh(geometry, material);
  }

  function setMap(value) {
    uMap.value = value;
    resize();
  }

  function resize() {
    try {
      mesh.scale.set(three.size.wWidth, three.size.wHeight, 1);
      const iWidth = uMap.value.image.width;
      const iHeight = uMap.value.image.height;
      const iRatio = iWidth / iHeight;
      uUVOffset.value.set(0, 0);
      uUVScale.value.set(1, 1);

      if (iRatio > three.size.ratio) {
        uUVScale.value.x = three.size.ratio / iRatio;
        uUVOffset.value.x = (1 - uUVScale.value.x) / 2;
      } else {
        uUVScale.value.y = iRatio / three.size.ratio;
        uUVOffset.value.y = (1 - uUVScale.value.y) / 2;
      }
    } catch {}
  }
}
