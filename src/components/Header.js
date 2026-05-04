import Link from 'next/link';

export default function Header() {
    return (
        <header className="arca-header py-3">
            <div className="arca-container d-flex justify-content-between align-items-center px-3">
                <Link href="/" className="text-white text-decoration-none fw-bold">
                    Programa ARCA
                </Link>

                <nav className="d-flex gap-3">
                    <Link href="/animais" className="text-white text-decoration-none">Adoção</Link>
                    <Link href="/castracao" className="text-white text-decoration-none">Castração</Link>
                    <Link href="/denuncia" className="text-white text-decoration-none">Denúncia</Link>
                    <Link href="/relatorios" className="text-white text-decoration-none">Relatórios</Link>
                    <Link href="/login" className="text-white text-decoration-none">Login</Link>
                </nav>
            </div>
        </header>
    );
}