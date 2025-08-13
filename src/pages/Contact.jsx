export default function ContactPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-9rem)] py-12">
      <div className="max-w-5xl w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80vh] max-h-[700px]">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-between p-8 rounded-xl   bg-opacity-90 shadow-lg">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Odin Suta for Vivid Motions®
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Available for work. Follow
              </p>
              <a
                href="mailto:hello@vividmotion.co"
                className="inline-block text-blue-600 hover:text-blue-800 mt-4 transition-colors"
              >
                hello@vividmotion.co
              </a>
            </div>

            <div>
              <button className="w-fit bg-green-700 hover:bg-green-800   text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                Get in touch
              </button>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Meet with Cameron
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Let us show you how Cynolds can transform the way you swim and
                  draw your sensitive data.
                </p>

                <div>
                  <p className="text-xl font-bold">Cameroon Williamson</p>
                  <p className="text-gray-500">Sales Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Compact Form */}
          <div className="p-8 rounded-xl   bg-opacity-90 shadow-lg overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  PHONE
                </label>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  MESSAGE
                </label>
                <textarea
                  placeholder="Your message"
                  className="w-full p-3 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none h-24"
                />
              </div>

              <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-6">
                Submit Message
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500 text-center">
              <p className="mb-1">
                I grew my personal data well to process a accession with the
                privacy policy.
              </p>
              <p>Seven Messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
