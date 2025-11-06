import { fetchAPI } from "@/lib/api";

/**
 * @param {{ params: { id: string } }} props
 */
export default async function PublicProfilePage({ params }) {
  const { id } = params;

  let user;
  try {
    user = await fetchAPI(`/api/users/${id}`);
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          Profile not found or failed to load.
        </div>
      </div>
    );
  }

  if (!user || !user.profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
          This user has not created a public profile yet.
        </div>
      </div>
    );
  }

  const { profile } = user;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h1>
            {profile.headline && (
              <p className="text-gray-600 mt-1">{profile.headline}</p>
            )}
            {profile.currentPosition && (
              <p className="text-gray-600">
                {profile.currentPosition}
                {profile.currentCompany && ` at ${profile.currentCompany}`}
              </p>
            )}
            {profile.location && (
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <span>📍</span> {profile.location}
              </p>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        {profile.profileCompletionPercentage !== undefined && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Profile Completion</span>
              <span>{profile.profileCompletionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${profile.profileCompletionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        {profile.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{profile.summary}</p>
          </section>
        )}

        {/* Work Preferences */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Work Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.openToWork && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Open to work</span>
              </div>
            )}
            {profile.openToRemote && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Open to remote</span>
              </div>
            )}
            {profile.experienceLevel && (
              <div>
                <span className="text-gray-600">Experience:</span> {profile.experienceLevel}
              </div>
            )}
            {profile.yearsOfExperience && (
              <div>
                <span className="text-gray-600">Years:</span> {profile.yearsOfExperience}
              </div>
            )}
            {profile.preferredWorkType && (
              <div>
                <span className="text-gray-600">Preferred:</span> {profile.preferredWorkType}
              </div>
            )}
            {profile.availability && (
              <div>
                <span className="text-gray-600">Availability:</span> {profile.availability}
              </div>
            )}
          </div>
        </section>

        {/* Skills & Languages */}
        {(profile.languages?.length > 0) && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        {[
          { key: 'websiteUrl', label: 'Website', icon: '🌐' },
          { key: 'githubUrl', label: 'GitHub', icon: '🐙' },
          { key: 'linkedinUrl', label: 'LinkedIn', icon: '💼' },
          { key: 'twitterUrl', label: 'Twitter', icon: '🐦' },
          { key: 'portfolioUrl', label: 'Portfolio', icon: '📁' },
        ].filter(link => profile[link.key]).map(link => (
          <div key={link.key} className="mb-2">
            <a
              href={profile[link.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          </div>
        ))}

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
          {profile.educationLevel && (
            <div>
              <span className="font-medium">Education:</span> {profile.educationLevel}
            </div>
          )}
          {profile.timezone && (
            <div>
              <span className="font-medium">Timezone:</span> {profile.timezone}
            </div>
          )}
          {profile.salaryMin && profile.salaryMax && (
            <div>
              <span className="font-medium">Salary Range:</span> {profile.currency} {profile.salaryMin.toLocaleString()} - {profile.salaryMax.toLocaleString()}
            </div>
          )}
          {profile.country && (
            <div>
              <span className="font-medium">Country:</span> {profile.country}
            </div>
          )}
          {profile.city && (
            <div>
              <span className="font-medium">City:</span> {profile.city}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}