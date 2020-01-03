import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

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
    this.logout = this.logout.bind(this);
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

  setSession(authResult) {
    debugger;
    // set time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );


    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    this.auth0.logout({
      returnTo: '',
      clientID: 'VSrdZd7W3m1hn5Bp2JABIU6bn7Bul0IW'
    });
  }


  verifyToken(token) {
    if(token) {
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp * 1000;

      return (decodedToken && new Date().getTime() < expiresAt) ? decodedToken : undefined;
    }

    return undefined

  }

  clientAuth() {
    //debugger
    const token = Cookies.getJSON('jwt');
    const verifiedToken = this.verifyToken(token);

    return verifiedToken;
  }

  serverAuth(req) {
    if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='));

      if (!tokenCookie) {
        return undefined;
      }

      const token = tokenCookie.split('=')[1];
      const verifiedToken = this.verifyToken(token);

      return verifiedToken;
    }
    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
