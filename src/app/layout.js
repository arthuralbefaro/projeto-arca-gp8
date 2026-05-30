import './globals.css';
import { assetPath } from '@/lib/assets';

export const metadata = {
    metadataBase: new URL('http://localhost:3000'),
    title: {
        default: 'Programa ARCA | Prefeitura Municipal da Serra',
        template: '%s | Programa ARCA',
    },
    description:
        'Plataforma institucional da Prefeitura da Serra para cadastro, triagem e acompanhamento de solicitações do Programa ARCA.',
    applicationName: 'Programa ARCA',
    authors: [{ name: 'Prefeitura Municipal da Serra' }],
    keywords: ['ARCA', 'Prefeitura da Serra', 'atendimento animal', 'castração', 'serviço público'],
    icons: {
        icon: assetPath('/logo-serra.jpg'),
        apple: assetPath('/logo-serra.jpg'),
    },
    openGraph: {
        title: 'Programa ARCA | Prefeitura Municipal da Serra',
        description:
            'Cadastro, triagem e acompanhamento de solicitações do Programa ARCA.',
        locale: 'pt_BR',
        type: 'website',
        siteName: 'Programa ARCA',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0a3478',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" data-scroll-behavior="smooth">
        <body>{children}</body>
        </html>
    );
}
