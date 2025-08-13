function AboutUs() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-9rem)]">
      {" "}
      {/* Adjust for header height */}
      <div className="max-w-4xl w-full mx-auto px-6">
        <section className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl md:text-4xl text-green-700 font-bold text-center lg:text-left">
              How It Started
            </h1>
            <div className="p-2">
              <h2 className="text-4xl md:text-3xl font-semibold text-gray-900 text-center lg:text-left ">
                Our Dream is Global Learning Transformation
              </h2>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-center lg:text-left mb-2">
              BookFinder was founded by Daniel Chidozie, a curious reader and
              digital creator. Inspired by hours exploring stories and ideas,
              his vision was to build a platform where books could be discovered
              and shared. Rooted in a love for literature and learning, he began
              shaping BookFinder nearly 6 years ago. With a mission to make
              reading accessible, he assembled a team of developers and
              designers who shared his passion. Together, they launched this
              platform, connecting readers worldwide through the joy of
              discovery and lifelong learning.
            </p>
          </div>

          {/* Image and Stats */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden">
              <img
                src="/aboutImg.jpg"
                alt="Kawruh team working together"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <p className="text-xl md:text-2xl font-bold text-green-700">
                  3.5
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Years Experience
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <p className="text-xl md:text-2xl font-bold text-green-700">
                  23
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Project Challenge
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <p className="text-xl md:text-2xl font-bold text-green-700">
                  830+
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Position Reviews
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-md text-center">
                <p className="text-xl md:text-2xl font-bold text-green-700">
                  100K
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Treated Students
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
