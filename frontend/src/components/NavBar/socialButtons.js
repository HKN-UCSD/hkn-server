import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const WebsiteButton = {
  pathname: "https://hkn.ucsd.edu/",
  icon: <LanguageIcon fontSize='inherit' />,
  target: "_blank"
}

const FacebookButton = {
  pathname: "https://www.facebook.com/hknucsd",
  icon: <FacebookIcon fontSize='inherit' />,
  target: "_blank"
}

const InstagramButton = {
  pathname: "https://www.instagram.com/hkn_ucsd/",
  icon: <InstagramIcon fontSize='inherit' />,
  target: "_blank"
}

const LinkedInButton = {
  pathname: "https://www.linkedin.com/company/hkn-ucsd/about/",
  icon: <LinkedInIcon fontSize='inherit' />,
  target: "_blank"
}


export const SocialButtons = [
  WebsiteButton,
  FacebookButton,
  InstagramButton,
  LinkedInButton
];