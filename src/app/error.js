'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RefreshCcw, ShieldAlert } from 'lucide-react';

export default function Error({ reset }) {
    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section" id="conteudo-principal">
                <div className="arca-container">
                    <section className="arca-empty-state">
                        <ShieldAlert size={48} />
                        <h1>Não foi possível carregar esta área</h1>
                        <p>
                            O serviço encontrou uma instabilidade momentânea. Tente novamente em alguns instantes.
                        </p>

                        <button type="button" className="arca-btn arca-btn-primary" onClick={reset}>
                            Tentar novamente
                            <RefreshCcw size={18} />
                        </button>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
