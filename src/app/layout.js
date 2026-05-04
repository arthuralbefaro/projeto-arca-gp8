import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Programa ARCA | Prefeitura da Serra',
  description: 'Página institucional e cadastro de tutores do Programa ARCA.',
};

export default function RootLayout({ children }) {
  return (
      <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
      </html>
  );
}
