export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signin_only",
    editProfile: "B2C_1_edit_profile_v2",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://allsetradev.b2clogin.com/allsetradev.onmicrosoft.com/B2C_1_signin_only",
    },
    editProfile: {
      authority:
        "https://allsetradev.b2clogin.com/allsetradev.onmicrosoft.com/B2C_1_edit_profile_v2",
    },
  },
  authorityDomain: "allsetradev.b2clogin.com",
};
