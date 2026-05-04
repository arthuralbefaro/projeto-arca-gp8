import Link from 'next/link';
import {
    Search,
    Menu,
    Users,
    Landmark,
    Building2,
    UserRound,
    BookOpen,
    Files,
    PawPrint,
} from 'lucide-react';

export default function Header() {
    return (
        <header className="pm-header">
            <div className="pm-header-main">
                <div className="arca-container pm-header-content">
                    <Link href="/" className="pm-logo">
                        <div className="pm-logo-symbol">
                            <PawPrint size={22} />
                        </div>

                        <div className="pm-logo-text">
                            <span>Prefeitura da</span>
                            <strong>Serra</strong>
                        </div>
                    </Link>

                    <nav className="pm-main-links">
                        <Link href="#">Transparência</Link>
                        <Link href="#">Atendimentos</Link>
                        <Link href="#">Notícias</Link>
                        <Link href="#">Serviços</Link>
                        <Link href="#">Acessibilidade</Link>
                    </nav>

                    <div className="pm-header-actions">
                        <button type="button" aria-label="Pesquisar">
                            <Search size={19} />
                        </button>

                        <button type="button" aria-label="Menu">
                            <Menu size={21} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="pm-category-bar">
                <div className="arca-container">
                    <nav className="pm-category-nav">
                        <Link href="#" className="pm-category-link">
                            <Building2 size={18} />
                            Secretarias
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <Users size={18} />
                            Cidadão
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <Landmark size={18} />
                            Empreendedor
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <UserRound size={18} />
                            Servidor
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <BookOpen size={18} />
                            Turista
                        </Link>

                        <Link href="/registro" className="pm-category-link pm-category-highlight">
                            <Files size={18} />
                            Programa ARCA
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
