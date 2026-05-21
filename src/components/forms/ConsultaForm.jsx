'use client';

import { useState } from 'react';
import Link from 'next/link';
import AlertBox from '@/components/ui/AlertBox';
import FormInput from '@/components/ui/FormInput';
import StatusBadge from '@/components/ui/StatusBadge';
import { findSolicitacao, formatDate, getStatusNextStep } from '@/lib/arcaStorage';
import { statusSolicitacao } from '@/lib/constants';

export default function ConsultaForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError('Informe CPF, e-mail ou número de protocolo para consultar.');
      setResult(null);
      return;
    }

    const record = findSolicitacao(searchTerm);

    if (!record) {
      setError('Nenhuma solicitação encontrada com os dados informados.');
      setResult(null);
      return;
    }

    setError('');
    setResult(record);
  }

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <form className="arca-card" onSubmit={handleSubmit}>
          <h2 className="fw-bold mb-2">Consultar solicitação</h2>
          <p className="text-muted mb-4">
            Busque pelo protocolo gerado no cadastro, CPF do tutor ou e-mail informado.
          </p>

          {error && (
            <div className="mb-4">
              <AlertBox type="warning" title="Não encontramos o cadastro">
                {error}
              </AlertBox>
            </div>
          )}

          <FormInput
            label="CPF, e-mail ou protocolo"
            name="consulta"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Ex.: ARCA-2026-0001"
            required
          />

          <button className="arca-primary-btn w-100 justify-content-center" type="submit">
            Consultar cadastro
          </button>

          <div className="mt-4 p-3 rounded-4" style={{ background: '#f8fafc' }}>
            <strong className="d-block mb-1">Protocolo de demonstração</strong>
            <span className="text-muted small">Use ARCA-2026-0001 para testar a consulta sem cadastrar um novo tutor.</span>
          </div>
        </form>
      </div>

      <div className="col-lg-7">
        {result ? (
          <div className="arca-result-card">
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
              <div>
                <span className="text-muted small fw-bold text-uppercase">Protocolo</span>
                <h2 className="fw-bold mb-1">{result.protocolo}</h2>
                <p className="text-muted mb-0">Cadastro realizado em {formatDate(result.criadoEm)}</p>
              </div>
              <StatusBadge status={result.status} />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="p-3 rounded-4 border h-100">
                  <span className="text-muted small fw-bold">Tutor</span>
                  <p className="mb-0 fw-bold">{result.nomeCompleto}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded-4 border h-100">
                  <span className="text-muted small fw-bold">Bairro</span>
                  <p className="mb-0 fw-bold">{result.bairro || '-'}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded-4 border h-100">
                  <span className="text-muted small fw-bold">Serviço</span>
                  <p className="mb-0 fw-bold">{result.servicoLabel || '-'}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded-4 border h-100">
                  <span className="text-muted small fw-bold">Animal</span>
                  <p className="mb-0 fw-bold">
                    {result.quantidadeAnimais || '1'} · {result.especieLabel || result.especie || '-'}
                  </p>
                </div>
              </div>
            </div>

            <AlertBox type="info" title="Próxima etapa">
              {getStatusNextStep(result.status)}
            </AlertBox>

            <div className="mt-4">
              <h3 className="fw-bold h5 mb-3">Linha do tempo da solicitação</h3>
              <div className="d-grid gap-2">
                {statusSolicitacao.map((status, index) => {
                  const currentIndex = statusSolicitacao.indexOf(result.status);
                  const isDone = index <= currentIndex;

                  return (
                    <div
                      key={status}
                      className="d-flex align-items-center gap-3 p-3 rounded-4 border"
                      style={{ background: isDone ? '#f0fdf4' : '#f8fafc' }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold"
                        style={{
                          width: 34,
                          height: 34,
                          background: isDone ? 'var(--arca-green)' : '#e5e7eb',
                          color: isDone ? '#0e2a18' : '#64748b',
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className={isDone ? 'fw-bold' : 'text-muted'}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="arca-card h-100 d-flex flex-column justify-content-center text-center">
            <h2 className="fw-bold">Acompanhe seu atendimento</h2>
            <p className="text-muted mb-4">
              Após preencher o cadastro, o sistema gera um protocolo para acompanhar a triagem, pendências e possível agendamento.
            </p>
            <div>
              <Link className="arca-secondary-btn" href="/registro">
                Ainda não tenho cadastro
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
