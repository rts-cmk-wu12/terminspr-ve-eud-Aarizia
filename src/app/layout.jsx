import './globals.css';
import { Roboto, Racing_Sans_One, Ubuntu } from 'next/font/google';

const roboto = Roboto({
    variable: '--font-roboto',
    weight: ['400'],
    subsets: ['latin']
});

const racingSansOne = Racing_Sans_One({
    variable: '--font-racing-sans-one',
    weight: ['400'],
    subsets: ['latin']
});

const ubuntu = Ubuntu({
    variable: '--font-ubuntu',
    weight: ['400'],
    subsets: ['latin']
});

export const metadata = {
  title: {
    template: '%s | Landrup Dans',
    default: 'Landrup Dans'
  },
  description: 'En moderne danseskole'
}

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className={`${roboto.variable} ${racingSansOne.variable} ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  );
}
