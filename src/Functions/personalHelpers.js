import jwt from 'jsonwebtoken'

export const isAuthorized = (token) => {
  const decoded = jwt.decode(token, { complete: false })
  if (decoded && decoded.primary_affiliation) {
    // no students allowed
    if (decoded.primary_affiliation.toLowerCase() === 'staff' || decoded.primary_affiliation.toLowerCase() === 'faculty') {
      return true
    } else {
      console.warn('Invalid affiliation')
      return false
    }
  }
  console.warn('Invalid token')
  return false
}
