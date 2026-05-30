import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section" id="conteudo-principal" aria-busy="true">
                <div className="arca-container">
                    <section className="arca-loading-shell" aria-label="Carregando conteúdo">
                        <div className="arca-skeleton-line arca-skeleton-title" />
                        <div className="arca-skeleton-line" />
                        <div className="arca-skeleton-line short" />

                        <div className="arca-grid arca-grid-3">
                            <div className="arca-skeleton-card" />
                            <div className="arca-skeleton-card" />
                            <div className="arca-skeleton-card" />
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
