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
    ChevronRight,
    Contrast,
    Circle,
    PawPrint,
} from 'lucide-react';

export default function Header() {
    return (
        <header className="pm-header">
            <div className="pm-header-main">
                <div className="arca-container">
                    <div className="pm-header-top">
                        <Link href="/" className="pm-logo">
                            <div className="pm-logo-symbol">
                                <PawPrint size={28} />
                            </div>

                            <div className="pm-logo-text">
                                <span>Prefeitura da</span>
                                <strong>Serra</strong>
                            </div>
                        </Link>
                    </div>

                    <div className="pm-header-nav">
                        <button className="pm-search-button" type="button" aria-label="Pesquisar">
                            <Search size={22} />
                        </button>

                        <nav className="pm-main-links">
                            <Link href="#">Transparência</Link>
                            <Link href="#">Portal de Atendimentos</Link>
                            <Link href="#">Legislação</Link>
                            <Link href="#">Notícias</Link>
                            <Link href="#">Carta de Serviços</Link>
                            <Link href="#">Acessibilidade</Link>
                        </nav>
                    </div>

                    <div className="pm-accessibility">
                        <button type="button">A-</button>
                        <button type="button">A</button>
                        <button type="button">A+</button>

                        <button type="button" aria-label="Contraste">
                            <Contrast size={18} />
                        </button>

                        <button type="button" aria-label="Modo visual">
                            <Circle size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="pm-category-bar">
                <div className="arca-container">
                    <nav className="pm-category-nav">
                        <button className="pm-menu-button" type="button" aria-label="Abrir menu">
                            <Menu size={22} />
                        </button>

                        <Link href="#" className="pm-category-link">
                            <Building2 size={20} />
                            <span>Secretarias</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <Users size={20} />
                            <span>Cidadão</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <Landmark size={20} />
                            <span>Empreendedor</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <Building2 size={20} />
                            <span>Prefeitura</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <UserRound size={20} />
                            <span>Servidor</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="#" className="pm-category-link">
                            <BookOpen size={20} />
                            <span>Turista</span>
                            <ChevronRight size={17} />
                        </Link>

                        <Link href="/registro" className="pm-category-link pm-category-highlight">
                            <Files size={20} />
                            <span>Serviços digitais</span>
                            <ChevronRight size={17} />
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}