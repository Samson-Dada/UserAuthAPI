import config from '../config.js';

const cookieOptionsSetting = {
  expiresIn: new Date(Date.now() + config.jwtCookiesExpires * 24 * 60 * 60 * 1000),
  httpOnly: true
};

const cookieSetting = (res, token, cookieOptions = cookieOptionsSetting) => {
  if (process.env.NODE_ENV === 'production') {
    cookieOptionsSetting.secure = true;
    res.cookie('userJWT', token, cookieOptions);
  }
};

export default cookieSetting;
