import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AlertBox from '@/components/ui/AlertBox';
import { avisosImportantes, etapasPrograma, prioridadesPrograma } from '@/lib/constants';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartPulse,
  PawPrint,
  PhoneCall,
  SearchCheck,
} from 'lucide-react';

const quickActions = [
  {
    title: 'Cadastrar tutor',
    description: 'Crie o cadastro e gere um protocolo para acompanhar a triagem.',
    href: '/registro',
    icon: ClipboardCheck,
  },
  {
    title: 'Solicitar castração',
    description: 'Informe os dados do tutor e do animal para análise da equipe.',
    href: '/servicos/castracao',
    icon: PawPrint,
  },
  {
    title: 'Consultar protocolo',
    description: 'Acompanhe status, pendências e próxima etapa da solicitação.',
    href: '/consulta',
    icon: SearchCheck,
  },
  {
    title: 'Ver documentos',
    description: 'Confira o que pode ser solicitado durante a validação.',
    href: '/documentos',
    icon: FileText,
  },
];

export default function Home() {
  return (
    <div className="arca-page">
      <Header />

      <main>
        <section className="arca-hero-shell">
          <div className="arca-container">
            <div className="arca-hero-card">
              <div className="arca-hero-top">
                <span className="fw-bold">Prefeitura Municipal da Serra</span>
                <span>Programa de atendimento animal</span>
              </div>

              <div className="arca-hero-content">
                <span className="arca-kicker">
                  <HeartPulse size={18} />
                  Cadastro, triagem e acompanhamento
                </span>

                <h1 className="arca-title">Cadastro para castração e atendimento animal na Serra</h1>

                <p className="arca-text mt-4">
                  O sistema permite que tutores registrem solicitações, recebam um protocolo e acompanhem a análise da equipe responsável pelo Programa ARCA.
                </p>

                <div className="arca-actions">
                  <Link className="arca-primary-btn" href="/registro">
                    <ClipboardCheck size={18} />
                    Cadastrar tutor
                  </Link>
                  <Link className="arca-secondary-btn" href="/consulta">
                    <SearchCheck size={18} />
                    Consultar protocolo
                  </Link>
                </div>

                <div className="row g-3 mt-4">
                  <div className="col-md-4">
                    <div className="p-3 rounded-4 bg-white bg-opacity-50 h-100">
                      <strong className="d-block h4 mb-0">01</strong>
                      <span className="fw-bold">Cadastro do tutor</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded-4 bg-white bg-opacity-50 h-100">
                      <strong className="d-block h4 mb-0">02</strong>
                      <span className="fw-bold">Triagem da equipe</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded-4 bg-white bg-opacity-50 h-100">
                      <strong className="d-block h4 mb-0">03</strong>
                      <span className="fw-bold">Status por protocolo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="arca-pet-visual" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="arca-section pt-0">
          <div className="arca-container">
            <div className="row g-4">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <div className="col-md-6 col-xl-3" key={action.href}>
                    <Link className="text-decoration-none" href={action.href}>
                      <div className="arca-feature-card">
                        <div className="arca-feature-icon">
                          <Icon size={24} />
                        </div>
                        <h2 className="h5 fw-bold">{action.title}</h2>
                        <p className="text-muted mb-0">{action.description}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="arca-section pt-0">
          <div className="arca-container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <span className="arca-kicker">
                  <AlertCircle size={18} />
                  Antes de começar
                </span>
                <h2 className="arca-section-title">Avisos importantes</h2>
                <p className="arca-section-subtitle">
                  O cadastro organiza a demanda e facilita a comunicação com a equipe, mas não significa aprovação automática ou vaga imediata.
                </p>
              </div>
              <div className="col-lg-7">
                <div className="d-grid gap-3">
                  {avisosImportantes.map((aviso) => (
                    <AlertBox key={aviso} type="info">
                      {aviso}
                    </AlertBox>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="arca-section pt-0">
          <div className="arca-container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 760 }}>
              <span className="arca-kicker">
                <PhoneCall size={18} />
                Jornada do atendimento
              </span>
              <h2 className="arca-section-title">Como funciona o atendimento</h2>
              <p className="arca-section-subtitle mx-auto">
                O processo começa pelo cadastro e segue para análise, validação de informações, contato da equipe e possível agendamento.
              </p>
            </div>

            <div className="row g-4">
              {etapasPrograma.map((etapa) => (
                <div className="col-md-6 col-lg-4" key={etapa.number}>
                  <div className="arca-card h-100">
                    <span className="fw-bold text-muted">{etapa.number}</span>
                    <h3 className="h5 fw-bold mt-2">{etapa.title}</h3>
                    <p className="text-muted mb-0">{etapa.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="arca-section pt-0">
          <div className="arca-container">
            <div className="arca-card">
              <div className="row g-4 align-items-center">
                <div className="col-lg-5">
                  <span className="arca-kicker">
                    <CheckCircle2 size={18} />
                    Critérios de prioridade
                  </span>
                  <h2 className="arca-section-title">Quem pode ter prioridade?</h2>
                  <p className="arca-section-subtitle mb-0">
                    A seleção considera critérios sociais, proteção animal, disponibilidade de vagas e fatores relacionados à saúde pública.
                  </p>
                </div>
                <div className="col-lg-7">
                  <div className="row g-3">
                    {prioridadesPrograma.map((item) => (
                      <div className="col-md-6" key={item}>
                        <div className="d-flex gap-3 p-3 rounded-4 border h-100">
                          <CheckCircle2 color="var(--arca-green-dark)" />
                          <span className="fw-bold">{item}</span>
                        </div>
                      </div>
                    ))}
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
