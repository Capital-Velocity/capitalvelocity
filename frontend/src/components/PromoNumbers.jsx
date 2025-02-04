import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const stats = [
  { id: 1, name: "funded through our partners", value: 12, suffix: "+BILLION" },
  { id: 2, name: "lenders in our network", value: 100, suffix: "+" },
  {
    id: 3,
    name: "loans funded through our partners",
    value: 370000,
    suffix: "+",
  },
];

const AnimatedStats = () => {
  const [viewPortEntered, setViewPortEntered] = useState(false);

  useEffect(() => {
    // IntersectionObserver to detect when the component enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setViewPortEntered(true);
          observer.disconnect(); // stop observing after first intersection
        }
      },
      { threshold: 0.5 } // trigger when 50% of the element is in the viewport
    );

    // Targeting the section to observe
    const section = document.getElementById("stats-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div className="bg-blue-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl
          id="stats-section"
          className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base/7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
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
  );
};

export default AnimatedStats;
