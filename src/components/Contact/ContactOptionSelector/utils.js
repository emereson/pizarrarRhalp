import mail from 'assets/icons/contact/contact-envelope.svg';
import chat from 'assets/icons/contact/contact-chat.svg';
import facebook from 'assets/icons/contact/contact-facebook.svg';
import mic from 'assets/icons/contact/contact-mic.svg';
import telephone from 'assets/icons/contact/contact-telephone.svg';
import twitter from 'assets/icons/contact/contact-twitter.svg';
import whatsapp from 'assets/icons/contact/contact-whatsapp.svg';
import instagram from 'assets/icons/contact/contact-instagram.svg';

export const optionsTop = [
  {
    img: mail,
    text: 'mail us',
    alt: 'mail-ico',
    type: 'link',
    link: '/email'
  },
  {
    img: telephone,
    text: 'call us',
    alt: 'call-ico',
    type: 'href',
    href: 'tel:555-555-5555'
  },
  {
    img: whatsapp,
    text: 'whatsapp',
    alt: 'wp-ico',
    type: 'button'
  },
  {
    img: chat,
    text: 'chat',
    alt: 'chat-ico',
    type: 'button'
  }
];

export const optionsDown = [
  {
    img: mic,
    text: 'mic call',
    alt: 'mic-ico',
    type: 'href',
    href: 'tel:555-555-5555'
  },
  {
    img: facebook,
    text: 'facebook',
    alt: 'fb-ico',
    type: 'href',
    href: 'https://fb.com'
  },
  {
    img: instagram,
    text: 'Instagram',
    alt: 'ig-ico',
    type: 'href',
    href: 'https://instagram.com'
  },
  {
    img: twitter,
    text: 'twitter',
    alt: 'tw-ico',
    type: 'href',
    href: 'https://twitter.com'
  }
];

export const onlyMail = [
  {
    img: mail,
    text: 'mail us',
    alt: 'mail-ico',
    type: 'link',
    link: '/email'
  }
];
