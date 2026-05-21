'use client';

import { useState } from 'react';
import Link from 'next/link';
import AlertBox from '@/components/ui/AlertBox';
import FormInput from '@/components/ui/FormInput';
import FormSection from '@/components/ui/FormSection';
import StatusBadge from '@/components/ui/StatusBadge';
import { bairrosSerra, especiesAnimais, tiposSolicitante } from '@/lib/constants';
import { formatCpf, isValidCpf, onlyCpfDigits } from '@/lib/cpf';
import { createSolicitacao, formatPhone, onlyDigits } from '@/lib/arcaStorage';

function findLabel(options, value) {
  return options.find((option) => option.value === value)?.label || value;
}

const initialForm = {
  nomeCompleto: '',
  cpf: '',
  telefone: '',
  email: '',
  bairro: '',
  tipoSolicitante: 'MUNICIPE',
  quantidadeAnimais: '1',
  especie: '',
  sexoAnimal: '',
  porteAnimal: '',
  vacinadoRaiva: '',
  sintomas: '',
  observacoes: '',
  termo: false,
};

export default function CastracaoForm() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const [createdRecord, setCreatedRecord] = useState(null);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setMessage(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidCpf(form.cpf)) {
      setMessage({ type: 'warning', title: 'CPF inválido', text: 'Digite um CPF válido para gerar o protocolo.' });
      return;
    }

    if (onlyDigits(form.telefone).length < 10) {
      setMessage({ type: 'warning', title: 'Telefone inválido', text: 'Informe um telefone válido para contato.' });
      return;
    }

    if (!form.termo) {
      setMessage({
        type: 'warning',
        title: 'Confirmação obrigatória',
        text: 'Confirme que leu as informações e entende que haverá triagem.',
      });
      return;
    }

    const solicitacao = createSolicitacao({
      nomeCompleto: form.nomeCompleto.trim(),
      cpf: onlyCpfDigits(form.cpf),
      telefone: form.telefone,
      email: form.email.trim(),
      bairro: form.bairro,
      tipoSolicitante: form.tipoSolicitante,
      tipoSolicitanteLabel: findLabel(tiposSolicitante, form.tipoSolicitante),
      servicoSolicitado: 'CASTRACAO',
      servicoLabel: 'Solicitação de castração',
      quantidadeAnimais: form.quantidadeAnimais,
      especie: form.especie,
      especieLabel: findLabel(especiesAnimais, form.especie),
      sexoAnimal: form.sexoAnimal,
      porteAnimal: form.porteAnimal,
      vacinadoRaiva: form.vacinadoRaiva,
      sintomas: form.sintomas,
      observacoes: form.observacoes.trim(),
    });

    setCreatedRecord(solicitacao);
    setForm(initialForm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (createdRecord) {
    return (
      <div className="arca-register-card">
        <AlertBox type="success" title="Solicitação de castração enviada">
          A solicitação foi salva no protótipo e já aparece no painel administrativo.
        </AlertBox>

        <div className="text-center my-4 p-4 rounded-4" style={{ background: 'var(--arca-green-soft)' }}>
          <span className="text-uppercase fw-bold text-muted small d-block mb-2">Protocolo</span>
          <h2 className="fw-bold mb-2">{createdRecord.protocolo}</h2>
          <StatusBadge status={createdRecord.status} />
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link className="arca-primary-btn" href="/consulta">
            Consultar status
          </Link>
          <button type="button" className="arca-secondary-btn" onClick={() => setCreatedRecord(null)}>
            Nova solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="arca-register-card" onSubmit={handleSubmit}>
      {message && (
        <div className="mb-4">
          <AlertBox type={message.type} title={message.title}>
            {message.text}
          </AlertBox>
        </div>
      )}

      <FormSection
        title="Dados do tutor"
        description="Informe os dados básicos para contato e identificação da solicitação."
      >
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput
              label="Nome completo"
              name="nomeCompleto"
              value={form.nomeCompleto}
              onChange={(event) => updateField('nomeCompleto', event.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <FormInput
              label="CPF"
              name="cpf"
              value={form.cpf}
              onChange={(event) => updateField('cpf', formatCpf(event.target.value))}
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="col-md-3">
            <FormInput
              label="Telefone"
              name="telefone"
              value={form.telefone}
              onChange={(event) => updateField('telefone', formatPhone(event.target.value))}
              placeholder="(27) 99999-9999"
              required
            />
          </div>
          <div className="col-md-5">
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="Bairro"
              name="bairro"
              as="select"
              value={form.bairro}
              onChange={(event) => updateField('bairro', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {bairrosSerra.map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-3">
            <FormInput
              label="Perfil"
              name="tipoSolicitante"
              as="select"
              value={form.tipoSolicitante}
              onChange={(event) => updateField('tipoSolicitante', event.target.value)}
              required
            >
              {tiposSolicitante.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </FormInput>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Dados do animal"
        description="Essas informações ajudam a equipe a priorizar e orientar o atendimento."
      >
        <div className="row g-3">
          <div className="col-md-3">
            <FormInput
              label="Quantidade"
              name="quantidadeAnimais"
              type="number"
              min="1"
              max="20"
              value={form.quantidadeAnimais}
              onChange={(event) => updateField('quantidadeAnimais', event.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <FormInput
              label="Espécie"
              name="especie"
              as="select"
              value={form.especie}
              onChange={(event) => updateField('especie', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {especiesAnimais.map((especie) => (
                <option key={especie.value} value={especie.value}>
                  {especie.label}
                </option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-3">
            <FormInput
              label="Sexo"
              name="sexoAnimal"
              as="select"
              value={form.sexoAnimal}
              onChange={(event) => updateField('sexoAnimal', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option>Macho</option>
              <option>Fêmea</option>
              <option>Mais de um animal</option>
              <option>Não sei informar</option>
            </FormInput>
          </div>
          <div className="col-md-3">
            <FormInput
              label="Porte"
              name="porteAnimal"
              as="select"
              value={form.porteAnimal}
              onChange={(event) => updateField('porteAnimal', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
              <option>Não sei informar</option>
            </FormInput>
          </div>
          <div className="col-md-4">
            <FormInput
              label="Vacina antirrábica em dia?"
              name="vacinadoRaiva"
              as="select"
              value={form.vacinadoRaiva}
              onChange={(event) => updateField('vacinadoRaiva', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
              <option>Não sei informar</option>
            </FormInput>
          </div>
          <div className="col-md-4">
            <FormInput
              label="Animal com sintomas?"
              name="sintomas"
              as="select"
              value={form.sintomas}
              onChange={(event) => updateField('sintomas', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
              <option>Não sei informar</option>
            </FormInput>
          </div>
          <div className="col-md-4">
            <FormInput
              label="Observações"
              name="observacoes"
              value={form.observacoes}
              onChange={(event) => updateField('observacoes', event.target.value)}
              placeholder="Ex.: animal de rua, cio, risco, etc."
            />
          </div>
        </div>
      </FormSection>

      <div className="p-3 rounded-4 mb-4" style={{ background: 'var(--arca-green-soft)' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="termo"
            checked={form.termo}
            onChange={(event) => updateField('termo', event.target.checked)}
          />
          <label className="form-check-label" htmlFor="termo">
            Declaro que li as informações e estou ciente de que a solicitação passará por triagem.
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="arca-primary-btn px-5">
          Enviar solicitação
        </button>
      </div>
    </form>
  );
}
