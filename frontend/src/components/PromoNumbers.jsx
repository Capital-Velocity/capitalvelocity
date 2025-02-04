import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { label: "Funded through our partners", value: 12, suffix: "+Billion" },
  { label: "Lenders in our network", value: 100, suffix: "+" },
  { label: "Loans funded through our partners", value: 370000, suffix: "+" },
];

const MissionSection = () => {
  const [viewPortEntered, setViewPortEntered] = useState(false);
  const statsRef = useRef(null);

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setViewPortEntered(true); // Trigger CountUp when the section becomes visible
          observer.disconnect(); // Disconnect observer once it's triggered
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const handleIntersection = (entries, observer, setVisibility) => {
      const entry = entries[0];
      setVisibility(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, headingObserver, setIsHeadingVisible),
      { threshold: 0.8 } // Trigger when 20% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.8 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);

    if (statsRef.current) {
      observer.observe(statsRef.current); // Start observing the stats section
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current); // Clean up the observer
      }
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
    };
  }, []);

  return (
    <div className="bg-blue-100 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          {/* <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            It takes a little money to make a big difference.{" "}
          </h2> */}
          <h2
            ref={headingRef}
            className={`text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-6xl fade-in ${
              isHeadingVisible ? "fade-in-show" : "fade-in-hide"
            }`}
          >
            <span className="">
              It takes a little money to make a big difference.{" "}
            </span>{" "}
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p
                ref={paragraphRef}
                className={`text-xl/8 text-gray-600 fade-in ${
                  isParagraphVisible
                    ? "fade-in-show paragraph-fade-in-show"
                    : "fade-in-hide"
                }`}
              >
                Banks are turning down 8 out of 10 small business loan
                applications. That means a lot of people have to give up on
                their dreams because they don't have the money they need to
                start or growth their business and/or start or complete their
                real estate project.
              </p>
              {/* <p className="mt-10 max-w-xl text-base/7 text-gray-700"> */}
              <p
                ref={paragraphRef}
                className={`mt-10 max-w-xl text-base/7 text-gray-700 ${
                  isParagraphVisible
                    ? "fade-in-show paragraph-fade-in-show-extra"
                    : "fade-in-hide"
                }`}
              >
                Capital Velocity is changing that. We're helping small business
                owners and real estate entrepreneurs get the loans they need to
                turn their ideas into reality. We're backing their ambition so
                they can be the builders of American dreams. <br /> <br />A
                strong, successful America starts with small businesses.
              </p>
            </div>
            <div
              ref={statsRef} // Ref to target the section for IntersectionObserver
              className="lg:flex lg:flex-auto lg:justify-center"
            >
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-y-4"
                  >
                    <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                      <CountUp
                        start={0}
                        end={viewPortEntered ? stat.value : 0}
                        duration={2}
                        suffix={stat.suffix}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
