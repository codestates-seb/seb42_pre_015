import styled from 'styled-components';
import { SOiconSVG } from '../../assets/CommonSVG';

const FooterStyle = styled.footer`
  background-color: hsl(210deg 8% 15%);
  color: hsl(210deg 8% 90%);
  @media (min-width: 981px) {
    .footer-container {
      display: grid;
      grid-template-columns: 0.1fr 0.7fr 0.2fr;
      height: 322px;
      width: 100%;
      .footer-logo {
        margin-top: 30px;
        margin-left: 50px;
      }
      .footer-nav {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-start: 2;
        .footer-nav__cols {
          h5 {
            font-size: 1.2rem;
            font-weight: bold;
          }
          a {
            color: hsl(210deg 8% 65%);
          }
          li {
            margin-top: 12px;
          }
        }
      }
      .footer-right {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        margin-right: 5px;
        li {
          margin-top: 30px;
          float: left;
          margin-left: 1.3rem;
          color: hsl(210deg 8% 65%);
        }
        .footer-right__bottom {
          display: grid;
          align-items: end;
          margin-left: 1.3rem;
          margin-bottom: 50px;
          color: hsl(210deg 8% 65%);
          white-space: pre-line;
        }
      }
    }
  }
  @media (max-width: 980px) {
    .footer-container {
      display: grid;
      grid-template-columns: 0.1fr 0.9fr;
      grid-template-rows: 0.95fr 0.05fr;
      height: 372px;
      width: 100%;
      .footer-logo {
        margin-top: 20px;
        margin-left: 2rem;
      }
      .footer-nav {
        margin-top: 40px;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-row-gap: 5px;
        li {
          float: left;
          margin-right: 10px;
        }
        .footer-nav__cols {
          h5 {
            font-size: 1.2rem;
            font-weight: bold;
          }
          a {
            color: hsl(210deg 8% 65%);
          }
        }
        li {
          margin-top: 12px;
        }
      }
      .footer-right {
        grid-column: span 2;
        display: grid;
        align-items: end;
        li {
          margin-top: 30px;
          float: left;
          margin-left: 1.3rem;
          color: hsl(210deg 8% 65%);
        }
        .footer-right__bottom {
          margin-left: 1.3rem;
          margin-top: 20px;
          color: hsl(210deg 8% 65%);
        }
      }
    }
  }
  @media (max-width: 640px) {
    .footer-container {
      display: grid;
      grid-template-rows: 0.8fr 0.2fr;
      height: 420px;
      width: 100%;

      .footer-logo {
        display: none;
      }
      .footer-nav {
        margin-top: 20px;
        margin-left: 1.3rem;
        display: grid;
        grid-template-rows: repeat(2, 0.5fr) repeat(2, 1fr);
        grid-column: span 2;
        grid-row-gap: 30px;
        li {
          float: left;
          margin-right: 10px;
        }
        .footer-nav__cols {
          h5 {
            font-size: 1rem;
            font-weight: bold;
            color: hsl(210deg 8% 80%);
          }
        }
      }
      .footer-right {
        display: grid;
        .footer-right__bottom {
          margin-left: 1.3rem;
          margin-bottom: 5px;
          white-space: pre-line;
        }
      }
    }
  }
`;

const Footer = () => {
  const footerLinks = [
    {
      title: 'STACK OVERFLOW',
      links: [
        { label: 'Questions', href: '/' },
        { label: 'Help', href: '/' }
      ]
    },
    {
      title: 'PRODUTS',
      links: [
        { label: 'Teams', href: '/' },
        { label: 'Advertising', href: '/' },
        { label: 'Collectives', href: '/' },
        { label: 'Talent', href: '/' }
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'About', href: '/' },
        { label: 'Press', href: '/' },
        { label: 'Work Here', href: '/' },
        { label: 'Legal', href: '/' },
        { label: 'Privacy Policy', href: '/' },
        { label: 'Terms of Service', href: '/' },
        { label: 'Contact Us', href: '/' },
        { label: 'Cookie Settings', href: '/' },
        { label: 'Cookie Policy', href: '/' }
      ]
    },
    {
      title: 'STACK EXCHANGE NETWORK',
      links: [
        { label: 'Technology', href: '/' },
        { label: 'Culture & recreation', href: '/' },
        { label: 'Life & arts', href: '/' },
        { label: 'Science', href: '/' },
        { label: 'Professional', href: '/' },
        { label: 'Business', href: '/' },
        { label: 'API', href: '/' },
        { label: 'Data', href: '/' }
      ]
    }
  ];
  return (
    <>
      <FooterStyle>
        <footer>
          <div className='footer-container'>
            <div className='footer-logo'>
              <SOiconSVG />
            </div>
            <nav className='footer-nav'>
              {footerLinks.map(({ title, links }) => (
                <div key={title} className='footer-nav__cols'>
                  <h5>{title}</h5>
                  <ul>
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <a href={href}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className='footer-right'>
              <div className='footer-right__top'>
                <ul>
                  <li>Blog</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                </ul>
              </div>
              <div className='footer-right__bottom'>
                Site design / logo © 2023 Stack Exchange Inc; user contributions
                licensed under CC BY-SA. rev 2023.2.17.43248
              </div>
            </div>
          </div>
        </footer>
      </FooterStyle>
    </>
  );
};
export default Footer;
