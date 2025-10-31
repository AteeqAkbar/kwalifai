import JobCard from '@/components/JobCard';

// Mock jobs data
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    posted: '2 days ago',
    logo: '/techcorp-logo.png'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateInc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    posted: '1 week ago',
    logo: '/innovateinc-logo.png'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90,000 - $120,000',
    posted: '3 days ago',
    logo: '/designstudio-logo.png'
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    posted: '5 days ago',
    logo: '/datasystems-logo.png'
  },
  {
    id: 5,
    title: 'DevOps Specialist',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Full-time',
    salary: '$115,000 - $145,000',
    posted: '1 day ago',
    logo: '/cloudtech-logo.png'
  },
  {
    id: 6,
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'Seattle, WA',
    type: 'Contract',
    salary: '$100,000 - $130,000',
    posted: '4 days ago',
    logo: '/appworks-logo.png'
  }
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="btn-primary whitespace-nowrap">
              Search Jobs
            </button>
          </div>
          
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Full-time
            </span>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Remote
            </span>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Engineering
            </span>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Design
            </span>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Product
            </span>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-secondary">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
}