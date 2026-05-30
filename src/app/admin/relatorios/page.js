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
    Activity,
    BarChart3,
    ClipboardList,
    Filter,
    LogOut,
    PawPrint,
    RefreshCcw,
    ShieldCheck,
    SlidersHorizontal,
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

const TIPO_LABELS = {
    CADASTRO_TUTOR: 'Cadastro de tutor',
    CASTRACAO: 'Castração',
};

function toChartData(source = {}, labels = {}) {
    return Object.entries(source)
        .map(([key, value]) => ({
            key,
            label: labels[key] || STATUS_OPTIONS.find((item) => item.key === key)?.label || key,
            value: Number(value || 0),
        }))
        .filter((item) => item.value > 0);
}

function BarList({ data, emptyLabel = 'Sem dados no período' }) {
    const max = Math.max(...data.map((item) => item.value), 0);

    if (!data.length) {
        return (
            <div className="arca-inline-empty">
                <p>{emptyLabel}</p>
            </div>
        );
    }

    return (
        <div className="arca-bar-list">
            {data.map((item) => {
                const width = max > 0 ? Math.max((item.value / max) * 100, 3) : 3;

                return (
                    <div className="arca-bar-row" key={item.key}>
                        <div className="arca-bar-meta">
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                        </div>

                        <div
                            className="arca-bar-track"
                            role="progressbar"
                            aria-label={`${item.label}: ${item.value}`}
                            aria-valuenow={item.value}
                            aria-valuemin={0}
                            aria-valuemax={max}
                        >
                            <div className="arca-bar-fill" style={{ width: `${width}%` }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="arca-admin-shell" aria-label="Carregando painel">
            <h1 className="arca-loading-title">Carregando painel administrativo</h1>
            <div className="arca-skeleton-card" />
            <div className="arca-grid arca-grid-4">
                <div className="arca-skeleton-card" />
                <div className="arca-skeleton-card" />
                <div className="arca-skeleton-card" />
                <div className="arca-skeleton-card" />
            </div>
            <div className="arca-skeleton-card" />
        </div>
    );
}

export default function AdminRelatoriosPage() {
    const [auth, setAuth] = useState(null);
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState(null);
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [filters, setFilters] = useState({ status: '', bairro: '', tipoSolicitante: '' });

    useEffect(() => {
        let active = true;

        authApi.me()
            .then(() => {
                if (active) setAuth(true);
            })
            .catch(() => {
                if (active) setAuth(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const loadRequests = useCallback(async (currentFilters, currentPage, currentSize) => {
        setLoading(true);
        try {
            const data = await adminApi.listar(currentFilters, currentPage, currentSize);
            setRequests(data.content ?? []);
            setTotalPages(data.totalPages ?? 0);
            setTotalElements(data.totalElements ?? 0);
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
            setToast('Não foi possível carregar os indicadores do painel.');
        }
    }, []);

    useEffect(() => {
        if (!auth) return undefined;

        let active = true;

        async function load() {
            await Promise.all([
                loadRequests(filters, page, pageSize),
                loadStats(),
            ]);
        }

        load().catch(() => {
            if (active) setToast('Não foi possível atualizar o painel.');
        });

        return () => {
            active = false;
        };
    }, [auth, filters, page, pageSize, loadRequests, loadStats]);

    async function handleStatusChange(id, status) {
        try {
            const updated = await adminApi.alterarStatus(id, status, 'Status atualizado pelo painel administrativo.');
            setRequests((prev) => prev.map((item) => item.id === id ? updated : item));
            if (selected?.id === id) setSelected(updated);
            setToast('Status atualizado com sucesso.');
            await loadStats();
        } catch (error) {
            setToast(error instanceof ApiError ? error.message : 'Erro ao atualizar status.');
        }
    }

    async function handleLogout() {
        try {
            await authApi.logout();
        } finally {
            setAuth(false);
            setToast('Você saiu do painel.');
        }
    }

    function updateFilter(key, value) {
        setFilters((current) => ({ ...current, [key]: value }));
        setPage(0);
    }

    function clearFilters() {
        setFilters({ status: '', bairro: '', tipoSolicitante: '' });
        setPage(0);
    }

    function updatePageSize(value) {
        setPageSize(Number(value));
        setPage(0);
    }

    const statCards = useMemo(() => {
        if (!stats) return null;

        return {
            total: stats.totalSolicitacoes ?? 0,
            ativas: stats.solicitacoesAtivas ?? 0,
            aprovadas: stats.porStatus?.APROVADO ?? 0,
            alta: stats.altaPrioridade ?? 0,
        };
    }, [stats]);

    const chartData = useMemo(() => {
        const perfilLabels = Object.fromEntries(TIPO_SOLICITANTE_OPTIONS.map((item) => [item.key, item.label]));

        return {
            status: toChartData(stats?.porStatus, {}),
            tipo: toChartData(stats?.porTipo, TIPO_LABELS),
            perfil: toChartData(stats?.porTipoSolicitante, perfilLabels),
        };
    }, [stats]);

    const operationalItems = useMemo(() => {
        const total = stats?.totalSolicitacoes ?? 0;
        const concluidas = stats?.porStatus?.CONCLUIDO ?? 0;
        const recusadas = stats?.porStatus?.RECUSADO ?? 0;
        const ativas = stats?.solicitacoesAtivas ?? 0;
        const resolvidas = concluidas + recusadas;
        const resolutionRate = total > 0 ? Math.round((resolvidas / total) * 100) : 0;

        return [
            { label: 'Solicitações ativas', value: ativas },
            { label: 'Finalizadas', value: resolvidas },
            { label: 'Taxa de fechamento', value: `${resolutionRate}%` },
            { label: 'Registros nesta página', value: requests.length },
        ];
    }, [requests.length, stats]);

    if (auth === null) {
        return (
            <div className="arca-page">
                <Header />
                <main className="arca-section" id="conteudo-principal">
                    <div className="arca-container">
                        <DashboardSkeleton />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!auth) {
        return (
            <div className="arca-page">
                <Header />
                <main className="arca-section" id="conteudo-principal">
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

            <main className="arca-section" id="conteudo-principal">
                <div className="arca-container arca-admin-shell">
                    <section className="arca-admin-hero" aria-labelledby="admin-dashboard-title">
                        <div>
                            <span className="arca-eyebrow">
                                <BarChart3 size={16} />
                                Painel administrativo
                            </span>

                            <h1 id="admin-dashboard-title">Operação institucional do Programa ARCA.</h1>

                            <p>
                                Indicadores, triagem, acompanhamento de prioridades e gestão segura
                                das solicitações recebidas pela Prefeitura da Serra.
                            </p>

                            <div className="arca-admin-metadata" aria-label="Sinais operacionais">
                                <span className="arca-chip">Sessão segura</span>
                                <span className="arca-chip">Cookies HttpOnly</span>
                                <span className="arca-chip">Auditoria ativa</span>
                            </div>
                        </div>

                        <div className="arca-admin-hero-actions">
                                <button
                                    type="button"
                                    className="arca-btn arca-btn-secondary"
                                    disabled={loading}
                                    onClick={() => {
                                        loadRequests(filters, page, pageSize);
                                        loadStats();
                                }}
                            >
                                Atualizar
                                <RefreshCcw size={18} />
                            </button>

                            <button type="button" className="arca-btn arca-btn-secondary" onClick={handleLogout}>
                                Sair
                                <LogOut size={18} />
                            </button>
                        </div>
                    </section>

                    {statCards ? (
                        <div className="arca-grid arca-grid-4 arca-admin-stats">
                            <StatCard title="Solicitações" value={statCards.total} description="Total no sistema" icon={ClipboardList} />
                            <StatCard title="Ativas" value={statCards.ativas} description="Em acompanhamento" icon={Activity} />
                            <StatCard title="Aprovadas" value={statCards.aprovadas} description="Prontas para próxima etapa" icon={UserCheck} />
                            <StatCard title="Prioridade alta" value={statCards.alta} description="Casos prioritários" icon={PawPrint} />
                        </div>
                    ) : (
                        <div className="arca-grid arca-grid-4">
                            <div className="arca-skeleton-card" />
                            <div className="arca-skeleton-card" />
                            <div className="arca-skeleton-card" />
                            <div className="arca-skeleton-card" />
                        </div>
                    )}

                    <div className="arca-admin-grid">
                        <section className="arca-analytics-grid" aria-label="Indicadores do painel">
                            <div className="arca-chart-panel">
                                <h2>Distribuição por status</h2>
                                <p>Leitura operacional da fila de atendimento.</p>
                                <BarList data={chartData.status} />
                            </div>

                            <div className="arca-chart-panel">
                                <h2>Solicitações por serviço</h2>
                                <p>Volume por tipo de atendimento registrado.</p>
                                <BarList data={chartData.tipo} />
                            </div>
                        </section>

                        <aside className="arca-ops-panel" aria-label="Resumo operacional">
                            <h2>Resumo de operação</h2>
                            <p>Indicadores simples para acompanhamento diário da equipe.</p>

                            <div className="arca-ops-list">
                                {operationalItems.map((item) => (
                                    <div className="arca-ops-item" key={item.label}>
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>

                            <div className="arca-bar-list">
                                <div className="arca-bar-row">
                                    <div className="arca-bar-meta">
                                        <span>Perfil dos solicitantes</span>
                                    </div>
                                </div>
                                <BarList data={chartData.perfil} />
                            </div>
                        </aside>
                    </div>

                    <section className="arca-admin-panel" aria-busy={loading} aria-labelledby="admin-table-title">
                        <div className="arca-admin-panel-header">
                            <div>
                                <span className="arca-eyebrow">
                                    <SlidersHorizontal size={16} />
                                    Gestão da fila
                                </span>
                                <h2 id="admin-table-title">Solicitações recebidas</h2>
                                <p>{totalElements} registros encontrados com os filtros atuais.</p>
                            </div>

                            <div className="arca-admin-actions">
                                <button type="button" className="arca-btn arca-btn-secondary" onClick={clearFilters}>
                                    Limpar filtros
                                </button>
                            </div>
                        </div>

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

                            <label>
                                Itens por página
                                <select
                                    value={pageSize}
                                    onChange={(event) => updatePageSize(event.target.value)}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </label>
                        </div>

                        {loading ? (
                            <div className="arca-grid arca-grid-3">
                                <div className="arca-skeleton-card" />
                                <div className="arca-skeleton-card" />
                                <div className="arca-skeleton-card" />
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="arca-empty-state compact">
                                <ClipboardList size={40} />
                                <h2>Nenhuma solicitação encontrada</h2>
                                <p>Ajuste os filtros ou aguarde novos cadastros.</p>
                            </div>
                        ) : (
                            <>
                                <div className="arca-table-wrap" tabIndex="0" aria-label="Tabela de solicitações com rolagem horizontal">
                                    <table className="arca-admin-table">
                                        <caption>Solicitações recebidas pelo Programa ARCA</caption>
                                        <thead>
                                            <tr>
                                                <th>Protocolo</th>
                                                <th>Tutor</th>
                                                <th>Bairro</th>
                                                <th>Serviço</th>
                                                <th>Status</th>
                                                <th>Prioridade</th>
                                                <th>Criado em</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <span className="arca-table-primary">{item.protocolo}</span>
                                                    </td>
                                                    <td>
                                                        <span className="arca-table-primary">{item.tutorNome}</span>
                                                        <span className="arca-table-secondary">{item.tutorTelefone || 'Sem telefone'}</span>
                                                    </td>
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
                                                    <td>{formatDateBR(item.criadoEm)}</td>
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
