'use client'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from '@tsparticles/slim'
import { loadConfettiPreset } from '@tsparticles/preset-confetti'

// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const ParticlesPage = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      // await loadFull(engine)
      await loadConfettiPreset(engine)

      // await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setInit(true)
    })
  }, [])

  // const particlesLoaded = (container: Container) => {
  //   console.log(container)
  // }

  const options2 = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: '#0d47a1',
      //   },
      // },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  )
  const optionsConfetti = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: '',
        },
        image: '',
        position: '',
        repeat: '',
        size: '',
        opacity: 1,
      },
      backgroundMask: {
        composite: 'destination-out',
        cover: {
          color: {
            value: '#fff',
          },
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: false,
            mode: [],
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: 'circle',
          },
          onHover: {
            enable: false,
            mode: [],
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: 'ease-out-quad',
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: 'ease-out-quad',
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
              selectors: [],
            },
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: '#ffffff',
                },
                stop: {
                  value: '#000000',
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: '#000000',
              },
              length: 2000,
            },
          },
        },
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 50,
          mode: 'bounce',
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: '#00ff00',
          animation: {
            h: {
              count: 0,
              enable: true,
              speed: 50,
              decay: 0,
              delay: 0,
              sync: false,
              offset: 0,
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: [],
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: 'percent',
            radius: 0,
          },
          decay: 0.1,
          distance: {},
          direction: 'none',
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 10,
            enable: true,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: 'destroy',
            bottom: 'destroy',
            left: 'destroy',
            right: 'destroy',
            top: 'none',
          },
          random: false,
          size: false,
          speed: {
            min: 10,
            max: 20,
          },
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: false,
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: 'delete',
            value: 0,
          },
          value: 0,
        },
        opacity: {
          value: {
            min: 0,
            max: 1,
          },
          animation: {
            count: 0,
            enable: true,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: 'auto',
            startValue: 'max',
            destroy: 'min',
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: '#000',
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: 'square',
        },
        size: {
          value: {
            min: 2,
            max: 4,
          },
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: 'auto',
            startValue: 'random',
            destroy: 'none',
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: 'none',
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
            particles: {},
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: 'vertical',
          speed: {
            min: 15,
            max: 25,
          },
        },
        tilt: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false,
          },
          direction: 'random',
          enable: true,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            angle: {
              min: -15,
              max: 15,
            },
            move: 10,
          },
        },
        life: {
          count: 1,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 5,
            sync: true,
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false,
          },
          direction: 'random',
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: '#fff',
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: '#000',
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
          count: 0,
          delay: 0.4,
          duration: 0.1,
        },
        rate: {
          quantity: 150,
          delay: 0.1,
        },
        shape: {
          options: {},
          replace: {
            color: false,
            opacity: false,
          },
          type: 'square',
        },
        startCount: 0,
        size: {
          mode: 'percent',
          height: 0,
          width: 0,
        },
        particles: {},
      },
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    []
  )
  const options = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: '',
        },
        image: '',
        position: '',
        repeat: '',
        size: '',
        opacity: 1,
      },
      backgroundMask: {
        composite: 'destination-out',
        cover: {
          color: {
            value: '#fff',
          },
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: false,
            mode: [],
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: 'circle',
          },
          onHover: {
            enable: false,
            mode: [],
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: 'ease-out-quad',
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: 'ease-out-quad',
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
              selectors: [],
            },
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: '#ffffff',
                },
                stop: {
                  value: '#000000',
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: '#000000',
              },
              length: 2000,
            },
          },
        },
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 50,
          mode: 'bounce',
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: '#00ff00',
          animation: {
            h: {
              count: 0,
              enable: true,
              speed: 50,
              decay: 0,
              delay: 0,
              sync: false,
              offset: 0,
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: [],
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: 'percent',
            radius: 0,
          },
          decay: 0.1,
          distance: {},
          direction: 'none',
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 10,
            enable: true,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: 'destroy',
            bottom: 'destroy',
            left: 'destroy',
            right: 'destroy',
            top: 'none',
          },
          random: false,
          size: false,
          speed: {
            min: 10,
            max: 20,
          },
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: false,
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: 'delete',
            value: 0,
          },
          value: 0,
        },
        opacity: {
          value: {
            min: 0,
            max: 1,
          },
          animation: {
            count: 0,
            enable: true,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: 'auto',
            startValue: 'max',
            destroy: 'min',
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: '#000',
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: 'square',
        },
        size: {
          value: {
            min: 2,
            max: 4,
          },
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: 'auto',
            startValue: 'random',
            destroy: 'none',
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: 'none',
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
            particles: {},
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: 'vertical',
          speed: {
            min: 15,
            max: 25,
          },
        },
        tilt: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false,
          },
          direction: 'random',
          enable: true,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            angle: {
              min: -15,
              max: 15,
            },
            move: 10,
          },
        },
        life: {
          count: 1,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 5,
            sync: true,
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
            decay: 0,
            sync: false,
          },
          direction: 'random',
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: '#fff',
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: '#000',
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
          count: 0,
          delay: 0.4,
          duration: 0.1,
        },
        rate: {
          quantity: 150,
          delay: 0.1,
        },
        shape: {
          options: {},
          replace: {
            color: false,
            opacity: false,
          },
          type: 'square',
        },
        startCount: 0,
        size: {
          mode: 'percent',
          height: 0,
          width: 0,
        },
        particles: {},
      },
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    []
  )

  const options3: ISourceOptions = useMemo(() => {
    return {
      // preset: 'confetti',
      fullScreen: {
        enable: true,
        zIndex: 100,
      },
      fpsLimit: 120,
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: [
            '#26ccff',
            '#a25afd',
            '#ff5e7e',
            '#88ff5a',
            '#fcff42',
            '#ffa62d',
            '#ff36ff',
          ],
        },
        shape: {
          type: ['square', 'circle'],
        },
        opacity: {
          value: { min: 0, max: 1 },
          animation: {
            enable: true,
            speed: 0.5,
            startValue: 'max',
            destroy: 'min',
          },
        },
        size: {
          value: 5,
        },
        links: {
          enable: false,
        },
        life: {
          duration: {
            sync: true,
            value: 40 / 6,
          },
          count: 1,
        },
        move: {
          angle: {
            value: 45,
            offset: 0,
          },
          drift: -30,
          enable: true,
          gravity: {
            enable: true,
            acceleration: 9.81,
          },
          speed: 250,
          decay: 0.1,
          direction: -90,
          random: true,
          straight: false,
          outModes: {
            default: 'none',
            bottom: 'destroy',
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: 'random',
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: 'random',
          enable: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
      detectRetina: true,
      motion: {
        disable: true,
      },
      emitters: {
        name: 'confetti',
        startCount: 50,
        position: {
          x: 90,
          y: 95,
        },
        size: {
          width: 0,
          height: 0,
        },
        rate: {
          delay: 0,
          quantity: 10,
        },
        life: {
          duration: 0.1,
          count: 1,
        },
      },
    }
  }, [])

  if (init) {
    return (
      <Particles
        id='tsparticles'
        // particlesLoaded={particlesLoaded}
        options={options3}
      />
    )
  }

  return <></>
}
