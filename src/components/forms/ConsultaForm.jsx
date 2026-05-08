'use client';

import { useState } from 'react';
import FormInput from '@/components/ui/FormInput';
import StatusBadge from '@/components/ui/StatusBadge';
import AlertBox from '@/components/ui/AlertBox';

export default function ConsultaForm() {
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cpf = String(formData.get('cpf') || '').trim();
    const protocolo = String(formData.get('protocolo') || '').trim();

    if (!cpf && !protocolo) {
      setError('Informe o CPF ou o número de protocolo para consultar.');
      setResult(null);
      return;
    }

    if (cpf && cpf.length !== 11) {
      setError('O CPF deve ter 11 números.');
      setResult(null);
      return;
    }

    setError('');
    setResult({
      protocolo: protocolo || 'ARCA-2026-0001',
      tipo: 'Solicitação de castração',
      status: 'Em triagem',
      data: 'Cadastro recebido',
      proximaEtapa: 'Aguardar contato da equipe responsável.',
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="mb-4">
          <AlertBox type="warning" title="Verifique os dados">
            {error}
          </AlertBox>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <FormInput
            label="CPF do tutor"
            name="cpf"
            placeholder="Somente números"
            helper="Informe o CPF com 11 números."
          />
        </div>

        <div className="col-md-6">
          <FormInput
            label="Número de protocolo"
            name="protocolo"
            placeholder="Ex.: ARCA-2026-0001"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="arca-primary-btn px-5">
          Consultar cadastro
        </button>
      </div>

      {result && (
        <div className="arca-result-card mt-4">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <span className="text-muted d-block">Protocolo</span>
              <strong>{result.protocolo}</strong>
            </div>

            <StatusBadge status={result.status} />
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <span className="text-muted d-block">Tipo</span>
              <strong>{result.tipo}</strong>
            </div>

            <div className="col-md-4">
              <span className="text-muted d-block">Situação</span>
              <strong>{result.data}</strong>
            </div>

            <div className="col-md-4">
              <span className="text-muted d-block">Próxima etapa</span>
              <strong>{result.proximaEtapa}</strong>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}