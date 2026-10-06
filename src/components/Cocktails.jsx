import { useRef } from 'react';
import { cockTailLists, mockTailLists } from '../../constants/index.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#cocktails',
          start: 'top 30%',
          end: 'bottom 80%',
          scrub: true,
        },
      });

      parallaxTimeline
        .from('#c-left-leaf', {
          x: -100,
          y: 100,
        })
        .from(
          '#c-right-leaf',
          {
            x: 100,
            y: 100,
          },
          0 // Inicia en simultáneo con la animación anterior
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="cocktails" className="noisy" ref={containerRef}>
      {/* Rutas de imágenes adaptadas para GitHub Pages */}
      <img
        src={`${import.meta.env.BASE_URL}images/cocktail-left-leaf.png`}
        alt="l-leaf"
        id="c-left-leaf"
      />
      <img
        src={`${import.meta.env.BASE_URL}images/cocktail-right-leaf.png`}
        alt="r-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>
          <ul>
            {cockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;