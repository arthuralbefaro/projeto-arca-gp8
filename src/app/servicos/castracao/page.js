'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { addRequest } from '@/lib/arca-storage';
import { BAIRROS_SERRA, maskCPF, maskPhone } from '@/lib/arca-data';
import { ArrowRight, CheckCircle2, Home, PawPrint, Search } from 'lucide-react';

const initialForm = {
    tutorName: '',
    cpf: '',
    email: '',
    phone: '',
    bairro: '',
    address: '',
    requesterType: 'tutor',
    animalName: '',
    species: 'Cachorro',
    sex: 'Fêmea',
    quantity: 1,
    vaccinated: 'nao',
    riskSituation: 'nao',
    vulnerableArea: 'nao',
    notes: '',
};

export default function CastracaoPage() {
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

        if (!form.tutorName || !form.cpf || !form.phone || !form.bairro || !form.animalName) {
            setToast('Preencha os dados obrigatórios do tutor e do animal.');
            return;
        }

        const request = addRequest({
            ...form,
            type: 'castracao',
            service: 'Solicitação de castração',
        });

        setSuccess(request);
        setForm(initialForm);
        setToast('Solicitação enviada com sucesso.');
    }

    return (
        <div className="arca-page">
            <Header />
            <Toast message={toast} onClose={() => setToast('')} />

            <main className="arca-section">
                <div className="arca-container">
                    <div className="arca-section-heading">
            <span className="arca-eyebrow">
              <PawPrint size={16} />
              Solicitação de castração
            </span>

                        <h1>Solicite a análise para castração.</h1>

                        <p>
                            Preencha as informações do tutor e do animal. A solicitação será
                            analisada conforme documentação, critérios sociais e disponibilidade.
                        </p>
                    </div>

                    {success ? (
                        <section className="arca-success-card">
                            <CheckCircle2 size={54} />

                            <h2>Solicitação enviada com sucesso</h2>

                            <p>
                                Seu protocolo foi gerado. Use esse número para acompanhar o
                                andamento da solicitação.
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
                                <h2>Dados do tutor</h2>
                                <p>Informe quem será o responsável pelo acompanhamento.</p>
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

                            <div className="arca-form-section arca-field-full">
                                <h2>Dados do animal</h2>
                                <p>Essas informações ajudam a equipe na triagem.</p>
                            </div>

                            <label>
                                Nome do animal
                                <input
                                    value={form.animalName}
                                    onChange={(event) => updateField('animalName', event.target.value)}
                                    placeholder="Ex.: Mel"
                                />
                            </label>

                            <label>
                                Espécie
                                <select
                                    value={form.species}
                                    onChange={(event) => updateField('species', event.target.value)}
                                >
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Cães e gatos">Cães e gatos</option>
                                </select>
                            </label>

                            <label>
                                Sexo
                                <select
                                    value={form.sex}
                                    onChange={(event) => updateField('sex', event.target.value)}
                                >
                                    <option value="Fêmea">Fêmea</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Diversos">Diversos</option>
                                </select>
                            </label>

                            <label>
                                Quantidade de animais
                                <input
                                    type="number"
                                    min="1"
                                    value={form.quantity}
                                    onChange={(event) => updateField('quantity', event.target.value)}
                                />
                            </label>

                            <label>
                                Vacinação em dia?
                                <select
                                    value={form.vaccinated}
                                    onChange={(event) => updateField('vaccinated', event.target.value)}
                                >
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                    <option value="parcial">Parcialmente</option>
                                </select>
                            </label>

                            <label>
                                Situação de risco?
                                <select
                                    value={form.riskSituation}
                                    onChange={(event) => updateField('riskSituation', event.target.value)}
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
                                    placeholder="Descreva informações importantes sobre o animal."
                                    rows={4}
                                />
                            </label>

                            <div className="arca-form-actions arca-field-full">
                                <button type="submit" className="arca-btn arca-btn-primary">
                                    Enviar solicitação
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