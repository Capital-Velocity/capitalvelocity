import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import fixAndFlipCalcImg from "../assets/fixandflipcalc.png";
import rentalDSCRCalcImg from "../assets/rentaldscrcalc.png";
import calculatorOptimizer from "../assets/optimizercalculator.png";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    name: "Fix and Flip",
    description:
      "How much does it cost to flip a house, and what kind of profit can you make? Understanding the full cost breakdown is crucial to a successful project. Our Fix and Flip Calculator helps by estimating your ARV (After Repair Value), potential profit, and hard money loan terms.",
    href: "/calculator-hub?type=fix-and-flip",
    icon: LockClosedIcon,
    img: fixAndFlipCalcImg, // Linking image with feature
  },
  {
    name: "Rental Debt Service Coverage Ratio (DSCR)",
    description:
      "Do you need to assess the financial health of a rental property quickly and accurately? Our Rental DSCR Calculator provides a fast and reliable way to determine whether a property can cover its debt obligations.",
    href: "/calculator-hub?type=rental-dscr",
    icon: CloudArrowUpIcon,
    img: rentalDSCRCalcImg,
  },
  {
    name: "Rental DSCR Optimizer",
    description:
      "The Rental DSCR Optimizer helps investors fine-tune estimated as-is value and rental income to achieve an acceptable Debt Service Coverage Ratio (DSCR) while maintaining an affordable down payment.",
    href: "/calculator-hub?type=dscr-optimizer",
    icon: LockClosedIcon,
    img: calculatorOptimizer,
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
      { threshold: 0.1 }
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
          <h2 className="text-base font-semibold text-indigo-600">
            Everything you need
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Streamlined Tools, No Hassle
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Don’t waste time with complicated spreadsheets or guesswork. Our
            calculators provide instant, accurate answers to your property
            investment questions.
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
          {features.map((feature, index) => (
            <div key={index} className="mb-16">
              {/* Image */}
              <img
                alt={feature.name}
                src={feature.img}
                className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 mx-auto"
              />

              {/* Feature Description */}
              <div className="flex flex-col items-center text-center mt-10">
                <dt className="flex items-center gap-x-3 text-xl font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-indigo-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 max-w-2xl text-lg text-gray-600">
                  {feature.description}
                </dd>
                <p className="mt-6">
                  <a
                    href={feature.href}
                    className="text-sm font-semibold text-indigo-600"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
              <Divider
                style={{ color: "black", marginBottom: 10, marginTop: 10 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
