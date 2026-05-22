'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { addRequest } from '@/lib/arca-storage';
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
    tutorName: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    bairro: '',
    address: '',
    requesterType: 'tutor',
    vulnerableArea: 'nao',
    notes: '',
};

export default function RegistroPage() {
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState(null);
    const [toast, setToast] = useState('');
    const [cepLoading, setCepLoading] = useState(false);
    const [cpfTouched, setCpfTouched] = useState(false);

    const cpfIsInvalid = cpfTouched && form.cpf && !isValidCPF(form.cpf);

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
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
                cep: maskCEP(cep),
                address: data.logradouro || current.address,
                bairro: data.bairro || current.bairro,
            }));

            setToast('Endereço preenchido automaticamente pelo CEP.');
        } catch {
            setToast('Não foi possível buscar o CEP. Preencha manualmente.');
        } finally {
            setCepLoading(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCpfTouched(true);

        if (!form.tutorName || !form.cpf || !form.phone || !form.cep || !form.bairro) {
            setToast('Preencha nome, CPF, telefone, CEP e bairro.');
            return;
        }

        if (!isValidCPF(form.cpf)) {
            setToast('CPF inválido. Confira os números digitados.');
            return;
        }

        const request = addRequest({
            ...form,
            type: 'cadastro_tutor',
            service: 'Cadastro de tutor/protetor',
            animalName: 'Não informado',
            species: 'Não informado',
            sex: 'Não informado',
            quantity: 1,
            vaccinated: 'nao_informado',
            riskSituation: 'nao',
        });

        setSuccess(request);
        setForm(initialForm);
        setCpfTouched(false);
        setToast('Cadastro enviado com sucesso.');
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

                            <div className="arca-protocol-box">{success.protocol}</div>

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
                                    value={form.tutorName}
                                    onChange={(event) => updateField('tutorName', event.target.value)}
                                    placeholder="Ex.: Maria Souza"
                                />
                            </label>

                            <label>
                                CPF
                                <input
                                    value={form.cpf}
                                    onBlur={() => setCpfTouched(true)}
                                    onChange={(event) => updateField('cpf', maskCPF(event.target.value))}
                                    placeholder="000.000.000-00"
                                    className={cpfIsInvalid ? 'arca-input-error' : ''}
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
                                    value={form.email}
                                    onChange={(event) => updateField('email', event.target.value)}
                                    placeholder="email@exemplo.com"
                                />
                            </label>

                            <label>
                                Telefone
                                <input
                                    value={form.phone}
                                    onChange={(event) => updateField('phone', maskPhone(event.target.value))}
                                    placeholder="(27) 99999-9999"
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
                                        value={form.cep}
                                        onChange={(event) => {
                                            const nextCep = maskCEP(event.target.value);
                                            updateField('cep', nextCep);

                                            if (onlyNumbers(nextCep).length === 8) {
                                                searchCep(nextCep);
                                            }
                                        }}
                                        onBlur={(event) => searchCep(event.target.value)}
                                        placeholder="00000-000"
                                    />

                                    {cepLoading && <Loader2 className="arca-spin" size={18} />}
                                </div>
                            </label>

                            <label>
                                Bairro
                                <select
                                    value={form.bairro}
                                    onChange={(event) => updateField('bairro', event.target.value)}
                                >
                                    <option value="">Selecione</option>

                                    {form.bairro && !BAIRROS_SERRA.includes(form.bairro) && (
                                        <option value={form.bairro}>{form.bairro}</option>
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
                                    value={form.address}
                                    onChange={(event) => updateField('address', event.target.value)}
                                    placeholder="Rua, número e complemento"
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
                                    value={form.requesterType}
                                    onChange={(event) => updateField('requesterType', event.target.value)}
                                >
                                    <option value="tutor">Tutor/responsável</option>
                                    <option value="cadunico">Família CadÚnico/NIS</option>
                                    <option value="protetor">Protetor independente</option>
                                    <option value="ong">ONG/projeto de proteção animal</option>
                                </select>
                            </label>

                            <label>
                                Área vulnerável ou de risco?
                                <select
                                    value={form.vulnerableArea}
                                    onChange={(event) => updateField('vulnerableArea', event.target.value)}
                                >
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </select>
                            </label>

                            <label className="arca-field-full">
                                Observações
                                <textarea
                                    value={form.notes}
                                    onChange={(event) => updateField('notes', event.target.value)}
                                    placeholder="Descreva alguma informação importante para a triagem."
                                    rows={4}
                                />
                            </label>

                            <div className="arca-form-actions arca-field-full">
                                <button type="submit" className="arca-btn arca-btn-primary">
                                    Enviar cadastro
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