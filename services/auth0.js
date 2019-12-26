import auth0 from 'auth0-js';

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'manjado.auth0.com',
      clientID: 'VSrdZd7W3m1hn5Bp2JABIU6bn7Bul0IW',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token token',
      scope: 'openid profile'
    });

    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject();
          console.error(err);
        }
      });
    });
  }

  setSession() {
    //save tokens!!
  }

  login() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth0();

export default auth0Client;
