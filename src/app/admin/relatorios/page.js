'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import StatCard from '@/components/ui/StatCard';
import StatusTimeline from '@/components/ui/StatusTimeline';
import { adminApi, authApi, ApiError } from '@/lib/api';
import { BAIRROS_SERRA, formatDateBR } from '@/lib/arca-data';
import {
    BarChart3,
    ClipboardList,
    Filter,
    LogOut,
    PawPrint,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';

const STATUS_OPTIONS = [
    { key: 'RECEBIDO', label: 'Cadastro recebido' },
    { key: 'TRIAGEM', label: 'Em triagem' },
    { key: 'PENDENTE', label: 'Pendente' },
    { key: 'APROVADO', label: 'Aprovado' },
    { key: 'AGENDAMENTO', label: 'Agendamento' },
    { key: 'CONCLUIDO', label: 'Concluído' },
    { key: 'RECUSADO', label: 'Recusado' },
];

const TIPO_SOLICITANTE_OPTIONS = [
    { key: 'TUTOR', label: 'Tutor/responsável' },
    { key: 'CADUNICO', label: 'CadÚnico/NIS' },
    { key: 'PROTETOR', label: 'Protetor independente' },
    { key: 'ONG', label: 'ONG' },
];

export default function AdminRelatoriosPage() {
    const [auth, setAuth] = useState(null);
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState(null);
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ status: '', bairro: '', tipoSolicitante: '' });

    useEffect(() => {
        setAuth(authApi.isAuthenticated());
    }, []);

    const loadRequests = useCallback(async (currentFilters, currentPage) => {
        setLoading(true);
        try {
            const data = await adminApi.listar(currentFilters, currentPage, 20);
            setRequests(data.content ?? []);
            setTotalPages(data.totalPages ?? 0);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                setAuth(false);
            } else {
                setToast(error instanceof ApiError ? error.message : 'Erro ao carregar solicitações.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const loadStats = useCallback(async () => {
        try {
            const data = await adminApi.stats();
            setStats(data);
        } catch {
            // stats são opcionais, não bloquear UI
        }
    }, []);

    useEffect(() => {
        if (auth) {
            loadRequests(filters, page);
            loadStats();
        }
    }, [auth, filters, page, loadRequests, loadStats]);

    async function handleStatusChange(id, status) {
        try {
            const updated = await adminApi.alterarStatus(id, status, 'Status atualizado pelo painel administrativo.');
            setRequests((prev) => prev.map((item) => item.id === id ? updated : item));
            if (selected?.id === id) setSelected(updated);
            setToast('Status atualizado com sucesso.');
        } catch (error) {
            setToast(error instanceof ApiError ? error.message : 'Erro ao atualizar status.');
        }
    }

    function handleLogout() {
        authApi.logout();
        setAuth(false);
        setToast('Você saiu do painel.');
    }

    function updateFilter(key, value) {
        const next = { ...filters, [key]: value };
        setFilters(next);
        setPage(0);
    }

    const statCards = useMemo(() => {
        if (!stats) return null;
        return {
            total: stats.totalSolicitacoes ?? 0,
            triagem: stats.porStatus?.TRIAGEM ?? 0,
            aprovados: stats.porStatus?.APROVADO ?? 0,
            alta: stats.altaPrioridade ?? 0,
        };
    }, [stats]);

    if (auth === null) return null;

    if (!auth) {
        return (
            <div className="arca-page">
                <Header />
                <main className="arca-section">
                    <div className="arca-container">
                        <section className="arca-empty-state">
                            <ShieldCheck size={48} />
                            <h1>Acesso restrito</h1>
                            <p>Faça login para acessar o painel administrativo.</p>
                            <Link href="/login" className="arca-btn arca-btn-primary">
                                Ir para login
                            </Link>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="arca-page">
            <Header />
            <Toast message={toast} onClose={() => setToast('')} />

            <main className="arca-section">
                <div className="arca-container">
                    <div className="arca-admin-top">
                        <div className="arca-section-heading">
                            <span className="arca-eyebrow">
                                <BarChart3 size={16} />
                                Painel administrativo
                            </span>

                            <h1>Gestão das solicitações do Programa ARCA.</h1>

                            <p>
                                Visualize cadastros, filtre solicitações, acompanhe prioridades e
                                altere o status do atendimento.
                            </p>
                        </div>

                        <button type="button" className="arca-btn arca-btn-secondary" onClick={handleLogout}>
                            Sair
                            <LogOut size={18} />
                        </button>
                    </div>

                    {statCards && (
                        <div className="arca-grid arca-grid-4 arca-admin-stats">
                            <StatCard title="Solicitações" value={statCards.total} description="Total no sistema" icon={ClipboardList} />
                            <StatCard title="Em triagem" value={statCards.triagem} description="Aguardando análise" icon={Filter} />
                            <StatCard title="Aprovadas" value={statCards.aprovados} description="Prontas para próxima etapa" icon={UserCheck} />
                            <StatCard title="Prioridade alta" value={statCards.alta} description="Casos prioritários" icon={PawPrint} />
                        </div>
                    )}

                    <section className="arca-admin-panel">
                        <div className="arca-admin-filters">
                            <label>
                                Status
                                <select
                                    value={filters.status}
                                    onChange={(event) => updateFilter('status', event.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {STATUS_OPTIONS.map((s) => (
                                        <option value={s.key} key={s.key}>{s.label}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Bairro
                                <select
                                    value={filters.bairro}
                                    onChange={(event) => updateFilter('bairro', event.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {BAIRROS_SERRA.map((bairro) => (
                                        <option value={bairro} key={bairro}>{bairro}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Perfil
                                <select
                                    value={filters.tipoSolicitante}
                                    onChange={(event) => updateFilter('tipoSolicitante', event.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {TIPO_SOLICITANTE_OPTIONS.map((t) => (
                                        <option value={t.key} key={t.key}>{t.label}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {loading ? (
                            <div className="arca-empty-state compact">
                                <p>Carregando...</p>
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="arca-empty-state compact">
                                <ClipboardList size={40} />
                                <h2>Nenhuma solicitação encontrada</h2>
                                <p>Ajuste os filtros ou aguarde novos cadastros.</p>
                            </div>
                        ) : (
                            <>
                                <div className="arca-table-wrap">
                                    <table className="arca-admin-table">
                                        <thead>
                                            <tr>
                                                <th>Protocolo</th>
                                                <th>Tutor</th>
                                                <th>Bairro</th>
                                                <th>Serviço</th>
                                                <th>Status</th>
                                                <th>Prioridade</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.protocolo}</td>
                                                    <td>{item.tutorNome}</td>
                                                    <td>{item.tutorBairro || '-'}</td>
                                                    <td>{item.tipo === 'CASTRACAO' ? 'Castração' : 'Cadastro tutor'}</td>
                                                    <td>
                                                        <span className={`arca-status-badge status-${item.status?.toLowerCase()}`}>
                                                            {item.statusLabel}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`arca-priority priority-${item.prioridadeLabel?.toLowerCase()}`}>
                                                            {item.prioridadeLabel}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="arca-mini-btn"
                                                            onClick={() => setSelected(item)}
                                                        >
                                                            Ver detalhes
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {totalPages > 1 && (
                                    <div className="arca-pagination">
                                        <button
                                            className="arca-btn arca-btn-secondary"
                                            disabled={page === 0}
                                            onClick={() => setPage((p) => p - 1)}
                                        >
                                            Anterior
                                        </button>
                                        <span>Página {page + 1} de {totalPages}</span>
                                        <button
                                            className="arca-btn arca-btn-secondary"
                                            disabled={page >= totalPages - 1}
                                            onClick={() => setPage((p) => p + 1)}
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                    {selected && (
                        <section className="arca-detail-panel">
                            <div className="arca-request-header">
                                <div>
                                    <span className="arca-kicker">Solicitação selecionada</span>
                                    <h2>{selected.protocolo}</h2>
                                    <p>{selected.tipo === 'CASTRACAO' ? 'Solicitação de castração' : 'Cadastro de tutor'}</p>
                                </div>

                                <button type="button" className="arca-mini-btn" onClick={() => setSelected(null)}>
                                    Fechar
                                </button>
                            </div>

                            <div className="arca-info-grid">
                                <div><span>Tutor</span><strong>{selected.tutorNome}</strong></div>
                                <div><span>CPF</span><strong>{selected.tutorCpf}</strong></div>
                                <div><span>Telefone</span><strong>{selected.tutorTelefone || '-'}</strong></div>
                                <div><span>E-mail</span><strong>{selected.tutorEmail || '-'}</strong></div>
                                <div><span>Bairro</span><strong>{selected.tutorBairro || '-'}</strong></div>
                                <div><span>Endereço</span><strong>{selected.tutorEndereco || '-'}</strong></div>
                                <div><span>Animal</span><strong>{selected.animalNome || '-'}</strong></div>
                                <div><span>Espécie</span><strong>{selected.animalEspecie || '-'}</strong></div>
                                <div><span>Prioridade</span><strong>{selected.prioridadeLabel} (score {selected.prioridadeScore})</strong></div>
                                <div><span>Criado em</span><strong>{formatDateBR(selected.criadoEm)}</strong></div>
                            </div>

                            {selected.observacoes && (
                                <div className="arca-next-step">
                                    <strong>Observações</strong>
                                    <p>{selected.observacoes}</p>
                                </div>
                            )}

                            <label className="arca-status-editor">
                                Alterar status
                                <select
                                    value={selected.status}
                                    onChange={(event) => handleStatusChange(selected.id, event.target.value)}
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option value={s.key} key={s.key}>{s.label}</option>
                                    ))}
                                </select>
                            </label>

                            {selected.historico?.length > 0 && (
                                <StatusTimeline
                                    currentStatus={selected.status?.toLowerCase()}
                                    history={selected.historico.map((h) => ({
                                        status: h.status?.toLowerCase(),
                                        date: h.data,
                                        note: h.nota,
                                    }))}
                                />
                            )}
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
