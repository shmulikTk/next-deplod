import { Auth, Hub } from 'aws-amplify';

async function rememberDevice() {
  try {
    await Auth.rememberDevice();
  } catch (error) {
    console.log('Error remembering device', error)
  }
}

export async function signIn(username: string, password: string, isRememberDevice: boolean) {
  try {
    const auth = await Auth.signIn(username, password);
    // if (auth) {
    //   rememberDevice();
    // }
    if (auth) {
      // const attributes = auth.attributes;
      // window.sessionStorage.setItem('userData', JSON.stringify(attributes));
      // window.sessionStorage.setItem('idToken', JSON.stringify(auth.signInUserSession.idToken.jwtToken));
      // window.location.href = '/';
      return auth;
    }
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function signOut() {
  try {
    console.log('signOut');
    await Auth.signOut({ global: true });
    window.sessionStorage.setItem('userData', JSON.stringify(null));
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export function listenToAutoSignInEvent() {
  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      const user = payload.data;
      // assign user
    } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
    }
  })
}


export function forgotPassword(username: string) {
  // Send confirmation code to user's email
  Auth.forgotPassword(username)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
