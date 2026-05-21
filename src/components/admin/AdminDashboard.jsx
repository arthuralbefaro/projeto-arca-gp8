'use client';

import { useEffect, useMemo, useState } from 'react';
import { BarChart3, CheckCircle2, ClipboardList, FileWarning, PawPrint, RotateCcw } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import {
  formatDate,
  getSolicitacoes,
  resetDemoSolicitacoes,
  updateSolicitacaoStatus,
} from '@/lib/arcaStorage';
import { bairrosSerra, especiesAnimais, statusSolicitacao } from '@/lib/constants';

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [bairroFilter, setBairroFilter] = useState('');
  const [especieFilter, setEspecieFilter] = useState('');

  useEffect(() => {
    setRecords(getSolicitacoes());
  }, []);

  const stats = useMemo(() => {
    const total = records.length;
    const emTriagem = records.filter((record) => record.status === 'Em triagem').length;
    const documentosPendentes = records.filter((record) => record.status === 'Documentos pendentes').length;
    const concluidos = records.filter((record) => record.status === 'Atendimento realizado').length;
    const castracoes = records.filter((record) => record.servicoSolicitado === 'CASTRACAO').length;
    const prioritarios = records.filter((record) => record.prioridade).length;

    return {
      total,
      emTriagem,
      documentosPendentes,
      concluidos,
      castracoes,
      prioritarios,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = normalize(search);

    return records.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        normalize(record.nomeCompleto).includes(normalizedSearch) ||
        normalize(record.protocolo).includes(normalizedSearch) ||
        normalize(record.email).includes(normalizedSearch) ||
        normalize(record.bairro).includes(normalizedSearch);

      const matchesStatus = !statusFilter || record.status === statusFilter;
      const matchesBairro = !bairroFilter || record.bairro === bairroFilter;
      const matchesEspecie = !especieFilter || record.especie === especieFilter;

      return matchesSearch && matchesStatus && matchesBairro && matchesEspecie;
    });
  }, [records, search, statusFilter, bairroFilter, especieFilter]);

  function handleStatusChange(id, status) {
    const updated = updateSolicitacaoStatus(id, status);
    setRecords(updated);
  }

  function handleResetDemo() {
    setRecords(resetDemoSolicitacoes());
    setSearch('');
    setStatusFilter('');
    setBairroFilter('');
    setEspecieFilter('');
  }

  return (
    <div className="d-grid gap-4">
      <div className="row g-3">
        <div className="col-md-4 col-xl-2">
          <StatCard title="Tutores" value={stats.total} description="Cadastros totais" icon={ClipboardList} />
        </div>
        <div className="col-md-4 col-xl-2">
          <StatCard title="Castração" value={stats.castracoes} description="Solicitações" icon={PawPrint} />
        </div>
        <div className="col-md-4 col-xl-2">
          <StatCard title="Em triagem" value={stats.emTriagem} description="Em análise" icon={BarChart3} />
        </div>
        <div className="col-md-4 col-xl-2">
          <StatCard title="Pendências" value={stats.documentosPendentes} description="Documentos" icon={FileWarning} />
        </div>
        <div className="col-md-4 col-xl-2">
          <StatCard title="Prioridade" value={stats.prioritarios} description="Critérios sociais" icon={CheckCircle2} />
        </div>
        <div className="col-md-4 col-xl-2">
          <StatCard title="Concluídos" value={stats.concluidos} description="Atendimentos" icon={CheckCircle2} />
        </div>
      </div>

      <div className="arca-card">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Solicitações cadastradas</h2>
            <p className="text-muted mb-0">
              Dados salvos no navegador via localStorage. Ideal para protótipo e apresentação no GitHub Pages.
            </p>
          </div>
          <button type="button" className="arca-secondary-btn" onClick={handleResetDemo}>
            <RotateCcw size={17} />
            Restaurar demo
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-lg-4">
            <label className="form-label" htmlFor="admin-search">
              Buscar
            </label>
            <input
              id="admin-search"
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nome, protocolo, e-mail ou bairro"
            />
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="admin-status">
              Status
            </label>
            <select
              id="admin-status"
              className="form-select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">Todos os status</option>
              {statusSolicitacao.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3">
            <label className="form-label" htmlFor="admin-bairro">
              Bairro
            </label>
            <select
              id="admin-bairro"
              className="form-select"
              value={bairroFilter}
              onChange={(event) => setBairroFilter(event.target.value)}
            >
              <option value="">Todos os bairros</option>
              {bairrosSerra.map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-2">
            <label className="form-label" htmlFor="admin-especie">
              Espécie
            </label>
            <select
              id="admin-especie"
              className="form-select"
              value={especieFilter}
              onChange={(event) => setEspecieFilter(event.target.value)}
            >
              <option value="">Todas</option>
              {especiesAnimais.map((especie) => (
                <option key={especie.value} value={especie.value}>
                  {especie.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Protocolo</th>
                <th>Tutor</th>
                <th>Bairro</th>
                <th>Serviço</th>
                <th>Animal</th>
                <th>Status</th>
                <th>Alterar status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="fw-bold">{record.protocolo}</td>
                  <td>
                    <strong className="d-block">{record.nomeCompleto}</strong>
                    <span className="text-muted small">{record.email}</span>
                  </td>
                  <td>{record.bairro || '-'}</td>
                  <td>{record.servicoLabel || '-'}</td>
                  <td>
                    {record.quantidadeAnimais || '1'} · {record.especieLabel || record.especie || '-'}
                  </td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td style={{ minWidth: 210 }}>
                    <select
                      className="form-select"
                      value={record.status}
                      onChange={(event) => handleStatusChange(record.id, event.target.value)}
                    >
                      {statusSolicitacao.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{formatDate(record.criadoEm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center p-4 border rounded-4 bg-light">
            <strong>Nenhuma solicitação encontrada.</strong>
            <p className="text-muted mb-0">Ajuste os filtros ou cadastre uma nova solicitação.</p>
          </div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="arca-card h-100">
            <h3 className="fw-bold h5">Demanda por bairro</h3>
            <div className="d-grid gap-2 mt-3">
              {bairrosSerra
                .map((bairro) => ({
                  bairro,
                  total: records.filter((record) => record.bairro === bairro).length,
                }))
                .filter((item) => item.total > 0)
                .map((item) => (
                  <div key={item.bairro} className="arca-demand-item">
                    <span>{item.bairro}</span>
                    <strong>{item.total}</strong>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="arca-card h-100">
            <h3 className="fw-bold h5">Demanda por espécie</h3>
            <div className="d-grid gap-2 mt-3">
              {especiesAnimais.map((especie) => (
                <div key={especie.value} className="arca-demand-item">
                  <span>{especie.label}</span>
                  <strong>{records.filter((record) => record.especie === especie.value).length}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
