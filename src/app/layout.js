import './globals.css';

export const metadata = {
    title: 'Programa ARCA | Atendimento Animal Digital',
    description:
        'Sistema de cadastro, triagem e acompanhamento de solicitações do Programa ARCA.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
        <body>{children}</body>
        </html>
    );
}