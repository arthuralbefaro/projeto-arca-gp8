'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatusTimeline from '@/components/ui/StatusTimeline';
import { findRequestsByQuery } from '@/lib/arca-storage';
import { formatDateBR, getStatusMeta } from '@/lib/arca-data';
import { Search, ShieldCheck } from 'lucide-react';

export default function ConsultaPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    function handleSearch(event) {
        event.preventDefault();
        setResults(findRequestsByQuery(query));
        setSearched(true);
    }

    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section">
                <div className="arca-container">
                    <div className="arca-section-heading">
            <span className="arca-eyebrow">
              <Search size={16} />
              Consulta de protocolo
            </span>

                        <h1>Acompanhe sua solicitação.</h1>

                        <p>
                            Pesquise pelo protocolo, CPF, e-mail, telefone ou nome do tutor.
                            Para teste, use o protocolo <strong>ARCA-2026-0001</strong>.
                        </p>
                    </div>

                    <form className="arca-search-card" onSubmit={handleSearch}>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Digite o protocolo, CPF, e-mail ou nome"
                        />

                        <button type="submit" className="arca-btn arca-btn-primary">
                            Consultar
                            <Search size={18} />
                        </button>
                    </form>

                    {searched && results.length === 0 && (
                        <div className="arca-empty-state">
                            <ShieldCheck size={42} />
                            <h2>Nenhuma solicitação encontrada</h2>
                            <p>
                                Confira se o protocolo ou os dados foram digitados corretamente.
                            </p>
                        </div>
                    )}

                    <div className="arca-results-list">
                        {results.map((item) => {
                            const status = getStatusMeta(item.status);

                            return (
                                <article className="arca-request-detail" key={item.id}>
                                    <div className="arca-request-header">
                                        <div>
                                            <span className="arca-kicker">Protocolo</span>
                                            <h2>{item.protocol}</h2>
                                            <p>{item.service}</p>
                                        </div>

                                        <span className={`arca-status-badge status-${item.status}`}>
                      {status.label}
                    </span>
                                    </div>

                                    <div className="arca-info-grid">
                                        <div>
                                            <span>Tutor</span>
                                            <strong>{item.tutorName}</strong>
                                        </div>

                                        <div>
                                            <span>Bairro</span>
                                            <strong>{item.bairro}</strong>
                                        </div>

                                        <div>
                                            <span>Animal</span>
                                            <strong>{item.animalName}</strong>
                                        </div>

                                        <div>
                                            <span>Espécie</span>
                                            <strong>{item.species}</strong>
                                        </div>

                                        <div>
                                            <span>Prioridade</span>
                                            <strong>{item.priorityLabel}</strong>
                                        </div>

                                        <div>
                                            <span>Data de criação</span>
                                            <strong>{formatDateBR(item.createdAt)}</strong>
                                        </div>
                                    </div>

                                    <div className="arca-next-step">
                                        <strong>Próximo passo</strong>
                                        <p>{status.description}</p>
                                    </div>

                                    <StatusTimeline currentStatus={item.status} history={item.history} />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}