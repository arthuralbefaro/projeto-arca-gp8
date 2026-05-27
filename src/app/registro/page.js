'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { solicitacoesApi, ApiError } from '@/lib/api';
import {
    BAIRROS_SERRA,
    isValidCPF,
    maskCEP,
    maskCPF,
    maskPhone,
    onlyNumbers,
} from '@/lib/arca-data';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    Home,
    Loader2,
    Search,
} from 'lucide-react';

const initialForm = {
    tutorNome: '',
    tutorCpf: '',
    tutorEmail: '',
    tutorTelefone: '',
    tutorCep: '',
    tutorBairro: '',
    tutorEndereco: '',
    tipoSolicitante: 'TUTOR',
    areaVulneravel: false,
    observacoes: '',
};

export default function RegistroPage() {
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState(null);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);
    const [cpfTouched, setCpfTouched] = useState(false);

    const cpfIsInvalid = cpfTouched && form.tutorCpf && !isValidCPF(form.tutorCpf);

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function searchCep(cepValue) {
        const cep = onlyNumbers(cepValue);
        if (cep.length !== 8) return;

        try {
            setCepLoading(true);
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setToast('CEP não encontrado. Preencha o endereço manualmente.');
                return;
            }

            setForm((current) => ({
                ...current,
                tutorCep: maskCEP(cep),
                tutorEndereco: data.logradouro || current.tutorEndereco,
                tutorBairro: data.bairro || current.tutorBairro,
            }));

            setToast('Endereço preenchido automaticamente pelo CEP.');
        } catch {
            setToast('Não foi possível buscar o CEP. Preencha manualmente.');
        } finally {
            setCepLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setCpfTouched(true);

        if (!form.tutorNome || !form.tutorCpf || !form.tutorTelefone || !form.tutorCep || !form.tutorBairro) {
            setToast('Preencha nome, CPF, telefone, CEP e bairro.');
            return;
        }

        if (!isValidCPF(form.tutorCpf)) {
            setToast('CPF inválido. Confira os números digitados.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                tipo: 'CADASTRO_TUTOR',
                tutorNome: form.tutorNome.trim(),
                tutorCpf: onlyNumbers(form.tutorCpf),
                tutorEmail: form.tutorEmail.trim() || null,
                tutorTelefone: form.tutorTelefone,
                tutorCep: form.tutorCep,
                tutorBairro: form.tutorBairro,
                tutorEndereco: form.tutorEndereco.trim() || null,
                tipoSolicitante: form.tipoSolicitante,
                animalQuantidade: 1,
                situacaoRisco: false,
                areaVulneravel: form.areaVulneravel,
                observacoes: form.observacoes.trim() || null,
            };

            const result = await solicitacoesApi.criar(payload);
            setSuccess(result);
            setForm(initialForm);
            setCpfTouched(false);
        } catch (error) {
            const message =
                error instanceof ApiError
                    ? error.message
                    : 'Erro ao enviar cadastro. Tente novamente.';
            setToast(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="arca-page">
            <Header />
            <Toast message={toast} onClose={() => setToast('')} />

            <main className="arca-section">
                <div className="arca-container">
                    <div className="arca-section-heading">
                        <span className="arca-eyebrow">
                            <ClipboardCheck size={16} />
                            Cadastro do tutor
                        </span>

                        <h1>Cadastre o responsável pelo animal.</h1>

                        <p>
                            Informe os dados do tutor para gerar um protocolo de atendimento.
                            O cadastro será analisado pela equipe responsável.
                        </p>
                    </div>

                    {success ? (
                        <section className="arca-success-card">
                            <CheckCircle2 size={54} />

                            <h2>Cadastro enviado com sucesso</h2>

                            <p>
                                Seu protocolo foi gerado. Guarde esse número para consultar o
                                andamento do atendimento.
                            </p>

                            <div className="arca-protocol-box">{success.protocolo}</div>

                            <div className="arca-success-actions">
                                <Link href="/consulta" className="arca-btn arca-btn-primary">
                                    Consultar protocolo
                                    <Search size={18} />
                                </Link>

                                <Link href="/" className="arca-btn arca-btn-secondary">
                                    Voltar para início
                                    <Home size={18} />
                                </Link>
                            </div>
                        </section>
                    ) : (
                        <form className="arca-form-card arca-form-grid" onSubmit={handleSubmit}>
                            <div className="arca-form-section arca-field-full">
                                <h2>Dados pessoais</h2>
                                <p>
                                    Essas informações serão usadas para identificar o responsável
                                    e gerar o protocolo.
                                </p>
                            </div>

                            <label>
                                Nome completo
                                <input
                                    value={form.tutorNome}
                                    onChange={(event) => updateField('tutorNome', event.target.value)}
                                    placeholder="Ex.: Maria Souza"
                                    disabled={loading}
                                />
                            </label>

                            <label>
                                CPF
                                <input
                                    value={form.tutorCpf}
                                    onBlur={() => setCpfTouched(true)}
                                    onChange={(event) => updateField('tutorCpf', maskCPF(event.target.value))}
                                    placeholder="000.000.000-00"
                                    className={cpfIsInvalid ? 'arca-input-error' : ''}
                                    disabled={loading}
                                />
                                {cpfIsInvalid && (
                                    <small className="arca-field-error">
                                        <AlertCircle size={14} />
                                        CPF inválido. Confira os números digitados.
                                    </small>
                                )}
                            </label>

                            <label>
                                E-mail
                                <input
                                    type="email"
                                    value={form.tutorEmail}
                                    onChange={(event) => updateField('tutorEmail', event.target.value)}
                                    placeholder="email@exemplo.com"
                                    disabled={loading}
                                />
                            </label>

                            <label>
                                Telefone
                                <input
                                    value={form.tutorTelefone}
                                    onChange={(event) => updateField('tutorTelefone', maskPhone(event.target.value))}
                                    placeholder="(27) 99999-9999"
                                    disabled={loading}
                                />
                            </label>

                            <div className="arca-form-section arca-field-full">
                                <h2>Endereço</h2>
                                <p>
                                    Digite o CEP para preencher automaticamente a rua e o bairro.
                                </p>
                            </div>

                            <label>
                                CEP
                                <div className="arca-cep-field">
                                    <input
                                        value={form.tutorCep}
                                        onChange={(event) => {
                                            const nextCep = maskCEP(event.target.value);
                                            updateField('tutorCep', nextCep);
                                            if (onlyNumbers(nextCep).length === 8) searchCep(nextCep);
                                        }}
                                        onBlur={(event) => searchCep(event.target.value)}
                                        placeholder="00000-000"
                                        disabled={loading}
                                    />
                                    {cepLoading && <Loader2 className="arca-spin" size={18} />}
                                </div>
                            </label>

                            <label>
                                Bairro
                                <select
                                    value={form.tutorBairro}
                                    onChange={(event) => updateField('tutorBairro', event.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Selecione</option>

                                    {form.tutorBairro && !BAIRROS_SERRA.includes(form.tutorBairro) && (
                                        <option value={form.tutorBairro}>{form.tutorBairro}</option>
                                    )}

                                    {BAIRROS_SERRA.map((bairro) => (
                                        <option value={bairro} key={bairro}>
                                            {bairro}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="arca-field-full">
                                Rua / endereço
                                <input
                                    value={form.tutorEndereco}
                                    onChange={(event) => updateField('tutorEndereco', event.target.value)}
                                    placeholder="Rua, número e complemento"
                                    disabled={loading}
                                />
                            </label>

                            <div className="arca-form-section arca-field-full">
                                <h2>Perfil da solicitação</h2>
                                <p>
                                    Essas informações ajudam a equipe a entender o contexto do cadastro.
                                </p>
                            </div>

                            <label>
                                Tipo de solicitante
                                <select
                                    value={form.tipoSolicitante}
                                    onChange={(event) => updateField('tipoSolicitante', event.target.value)}
                                    disabled={loading}
                                >
                                    <option value="TUTOR">Tutor/responsável</option>
                                    <option value="CADUNICO">Família CadÚnico/NIS</option>
                                    <option value="PROTETOR">Protetor independente</option>
                                    <option value="ONG">ONG/projeto de proteção animal</option>
                                </select>
                            </label>

                            <label>
                                Área vulnerável ou de risco?
                                <select
                                    value={form.areaVulneravel ? 'sim' : 'nao'}
                                    onChange={(event) => updateField('areaVulneravel', event.target.value === 'sim')}
                                    disabled={loading}
                                >
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </select>
                            </label>

                            <label className="arca-field-full">
                                Observações
                                <textarea
                                    value={form.observacoes}
                                    onChange={(event) => updateField('observacoes', event.target.value)}
                                    placeholder="Descreva alguma informação importante para a triagem."
                                    rows={4}
                                    disabled={loading}
                                />
                            </label>

                            <div className="arca-form-actions arca-field-full">
                                <button
                                    type="submit"
                                    className="arca-btn arca-btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar cadastro'}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
