import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pakistan's
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Premier Tech Marketplace
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Find Your Next Role or Your Next Star
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              href="/jobs"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Find a Job
            </Link>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Become iLEAP Verified
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              For Employers
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by role, skill, or company..."
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none shadow-sm"
              // value=""
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-slate-600">Active Jobs</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100K+</div>
            <div className="text-slate-600">Talents</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-slate-600">Companies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
