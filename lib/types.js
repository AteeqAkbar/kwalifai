/**
 * @typedef {Object} ProfilePayload
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} headline
 * @property {string} summary
 * @property {string} currentPosition
 * @property {string} currentCompany
 * @property {string} location
 * @property {string} country
 * @property {string} city
 * @property {string} websiteUrl
 * @property {string} githubUrl
 * @property {string} linkedinUrl
 * @property {string} twitterUrl
 * @property {string} portfolioUrl
 * @property {string} avatarUrl
 * @property {string} bannerUrl
 * @property {number} salaryMin
 * @property {number} salaryMax
 * @property {string} currency
 * @property {boolean} openToWork
 * @property {boolean} openToRemote
 * @property {string} experienceLevel
 * @property {number} yearsOfExperience
 * @property {string} educationLevel
 * @property {string} availability
 * @property {string} preferredWorkType
 * @property {string[]} languages
 * @property {string} timezone
 * @property {string} phone
 * @property {string} dateOfBirth
 * @property {string} gender
 * @property {boolean} isPublic
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} clerkUserId
 * @property {string} email
 * @property {'job_seeker'|'employer'|'both'} userType
 * @property {'user'|'admin'|'moderator'} role
 * @property {boolean} isActive
 * @property {boolean} emailVerified
 * @property {string} lastActive
 * @property {ProfilePayload & { profileCompletionPercentage?: number }} [profile]
 */