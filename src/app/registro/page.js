'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { addRequest } from '@/lib/arca-storage';
import { BAIRROS_SERRA, maskCPF, maskPhone } from '@/lib/arca-data';
import { ArrowRight, CheckCircle2, ClipboardCheck, Home, Search } from 'lucide-react';

const initialForm = {
    tutorName: '',
    cpf: '',
    email: '',
    phone: '',
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

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!form.tutorName || !form.cpf || !form.phone || !form.bairro) {
            setToast('Preencha nome, CPF, telefone e bairro.');
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
                            <div className="arca-form-section">
                                <h2>Dados pessoais</h2>
                                <p>Essas informações serão usadas para identificar o responsável.</p>
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
                                    onChange={(event) => updateField('cpf', maskCPF(event.target.value))}
                                    placeholder="000.000.000-00"
                                />
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

                            <label>
                                Bairro
                                <select
                                    value={form.bairro}
                                    onChange={(event) => updateField('bairro', event.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    {BAIRROS_SERRA.map((bairro) => (
                                        <option value={bairro} key={bairro}>
                                            {bairro}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Endereço
                                <input
                                    value={form.address}
                                    onChange={(event) => updateField('address', event.target.value)}
                                    placeholder="Rua, número e complemento"
                                />
                            </label>

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