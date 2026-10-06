import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      // 1. Animaciones de SplitText para títulos y subtítulos
      const heroSplit = new SplitText('.title', { type: 'chars, words' });
      const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

      heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

      gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.06,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.5,
      });

      // 2. Parallax para las hojas
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to('.right-leaf', { y: 200 }, 0)
        .to('.left-leaf', { y: -200 }, 0);

      // 3. ScrollTrigger para el video
      const startValue = isMobile ? 'top 50%' : 'center 60%';
      const endValue = isMobile ? '120% top' : 'bottom top';

      const videoElement = videoRef.current;

      const setupVideoAnimation = () => {
        if (!videoElement) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: videoElement,
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
          },
        });

        tl.to(videoElement, {
          currentTime: videoElement.duration || 0,
        });
      };

      if (videoElement) {
        // Si los metadatos ya están cargados (en caché)
        if (videoElement.readyState >= 1) {
          setupVideoAnimation();
        } else {
          // Si no, esperamos a que carguen
          videoElement.onloadedmetadata = setupVideoAnimation;
        }
      }
    },
    { dependencies: [isMobile], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src={`${import.meta.env.BASE_URL}images/hero-left-leaf.png`}
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src={`${import.meta.env.BASE_URL}images/hero-right-leaf.png`}
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients, creative flair, and
                timeless recipes - designed to delight your senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}videos/input.mp4`}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
};

export default Hero;