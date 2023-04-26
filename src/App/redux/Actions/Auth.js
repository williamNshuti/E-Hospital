const Auth_User = "user";

export const onSignIn = (user) =>
  localStorage.setItem(Auth_User, JSON.stringify(user));

export const onSignup = (user) =>
  localStorage.setItem(Auth_User, JSON.stringify(user));

export const onSignOut = () => {
  localStorage.removeItem("user");
};
//now lets create a method that checks if the user is logged in anytime

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    localStorage
      .getItem("user")
      .then((res) => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};
