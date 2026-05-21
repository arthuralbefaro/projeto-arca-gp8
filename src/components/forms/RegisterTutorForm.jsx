'use client';

import { useState } from 'react';
import Link from 'next/link';
import AlertBox from '@/components/ui/AlertBox';
import FormInput from '@/components/ui/FormInput';
import FormSection from '@/components/ui/FormSection';
import StatusBadge from '@/components/ui/StatusBadge';
import {
  bairrosSerra,
  especiesAnimais,
  servicosPrograma,
  tiposSolicitante,
} from '@/lib/constants';
import { formatCpf, isValidCpf, onlyCpfDigits } from '@/lib/cpf';
import { createSolicitacao, formatCep, formatPhone, onlyDigits } from '@/lib/arcaStorage';

function findLabel(options, value) {
  return options.find((option) => option.value === value)?.label || value;
}

const initialForm = {
  nomeCompleto: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  tipoSolicitante: '',
  nis: '',
  servicoSolicitado: 'CASTRACAO',
  quantidadeAnimais: '1',
  especie: '',
  sexoAnimal: '',
  porteAnimal: '',
  vacinadoRaiva: '',
  sintomas: '',
  observacoes: '',
  lgpd: false,
};

export default function RegisterTutorForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [createdRecord, setCreatedRecord] = useState(null);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  }

  function handleCpfChange(event) {
    updateField('cpf', formatCpf(event.target.value));
  }

  function handlePhoneChange(event) {
    updateField('telefone', formatPhone(event.target.value));
  }

  function handleCepChange(event) {
    updateField('cep', formatCep(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidCpf(form.cpf)) {
      setError('Digite um CPF válido para gerar o protocolo.');
      return;
    }

    if (onlyDigits(form.telefone).length < 10) {
      setError('Informe um telefone válido para contato da equipe responsável.');
      return;
    }

    if (!form.lgpd) {
      setError('Confirme a declaração de veracidade e ciência sobre a triagem.');
      return;
    }

    const solicitacao = createSolicitacao({
      nomeCompleto: form.nomeCompleto.trim(),
      cpf: onlyCpfDigits(form.cpf),
      dataNascimento: form.dataNascimento,
      telefone: form.telefone,
      email: form.email.trim(),
      cep: form.cep,
      endereco: form.endereco.trim(),
      numero: form.numero.trim(),
      complemento: form.complemento.trim(),
      bairro: form.bairro,
      tipoSolicitante: form.tipoSolicitante,
      tipoSolicitanteLabel: findLabel(tiposSolicitante, form.tipoSolicitante),
      nis: form.nis.trim(),
      servicoSolicitado: form.servicoSolicitado,
      servicoLabel: findLabel(servicosPrograma, form.servicoSolicitado),
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
        <AlertBox type="success" title="Cadastro enviado com sucesso">
          Sua solicitação foi registrada no protótipo do sistema. Guarde o protocolo para acompanhar o status.
        </AlertBox>

        <div className="text-center my-4 p-4 rounded-4" style={{ background: 'var(--arca-green-soft)' }}>
          <span className="text-uppercase fw-bold text-muted small d-block mb-2">Protocolo</span>
          <h2 className="fw-bold mb-2">{createdRecord.protocolo}</h2>
          <StatusBadge status={createdRecord.status} />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="arca-card h-100 shadow-none">
              <span className="text-muted small fw-bold">Tutor</span>
              <p className="mb-0 fw-bold">{createdRecord.nomeCompleto}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="arca-card h-100 shadow-none">
              <span className="text-muted small fw-bold">Serviço</span>
              <p className="mb-0 fw-bold">{createdRecord.servicoLabel}</p>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Link className="arca-primary-btn" href="/consulta">
            Consultar protocolo
          </Link>
          <button className="arca-secondary-btn" type="button" onClick={() => setCreatedRecord(null)}>
            Fazer novo cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="arca-register-card" onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4">
          <AlertBox type="warning" title="Verifique os dados">
            {error}
          </AlertBox>
        </div>
      )}

      <FormSection
        title="Dados pessoais"
        description="Informe os dados básicos do tutor responsável pelo cadastro."
      >
        <div className="row g-3">
          <div className="col-md-8">
            <FormInput
              label="Nome completo"
              name="nomeCompleto"
              value={form.nomeCompleto}
              onChange={(event) => updateField('nomeCompleto', event.target.value)}
              placeholder="Ex.: Maria Silva"
              required
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="CPF"
              name="cpf"
              value={form.cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="Data de nascimento"
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={(event) => updateField('dataNascimento', event.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="Telefone / WhatsApp"
              name="telefone"
              value={form.telefone}
              onChange={handlePhoneChange}
              placeholder="(27) 99999-9999"
              required
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="nome@email.com"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Endereço"
        description="O atendimento é destinado a moradores do município da Serra."
      >
        <div className="row g-3">
          <div className="col-md-3">
            <FormInput
              label="CEP"
              name="cep"
              value={form.cep}
              onChange={handleCepChange}
              placeholder="00000-000"
            />
          </div>
          <div className="col-md-6">
            <FormInput
              label="Endereço"
              name="endereco"
              value={form.endereco}
              onChange={(event) => updateField('endereco', event.target.value)}
              placeholder="Rua, avenida ou referência"
              required
            />
          </div>
          <div className="col-md-3">
            <FormInput
              label="Número"
              name="numero"
              value={form.numero}
              onChange={(event) => updateField('numero', event.target.value)}
              required
            />
          </div>
          <div className="col-md-5">
            <FormInput
              label="Bairro"
              name="bairro"
              as="select"
              value={form.bairro}
              onChange={(event) => updateField('bairro', event.target.value)}
              required
            >
              <option value="">Selecione o bairro</option>
              {bairrosSerra.map((bairro) => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-7">
            <FormInput
              label="Complemento / referência"
              name="complemento"
              value={form.complemento}
              onChange={(event) => updateField('complemento', event.target.value)}
              placeholder="Casa, apartamento, ponto de referência"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Perfil do solicitante"
        description="Essas informações ajudam na triagem e nos critérios de prioridade."
      >
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput
              label="Tipo de solicitante"
              name="tipoSolicitante"
              as="select"
              value={form.tipoSolicitante}
              onChange={(event) => updateField('tipoSolicitante', event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {tiposSolicitante.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </FormInput>
          </div>
          <div className="col-md-6">
            <FormInput
              label="NIS"
              name="nis"
              value={form.nis}
              onChange={(event) => updateField('nis', onlyDigits(event.target.value).slice(0, 14))}
              placeholder="Informe apenas se tiver CadÚnico"
              helper="O NIS ajuda a validar critérios sociais de prioridade."
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Serviço e informações do animal"
        description="Preencha os dados principais para a equipe entender a solicitação."
      >
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput
              label="Serviço solicitado"
              name="servicoSolicitado"
              as="select"
              value={form.servicoSolicitado}
              onChange={(event) => updateField('servicoSolicitado', event.target.value)}
              required
            >
              {servicosPrograma.map((servico) => (
                <option key={servico.value} value={servico.value}>
                  {servico.label}
                </option>
              ))}
            </FormInput>
          </div>
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
          <div className="col-md-4">
            <FormInput
              label="Sexo do animal"
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
          <div className="col-md-4">
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
          <div className="col-md-8">
            <FormInput
              label="Observações"
              name="observacoes"
              as="textarea"
              rows="3"
              value={form.observacoes}
              onChange={(event) => updateField('observacoes', event.target.value)}
              placeholder="Descreva informações importantes sobre o animal, local ou urgência."
            />
          </div>
        </div>
      </FormSection>

      <div className="p-3 rounded-4 mb-4" style={{ background: 'var(--arca-green-soft)' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="lgpd"
            checked={form.lgpd}
            onChange={(event) => updateField('lgpd', event.target.checked)}
          />
          <label className="form-check-label" htmlFor="lgpd">
            Declaro que as informações preenchidas são verdadeiras e estou ciente de que o cadastro passará por triagem, sem garantia de vaga imediata.
          </label>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
        <span className="text-muted small">Já possui protocolo? Consulte o andamento pela página de consulta.</span>
        <div className="d-flex flex-wrap gap-2">
          <Link className="arca-secondary-btn" href="/consulta">
            Consultar cadastro
          </Link>
          <button type="submit" className="arca-primary-btn px-5">
            Gerar protocolo
          </button>
        </div>
      </div>
    </form>
  );
}
