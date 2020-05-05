// Singleton redux-like service. This exists because Firebase Auth SUCKS
// and won't give us claims in the authDidChange call.
// This literally just has get set calls for the claims of the currently logged in user
// ClaimsSingleton is a HACK around Firebase Auth's inability to return a clean user object with
// claims. Please don't use this singleton outside of what's currently been implemented
// There's a Context that wraps these claims for normal use.

let claims = {};

const ClaimsSingleton = {
  setClaims: newClaims => {
    claims = Object.keys(newClaims);
  },
  getClaims: () => claims,
};
Object.freeze(ClaimsSingleton);

const hasClaim = claim => userClaims => {
  return userClaims.includes(claim);
};

// These functions take in the current user claims as an array
const isOfficer = hasClaim('Officer');
const isInductee = hasClaim('Inductee');
const isMember = hasClaim('Member');

export { ClaimsSingleton, isOfficer, isInductee, isMember };
