'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatusTimeline from '@/components/ui/StatusTimeline';
import { solicitacoesApi, ApiError } from '@/lib/api';
import { formatDateBR, maskCPF, onlyNumbers } from '@/lib/arca-data';
import { Search, ShieldCheck } from 'lucide-react';

const ESPECIE_LABELS = {
    CACHORRO: 'Cachorro',
    GATO: 'Gato',
    AMBOS: 'Cães e gatos',
};

export default function ConsultaPage() {
    const [protocolo, setProtocolo] = useState('');
    const [cpf, setCpf] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSearch(event) {
        event.preventDefault();
        if (!protocolo.trim() || onlyNumbers(cpf).length !== 11) {
            setError('Informe protocolo e CPF para consultar.');
            return;
        }

        setLoading(true);
        setError('');
        setSearched(false);

        try {
            const data = await solicitacoesApi.consultar({
                protocolo: protocolo.trim().toUpperCase(),
                cpf: onlyNumbers(cpf),
            });
            setResults(Array.isArray(data) ? data : [data]);
            setSearched(true);
        } catch (err) {
            if (err instanceof ApiError && err.status === 404) {
                setResults([]);
                setSearched(true);
            } else {
                setError(
                    err instanceof ApiError
                        ? err.message
                        : 'Erro ao consultar. Verifique sua conexão e tente novamente.'
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section" id="conteudo-principal">
                <div className="arca-container">
                    <div className="arca-section-heading">
                        <span className="arca-eyebrow">
                            <Search size={16} />
                            Consulta de protocolo
                        </span>

                        <h1>Acompanhe sua solicitação.</h1>

                        <p>
                            Informe o protocolo e o CPF do solicitante para acompanhar o atendimento.
                        </p>
                    </div>

                    <form className="arca-search-card" onSubmit={handleSearch} aria-describedby="consulta-seguranca">
                        <label className="arca-search-field">
                            <span>Protocolo</span>
                            <input
                                value={protocolo}
                                onChange={(event) => setProtocolo(event.target.value)}
                                placeholder="ARCA-2026-000000"
                                disabled={loading}
                                autoComplete="off"
                                inputMode="text"
                            />
                        </label>

                        <label className="arca-search-field">
                            <span>CPF do solicitante</span>
                            <input
                                value={cpf}
                                onChange={(event) => setCpf(maskCPF(event.target.value))}
                                placeholder="000.000.000-00"
                                disabled={loading}
                                autoComplete="off"
                                inputMode="numeric"
                            />
                        </label>

                        <button type="submit" className="arca-btn arca-btn-primary" disabled={loading}>
                            {loading ? 'Buscando...' : 'Consultar'}
                            <Search size={18} />
                        </button>
                    </form>

                    <p className="arca-security-note" id="consulta-seguranca">
                        Por segurança, a consulta exige a combinação exata entre protocolo e CPF.
                    </p>

                    {loading && (
                        <div className="arca-results-list" aria-live="polite">
                            <div className="arca-skeleton-card" />
                        </div>
                    )}

                    {error && (
                        <div className="arca-empty-state">
                            <ShieldCheck size={42} />
                            <h2>Erro na consulta</h2>
                            <p>{error}</p>
                        </div>
                    )}

                    {searched && results.length === 0 && !error && !loading && (
                        <div className="arca-empty-state">
                            <ShieldCheck size={42} />
                            <h2>Nenhuma solicitação encontrada</h2>
                            <p>
                                Confira se o protocolo ou os dados foram digitados corretamente.
                            </p>
                        </div>
                    )}

                    <div className="arca-results-list" aria-live="polite">
                        {results.map((item) => (
                            <article className="arca-request-detail" key={item.id}>
                                <div className="arca-request-header">
                                    <div>
                                        <span className="arca-kicker">Protocolo</span>
                                        <h2>{item.protocolo}</h2>
                                        <p>{item.tipo === 'CASTRACAO' ? 'Solicitação de castração' : 'Cadastro de tutor/protetor'}</p>
                                    </div>

                                    <span className={`arca-status-badge status-${item.status?.toLowerCase()}`}>
                                        {item.statusLabel}
                                    </span>
                                </div>

                                <div className="arca-info-grid">
                                    <div>
                                        <span>Tutor</span>
                                        <strong>{item.tutorNome}</strong>
                                    </div>

                                    <div>
                                        <span>CPF</span>
                                        <strong>{item.tutorCpfMascarado}</strong>
                                    </div>

                                    <div>
                                        <span>Bairro</span>
                                        <strong>{item.tutorBairro || '-'}</strong>
                                    </div>

                                    <div>
                                        <span>Animal</span>
                                        <strong>{item.animalNome || 'Não informado'}</strong>
                                    </div>

                                    <div>
                                        <span>Espécie</span>
                                        <strong>{ESPECIE_LABELS[item.animalEspecie] || item.animalEspecie || '-'}</strong>
                                    </div>

                                    <div>
                                        <span>Prioridade</span>
                                        <strong>{item.prioridadeLabel}</strong>
                                    </div>

                                    <div>
                                        <span>Data de criação</span>
                                        <strong>{formatDateBR(item.criadoEm)}</strong>
                                    </div>
                                </div>

                                {item.statusDescricao && (
                                    <div className="arca-next-step">
                                        <strong>Próximo passo</strong>
                                        <p>{item.statusDescricao}</p>
                                    </div>
                                )}

                                {item.historico?.length > 0 && (
                                    <StatusTimeline
                                        currentStatus={item.status?.toLowerCase()}
                                        history={item.historico.map((h) => ({
                                            status: h.status?.toLowerCase(),
                                            date: h.data,
                                            note: h.nota,
                                        }))}
                                    />
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
