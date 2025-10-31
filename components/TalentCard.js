export default function TalentCard({ talent }) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-semibold text-lg">
            {talent.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
          <p className="text-gray-600">{talent.title}</p>
        </div>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {talent.location}
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {talent.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
          {talent.skills.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              +{talent.skills.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">{talent.experience} experience</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}