import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section" id="conteudo-principal">
                <div className="arca-container">
                    <section className="arca-empty-state">
                        <h1>Página não encontrada</h1>

                        <p>
                            O endereço acessado não existe ou foi movido. Você pode voltar ao
                            início ou consultar uma solicitação.
                        </p>

                        <div className="arca-success-actions">
                            <Link href="/" className="arca-btn arca-btn-primary">
                                Voltar para início
                                <Home size={18} />
                            </Link>

                            <Link href="/consulta" className="arca-btn arca-btn-secondary">
                                Consultar protocolo
                                <Search size={18} />
                            </Link>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
