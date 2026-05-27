'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { solicitacoesApi, ApiError } from '@/lib/api';
import { BAIRROS_SERRA, maskCPF, maskPhone, onlyNumbers } from '@/lib/arca-data';
import { ArrowRight, CheckCircle2, Home, PawPrint, Search } from 'lucide-react';

const initialForm = {
    tutorNome: '',
    tutorCpf: '',
    tutorEmail: '',
    tutorTelefone: '',
    tutorBairro: '',
    tutorEndereco: '',
    tipoSolicitante: 'TUTOR',
    animalNome: '',
    animalEspecie: 'CACHORRO',
    animalSexo: 'Fêmea',
    animalQuantidade: 1,
    vacinadoRaiva: 'NAO_INFORMADO',
    animalSintomas: 'NAO_INFORMADO',
    situacaoRisco: false,
    areaVulneravel: false,
    observacoes: '',
};

export default function CastracaoPage() {
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState(null);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(false);

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!form.tutorNome || !form.tutorCpf || !form.tutorTelefone || !form.tutorBairro || !form.animalNome) {
            setToast('Preencha os dados obrigatórios do tutor e do animal.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                tipo: 'CASTRACAO',
                tutorNome: form.tutorNome.trim(),
                tutorCpf: onlyNumbers(form.tutorCpf),
                tutorEmail: form.tutorEmail.trim() || null,
                tutorTelefone: form.tutorTelefone,
                tutorBairro: form.tutorBairro,
                tutorEndereco: form.tutorEndereco.trim() || null,
                tipoSolicitante: form.tipoSolicitante,
                animalNome: form.animalNome.trim(),
                animalEspecie: form.animalEspecie,
                animalSexo: form.animalSexo,
                animalQuantidade: Number(form.animalQuantidade),
                vacinadoRaiva: form.vacinadoRaiva,
                animalSintomas: form.animalSintomas,
                situacaoRisco: form.situacaoRisco,
                areaVulneravel: form.areaVulneravel,
                observacoes: form.observacoes.trim() || null,
            };

            const result = await solicitacoesApi.criar(payload);
            setSuccess(result);
            setForm(initialForm);
        } catch (error) {
            const message =
                error instanceof ApiError
                    ? error.message
                    : 'Erro ao enviar solicitação. Tente novamente.';
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
                                <h2>Dados do tutor</h2>
                                <p>Informe quem será o responsável pelo acompanhamento.</p>
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
                                    onChange={(event) => updateField('tutorCpf', maskCPF(event.target.value))}
                                    placeholder="000.000.000-00"
                                    disabled={loading}
                                />
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

                            <label>
                                Bairro
                                <select
                                    value={form.tutorBairro}
                                    onChange={(event) => updateField('tutorBairro', event.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Selecione</option>
                                    {BAIRROS_SERRA.map((bairro) => (
                                        <option value={bairro} key={bairro}>{bairro}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Endereço
                                <input
                                    value={form.tutorEndereco}
                                    onChange={(event) => updateField('tutorEndereco', event.target.value)}
                                    placeholder="Rua, número e complemento"
                                    disabled={loading}
                                />
                            </label>

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

                            <div className="arca-form-section arca-field-full">
                                <h2>Dados do animal</h2>
                                <p>Essas informações ajudam a equipe na triagem.</p>
                            </div>

                            <label>
                                Nome do animal
                                <input
                                    value={form.animalNome}
                                    onChange={(event) => updateField('animalNome', event.target.value)}
                                    placeholder="Ex.: Mel"
                                    disabled={loading}
                                />
                            </label>

                            <label>
                                Espécie
                                <select
                                    value={form.animalEspecie}
                                    onChange={(event) => updateField('animalEspecie', event.target.value)}
                                    disabled={loading}
                                >
                                    <option value="CACHORRO">Cachorro</option>
                                    <option value="GATO">Gato</option>
                                    <option value="AMBOS">Cães e gatos</option>
                                </select>
                            </label>

                            <label>
                                Sexo
                                <select
                                    value={form.animalSexo}
                                    onChange={(event) => updateField('animalSexo', event.target.value)}
                                    disabled={loading}
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
                                    max="100"
                                    value={form.animalQuantidade}
                                    onChange={(event) => updateField('animalQuantidade', event.target.value)}
                                    disabled={loading}
                                />
                            </label>

                            <label>
                                Vacinação antirrábica em dia?
                                <select
                                    value={form.vacinadoRaiva}
                                    onChange={(event) => updateField('vacinadoRaiva', event.target.value)}
                                    disabled={loading}
                                >
                                    <option value="NAO_INFORMADO">Não sei informar</option>
                                    <option value="SIM">Sim</option>
                                    <option value="NAO">Não</option>
                                </select>
                            </label>

                            <label>
                                Situação de risco?
                                <select
                                    value={form.situacaoRisco ? 'sim' : 'nao'}
                                    onChange={(event) => updateField('situacaoRisco', event.target.value === 'sim')}
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
                                    placeholder="Descreva informações importantes sobre o animal."
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
                                    {loading ? 'Enviando...' : 'Enviar solicitação'}
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
