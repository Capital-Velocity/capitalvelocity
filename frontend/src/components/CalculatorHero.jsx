import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import calculatorImg from "../assets/calculators.jpg";
import calculatorVerticalImg from "../assets/calculatorsvertical.jpg";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    name: "Rental Debt Service Coverage Ratio (DSCR)",
    description:
      "Do you need to assess the financial health of a rental property quickly and accurately? Our Rental DSCR Calculator provides you with a fast and reliable way to determine whether a property can cover its debt obligations. By analyzing rental income against your property’s debt service, you can make informed decisions on investment opportunities. Whether you're a seasoned investor or just getting started, our tool helps you evaluate potential risks and returns with ease. Try it now and take control of your real estate investments!",
    href: "/DsciCalculator",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Fix and Flip",
    description:
      "How much does it cost to flip a house, and what kind of profit can you make? Understanding the full cost breakdown is crucial to a successful project. Our Fix and Flip Calculator helps by estimating your ARV (After Repair Value), potential profit, and hard money loan terms. With this clear insight into costs and projected returns, you can make more informed decisions and reduce risks. Start planning your next fix-and-flip with our easy-to-use calculator!",
    href: "/FixandFlipCalc",
    icon: LockClosedIcon,
  },
  {
    name: "Rental DSCR Optimizer",
    description:
      "The Rental DSCR Optimizer is designed to help investors fine-tune estimated as-is value and rental income to achieve an acceptable Debt Service Coverage Ratio (DSCR) while maintaining an affordable down payment. This powerful tool enables investors to determine the maximum property value and minimum required rent needed to secure loan approval based on available cash for the down payment.",
    href: "/FixandFlipCalc",
    icon: LockClosedIcon,
  },
];

export default function CalculatorHero() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const featuresRef = useRef(null); // New ref for features

  useEffect(() => {
    const handleIntersection = (entries, observer, setVisibility) => {
      const entry = entries[0];
      setVisibility(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, headingObserver, setIsHeadingVisible),
      { threshold: 0.2 } // Trigger when 50% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.2 }
    );

    const featuresObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, featuresObserver, setIsFeaturesVisible),
      { threshold: 0.1 } // Trigger when 50% of the element is visible
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`mx-auto max-w-2xl sm:text-center fade-in ${
            isHeadingVisible ? "fade-in-show" : "fade-in-hide"
          }`}
        >
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Everything you need
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-5xl">
            Streamlined Tools, No Hassle
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Don’t waste time with complicated spreadsheets or guesswork. Our
            calculators provide instant, accurate answers to your property
            investment questions, helping you move forward with confidence.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div
          ref={paragraphRef}
          className={`mx-auto max-w-7xl px-6 lg:px-8 ${
            isParagraphVisible
              ? "fade-in-show paragraph-fade-in-show"
              : "fade-in-hide"
          }`}
        >
          {/* Desktop Image */}
          <img
            alt="App screenshot"
            src={calculatorImg}
            className="hidden sm:block rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
          {/* Mobile Image */}
          <img
            alt="App screenshot"
            src={calculatorVerticalImg}
            className="block sm:hidden rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div
        ref={featuresRef}
        className={`mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8 ${
          isFeaturesVisible
            ? "fade-in-show paragraph-fade-in-show"
            : "fade-in-hide"
        }`}
      >
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                <feature.icon
                  aria-hidden="true"
                  className="size-5 flex-none text-indigo-600"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                <p className="flex-auto">{feature.description}</p>
                <p className="mt-6">
                  <a
                    href={feature.href}
                    className="text-sm/6 font-semibold text-indigo-600"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
