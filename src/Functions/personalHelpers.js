import jwt from 'jsonwebtoken'

export const isAuthorized = (token) => {
  const decoded = jwt.decode(token, { complete: false })
  if (decoded) {
    // no students allowed
    if (decoded.affiliation.toLowerCase() === 'staff' || decoded.affiliation.toLowerCase() === 'faculty') {
      return true
    } else {
      console.warn('Invalid affiliation')
      return false
    }
  }
  console.warn('Invalid token')
  return false
}
