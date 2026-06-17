import './globals.css';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Header from '../components/Header';
import Preloader from '../components/Preloader';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

// Outfit remplace Inter (Inter est banni — trop générique)
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'TerrangaFood — La cuisine dakaroise, livrée chez vous',
  description: 'Découvrez les meilleurs restaurants de Dakar et commandez vos plats préférés en quelques minutes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${outfit.variable}`}>
      <body>
        <Preloader />
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            <div className="site-footer__brand">
              <span className="site-footer__logo">TerrangaFood</span>
              <p>La meilleure cuisine dakaroise livrée à votre porte.</p>
            </div>
            <div className="site-footer__links">
              <a href="/">Restaurants</a>
              <a href="/mes-commandes">Mes commandes</a>
            </div>
            <div className="site-footer__copy">
              <p>© {new Date().getFullYear()} TerrangaFood. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
