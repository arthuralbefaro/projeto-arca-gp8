'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import StatCard from '@/components/ui/StatCard';
import StatusTimeline from '@/components/ui/StatusTimeline';
import {
    clearRequests,
    getRequests,
    isAdminAuthenticated,
    logoutAdmin,
    seedDemoRequests,
    updateRequestStatus,
} from '@/lib/arca-storage';
import {
    BAIRROS_SERRA,
    formatDateBR,
    getStatusMeta,
    STATUS_OPTIONS,
} from '@/lib/arca-data';
import {
    BarChart3,
    ClipboardList,
    Database,
    Filter,
    LogOut,
    PawPrint,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';

export default function AdminRelatoriosPage() {
    const [auth, setAuth] = useState(false);
    const [requests, setRequests] = useState([]);
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        bairro: '',
        species: '',
    });

    useEffect(() => {
        const authenticated = isAdminAuthenticated();
        setAuth(authenticated);

        if (authenticated) {
            setRequests(getRequests());
        }
    }, []);

    const filteredRequests = useMemo(() => {
        return requests.filter((item) => {
            const statusMatch = filters.status ? item.status === filters.status : true;
            const bairroMatch = filters.bairro ? item.bairro === filters.bairro : true;
            const speciesMatch = filters.species ? item.species === filters.species : true;

            return statusMatch && bairroMatch && speciesMatch;
        });
    }, [requests, filters]);

    const stats = useMemo(() => {
        const total = requests.length;
        const triagem = requests.filter((item) => item.status === 'triagem').length;
        const aprovados = requests.filter((item) => item.status === 'aprovado').length;
        const alta = requests.filter((item) => item.priorityLabel === 'Alta').length;

        return {
            total,
            triagem,
            aprovados,
            alta,
        };
    }, [requests]);

    function refresh() {
        setRequests(getRequests());
    }

    function handleSeed() {
        const updated = seedDemoRequests();
        setRequests(updated);
        setToast('Dados de demonstração carregados.');
    }

    function handleClear() {
        clearRequests();
        setRequests([]);
        setSelected(null);
        setToast('Dados apagados do navegador.');
    }

    function handleStatusChange(id, status) {
        const updated = updateRequestStatus(id, status);
        setRequests(updated);
        setSelected(updated.find((item) => item.id === id) || null);
        setToast('Status atualizado com sucesso.');
    }

    function handleLogout() {
        logoutAdmin();
        setAuth(false);
        setToast('Você saiu do painel.');
    }

    if (!auth) {
        return (
            <div className="arca-page">
                <Header />

                <main className="arca-section">
                    <div className="arca-container">
                        <section className="arca-empty-state">
                            <ShieldCheck size={48} />
                            <h1>Acesso restrito</h1>
                            <p>Faça login para acessar o painel administrativo demonstrativo.</p>

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
                Painel administrativo demo
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

                    <div className="arca-grid arca-grid-4 arca-admin-stats">
                        <StatCard
                            title="Solicitações"
                            value={stats.total}
                            description="Total salvo no navegador"
                            icon={ClipboardList}
                        />

                        <StatCard
                            title="Em triagem"
                            value={stats.triagem}
                            description="Aguardando análise"
                            icon={Filter}
                        />

                        <StatCard
                            title="Aprovadas"
                            value={stats.aprovados}
                            description="Prontas para próxima etapa"
                            icon={UserCheck}
                        />

                        <StatCard
                            title="Prioridade alta"
                            value={stats.alta}
                            description="Casos com maior pontuação"
                            icon={PawPrint}
                        />
                    </div>

                    <section className="arca-admin-actions">
                        <button type="button" className="arca-btn arca-btn-primary" onClick={handleSeed}>
                            Carregar dados demo
                            <Database size={18} />
                        </button>

                        <button type="button" className="arca-btn arca-btn-secondary" onClick={refresh}>
                            Atualizar lista
                        </button>

                        <button type="button" className="arca-btn arca-btn-secondary" onClick={handleClear}>
                            Limpar dados
                        </button>
                    </section>

                    <section className="arca-admin-panel">
                        <div className="arca-admin-filters">
                            <label>
                                Status
                                <select
                                    value={filters.status}
                                    onChange={(event) =>
                                        setFilters((current) => ({ ...current, status: event.target.value }))
                                    }
                                >
                                    <option value="">Todos</option>
                                    {STATUS_OPTIONS.map((status) => (
                                        <option value={status.key} key={status.key}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Bairro
                                <select
                                    value={filters.bairro}
                                    onChange={(event) =>
                                        setFilters((current) => ({ ...current, bairro: event.target.value }))
                                    }
                                >
                                    <option value="">Todos</option>
                                    {BAIRROS_SERRA.map((bairro) => (
                                        <option value={bairro} key={bairro}>
                                            {bairro}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Espécie
                                <select
                                    value={filters.species}
                                    onChange={(event) =>
                                        setFilters((current) => ({ ...current, species: event.target.value }))
                                    }
                                >
                                    <option value="">Todas</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Cães e gatos">Cães e gatos</option>
                                    <option value="Não informado">Não informado</option>
                                </select>
                            </label>
                        </div>

                        {filteredRequests.length === 0 ? (
                            <div className="arca-empty-state compact">
                                <ClipboardList size={40} />
                                <h2>Nenhuma solicitação encontrada</h2>
                                <p>Carregue dados demo ou envie uma solicitação pelo formulário.</p>
                            </div>
                        ) : (
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
                                    {filteredRequests.map((item) => {
                                        const status = getStatusMeta(item.status);

                                        return (
                                            <tr key={item.id}>
                                                <td>{item.protocol}</td>
                                                <td>{item.tutorName}</td>
                                                <td>{item.bairro}</td>
                                                <td>{item.service}</td>
                                                <td>
                            <span className={`arca-status-badge status-${item.status}`}>
                              {status.label}
                            </span>
                                                </td>
                                                <td>
                            <span className={`arca-priority priority-${item.priorityLabel?.toLowerCase()}`}>
                              {item.priorityLabel}
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
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    {selected && (
                        <section className="arca-detail-panel">
                            <div className="arca-request-header">
                                <div>
                                    <span className="arca-kicker">Solicitação selecionada</span>
                                    <h2>{selected.protocol}</h2>
                                    <p>{selected.service}</p>
                                </div>

                                <button
                                    type="button"
                                    className="arca-mini-btn"
                                    onClick={() => setSelected(null)}
                                >
                                    Fechar
                                </button>
                            </div>

                            <div className="arca-info-grid">
                                <div>
                                    <span>Tutor</span>
                                    <strong>{selected.tutorName}</strong>
                                </div>

                                <div>
                                    <span>CPF</span>
                                    <strong>{selected.cpf}</strong>
                                </div>

                                <div>
                                    <span>Telefone</span>
                                    <strong>{selected.phone}</strong>
                                </div>

                                <div>
                                    <span>Bairro</span>
                                    <strong>{selected.bairro}</strong>
                                </div>

                                <div>
                                    <span>Animal</span>
                                    <strong>{selected.animalName}</strong>
                                </div>

                                <div>
                                    <span>Espécie</span>
                                    <strong>{selected.species}</strong>
                                </div>

                                <div>
                                    <span>Prioridade</span>
                                    <strong>{selected.priorityLabel}</strong>
                                </div>

                                <div>
                                    <span>Criado em</span>
                                    <strong>{formatDateBR(selected.createdAt)}</strong>
                                </div>
                            </div>

                            <label className="arca-status-editor">
                                Alterar status
                                <select
                                    value={selected.status}
                                    onChange={(event) => handleStatusChange(selected.id, event.target.value)}
                                >
                                    {STATUS_OPTIONS.map((status) => (
                                        <option value={status.key} key={status.key}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {selected.notes && (
                                <div className="arca-next-step">
                                    <strong>Observações</strong>
                                    <p>{selected.notes}</p>
                                </div>
                            )}

                            <StatusTimeline currentStatus={selected.status} history={selected.history} />
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}