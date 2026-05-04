import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import {
    ClipboardCheck,
    PhoneCall,
    FileText,
    HeartPulse,
} from 'lucide-react';

export default function Home() {
    return (
        <div className="arca-page">
            <Header />

            <main>
                <HeroSection />

                <section className="arca-section">
                    <div className="arca-container">
                        <div className="mb-5">
                            <h2 className="arca-section-title">Como funciona o programa</h2>
                            <p className="arca-section-subtitle">
                                O cadastro é o primeiro passo para que o tutor seja avaliado
                                dentro dos critérios do Programa ARCA. Depois disso, a equipe
                                responsável pode entrar em contato para orientar os próximos passos.
                            </p>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-6 col-lg-3">
                                <div className="arca-feature-card">
                                    <div className="arca-feature-icon">
                                        <ClipboardCheck size={24} />
                                    </div>
                                    <h3 className="h5 fw-bold">1. Cadastro</h3>
                                    <p className="mb-0 text-muted">
                                        O tutor informa seus dados pessoais, endereço, contato e perfil de atendimento.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="arca-feature-card">
                                    <div className="arca-feature-icon">
                                        <HeartPulse size={24} />
                                    </div>
                                    <h3 className="h5 fw-bold">2. Triagem</h3>
                                    <p className="mb-0 text-muted">
                                        A solicitação passa por análise de prioridade e disponibilidade de vagas.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="arca-feature-card">
                                    <div className="arca-feature-icon">
                                        <PhoneCall size={24} />
                                    </div>
                                    <h3 className="h5 fw-bold">3. Contato</h3>
                                    <p className="mb-0 text-muted">
                                        A Secretaria entra em contato para orientar documentos e agendamento.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="arca-feature-card">
                                    <div className="arca-feature-icon">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="h5 fw-bold">4. Orientação</h3>
                                    <p className="mb-0 text-muted">
                                        O tutor recebe instruções sobre guarda responsável e cuidados com o animal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="arca-section pt-0">
                    <div className="arca-container">
                        <div className="arca-card">
                            <div className="row align-items-center g-4">
                                <div className="col-lg-7">
                                    <h2 className="arca-section-title">
                                        Cadastro não significa vaga imediata
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Após o envio, as informações serão analisadas pela equipe
                                        responsável. A aprovação depende dos critérios do programa,
                                        da documentação solicitada e da disponibilidade de vagas.
                                    </p>
                                </div>

                                <div className="col-lg-5">
                                    <div className="p-4 rounded-4" style={{ background: 'var(--arca-green-soft)' }}>
                                        <h3 className="h5 fw-bold">Prioridades consideradas</h3>
                                        <ul className="mb-0">
                                            <li>Tutores inscritos no CadÚnico</li>
                                            <li>Protetores independentes</li>
                                            <li>ONGs de proteção animal</li>
                                            <li>Áreas com maior vulnerabilidade social</li>
                                            <li>Riscos epidemiológicos e saúde pública</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}