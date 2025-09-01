import { NavLink } from "react-router-dom";
import SecondaryButton from "../button/SecondaryButton";

export default function Hero() {
  return (
    <section className="min-h-[calc(100dvh-210px)] flex items-center justify-center px-6">
      <div className="max-w-[130rem] w-full mx-auto text-center p-8">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          The Easiest Way To Open Your World
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10">
          Discover the easiest way to explore, organize, and{" "}
          <span className="text-green-700 font-medium">fall in love</span> with
          books.
        </p>

        {/* CTA Button */}
        <SecondaryButton>
          <NavLink to="/discover">Try it Now</NavLink>
        </SecondaryButton>

        {/* Footer note */}
        <p className="mt-12 text-xs text-gray-500 uppercase tracking-wider">
          SEARCH AND DISCOVER BOOKS FROM GLOBAL LIBRARIES
        </p>
      </div>
    </section>
  );
}
