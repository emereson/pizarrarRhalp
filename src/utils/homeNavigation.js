import bookingIco from 'assets/icons/bookingluz1.svg';
import keyIco from 'assets/icons/key1.svg';
import shareIco from 'assets/icons/share1.svg';
import infoIco from 'assets/icons/information1.svg';
import contactIco from 'assets/icons/envelope1.svg';
import companiesIco from 'assets/icons/companies1.svg';

export const navigation = [
  {
    img: bookingIco,
    route: '/booking',
    text: 'Booking',
    alt: 'booking-ico'
  },
  {
    img: keyIco,
    route: '/login',
    text: 'ClassRoom',
    alt: 'KeyIco'
  },
  {
    img: infoIco,
    route: '/info',
    text: 'Info',
    alt: 'info-ico'
  },
  {
    img: companiesIco,
    route: '/companies',
    text: 'Companies',
    alt: 'companies-ico'
  },
  {
    img: contactIco,
    route: '/contact',
    text: 'Contact',
    alt: 'contact-ico'
  },
  {
    img: shareIco,
    route: '/share',
    text: 'Share',
    alt: 'share-ico'
  }
];
