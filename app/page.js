"use client";
import Hero from "@/components/Hero";
import JobCard from "@/components/jobs/JobCard";
import TalentCard from "@/components/TalentCard";
import { useJobs } from "@/hooks/useJobs";

// Mock data
const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    logo: "/techcorp-logo.png",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateInc",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
    logo: "/innovateinc-logo.png",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    type: "Contract",
    salary: "$90,000 - $120,000",
    posted: "3 days ago",
    logo: "/designstudio-logo.png",
  },
];

const featuredTalents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    location: "Austin, TX",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    experience: "5 years",
    avatar: "/sarah-avatar.png",
  },
  {
    id: 2,
    name: "Mike Chen",
    title: "Data Scientist",
    location: "Boston, MA",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    experience: "4 years",
    avatar: "/mike-avatar.png",
  },
  {
    id: 3,
    name: "Emily Davis",
    title: "Product Designer",
    location: "Remote",
    skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    experience: "6 years",
    avatar: "/emily-avatar.png",
  },
];

export default function Home() {
  const { data, loading, error } = useJobs();
  return (
    <div>
      <Hero />

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600">
              Discover your next career opportunity
            </p>
          </div>
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div> */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : data && data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Pagination */}
              {data.pages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(data.currentPage - 1)}
                    disabled={data.currentPage <= 1}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-700">
                    Page {data.currentPage} of {data.pages}
                  </span>

                  <button
                    onClick={() => handlePageChange(data.currentPage + 1)}
                    disabled={data.currentPage >= data.pages}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
          <div className="text-center mt-8">
            <a href="/jobs" className="btn-primary">
              View All Jobs
            </a>
          </div>
        </div>
      </section>

      {/* Featured Talents Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Talents
            </h2>
            <p className="text-lg text-gray-600">
              Connect with top professionals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/talents" className="btn-primary">
              Browse All Talents
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies and professionals already using
            LeapTalent
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/auth/register?type=employer"
              className="btn-secondary bg-white hover:bg-gray-100"
            >
              Hire Talent
            </a>
            <a
              href="/auth/register?type=talent"
              className="btn-primary bg-blue-500 hover:bg-blue-400 border border-white"
            >
              Find Jobs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
