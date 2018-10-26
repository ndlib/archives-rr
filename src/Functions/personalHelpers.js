import jwt from 'jsonwebtoken'

export const isAuthorized = (token) => {
  const decoded = jwt.decode(token, { complete: true })
  if (decoded.payload && decoded.payload.data) {
    // no students allowed
    if (decoded.payload.data.affiliation === 'Student') {
      return false
    } else if (decoded.payload.data.affiliation === 'Staff' || decoded.payload.data.affiliation === 'Faculty') {
      return true
    } else {
      console.warn('Invalid affiliation')
      return false
    }
  }
  console.warn('Invalid token')
  return false
}
