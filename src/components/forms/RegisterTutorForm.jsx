'use client';

import { useState } from 'react';
import Link from 'next/link';

import FormInput from '@/components/ui/FormInput';
import { bairrosSerra, tiposSolicitante } from '@/lib/constants';
import { formatCpf, isValidCpf, onlyCpfDigits } from '@/lib/cpf';

export default function RegisterTutorForm() {
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleCpfChange(event) {
    const formattedCpf = formatCpf(event.target.value);

    setCpf(formattedCpf);
    setSuccessMessage('');

    if (onlyCpfDigits(formattedCpf).length === 11 && !isValidCpf(formattedCpf)) {
      setCpfError('CPF inválido.');
      return;
    }

    setCpfError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidCpf(cpf)) {
      setCpfError('Digite um CPF válido.');
      return;
    }

    const formData = new FormData(event.currentTarget);

    const tutorData = {
      nomeCompleto: formData.get('nomeCompleto'),
      cpf: onlyCpfDigits(cpf),
      dataNascimento: formData.get('dataNascimento'),
      telefone: formData.get('telefone'),
      email: formData.get('email'),
      endereco: formData.get('endereco'),
      bairro: formData.get('bairro'),
      tipoSolicitante: formData.get('tipoSolicitante'),
      nis: formData.get('nis'),
      senha: formData.get('senha'),
      confirmarSenha: formData.get('confirmarSenha'),
    };

    console.log('Dados do tutor:', tutorData);

    setSuccessMessage('CPF válido. Cadastro pronto para ser enviado ao backend futuramente.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="arca-form-section">
        <h2>Dados pessoais</h2>
        <p>Informe os dados básicos do tutor responsável pelo cadastro.</p>

        <div className="row">
          <div className="col-md-8">
            <FormInput
              label="Nome completo"
              name="nomeCompleto"
              placeholder="Ex.: Maria Silva"
              required
            />
          </div>

          <div className="col-md-4">
            <FormInput
              label="CPF"
              name="cpf"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              maxLength={14}
              required
              helper={cpfError || 'Digite apenas números. O sistema formatará automaticamente.'}
            />

            {cpfError && (
              <small className="text-danger d-block mt-1">
                {cpfError}
              </small>
            )}
          </div>

          <div className="col-md-4">
            <FormInput
              label="Data de nascimento"
              name="dataNascimento"
              type="date"
              required
            />
          </div>
        </div>
      </div>

      <div className="arca-form-section">
        <h2>Contato</h2>

        <p>Essas informações poderão ser usadas pela equipe para orientar o atendimento.</p>

        <div className="row">
          <div className="col-md-6">
            <FormInput
              label="Telefone/WhatsApp"
              name="telefone"
              placeholder="(27) 99999-9999"
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="seuemail@email.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="arca-form-section">
        <h2>Endereço</h2>

        <p>O atendimento é destinado a moradores do município da Serra.</p>

        <div className="row">
          <div className="col-md-8">
            <FormInput
              label="Endereço"
              name="endereco"
              placeholder="Rua, número e complemento"
              required
            />
          </div>

          <div className="col-md-4">
            <FormInput
              label="Bairro"
              name="bairro"
              as="select"
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
        </div>
      </div>

      <div className="arca-form-section">
        <h2>Perfil do solicitante</h2>

        <p>Essas informações ajudam na triagem e nos critérios de prioridade.</p>

        <div className="row">
          <div className="col-md-6">
            <FormInput
              label="Tipo de solicitante"
              name="tipoSolicitante"
              as="select"
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
              placeholder="Informe apenas se possuir"
            />

            <small className="arca-helper-text">
              Informe o NIS somente se for inscrito no CadÚnico.
            </small>
          </div>
        </div>
      </div>

      <div className="arca-form-section">
        <h2>Acesso ao sistema</h2>

        <p>Crie uma senha para acessar futuramente a área do tutor.</p>

        <div className="row">
          <div className="col-md-6">
            <FormInput
              label="Senha"
              name="senha"
              type="password"
              placeholder="Crie uma senha"
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput
              label="Confirmar senha"
              name="confirmarSenha"
              type="password"
              placeholder="Repita a senha"
              required
            />
          </div>
        </div>
      </div>

      <div className="p-3 rounded-4 mb-4" style={{ background: 'var(--arca-green-soft)' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="termoCadastro"
            required
          />

          <label className="form-check-label" htmlFor="termoCadastro">
            Declaro que as informações preenchidas são verdadeiras e estou ciente
            de que o cadastro passará por triagem da equipe responsável.
          </label>
        </div>
      </div>

      {successMessage && (
        <div className="alert alert-success rounded-4">
          {successMessage}
        </div>
      )}

      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
        <Link href="/login" className="arca-small-link text-decoration-none">
          Já possui cadastro? Entrar
        </Link>

        <button type="submit" className="arca-primary-btn px-5">
          Cadastrar tutor
        </button>
      </div>
    </form>
  );
}
