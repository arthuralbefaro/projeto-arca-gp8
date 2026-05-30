import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="arca-page">
            <Header />
            <main className="arca-section" id="conteudo-principal">
                <div className="arca-container">
                    <section className="arca-empty-state">
                        <ShieldCheck size={48} />
                        <h1>Painel administrativo</h1>
                        <p>Área restrita aos operadores autorizados do Programa ARCA.</p>
                        <Link href="/admin/relatorios" className="arca-btn arca-btn-primary">
                            Acessar painel
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
