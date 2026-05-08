import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import {
  ClipboardCheck,
  PhoneCall,
  FileText,
  HeartPulse,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  avisosImportantes,
  etapasPrograma,
  prioridadesPrograma,
} from '@/lib/constants';

export default function Home() {
  return (
    <div className="arca-page">
      <Header />

      <main>
        <HeroSection />

        <section className="arca-section">
          <div className="arca-container">
            <div className="mb-5">
              <h2 className="arca-section-title">Atendimento do Programa ARCA</h2>

              <p className="arca-section-subtitle">
                O sistema permite o cadastro de tutores interessados nos serviços
                do Programa ARCA, com foco em castração, triagem e acompanhamento
                de solicitações.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="arca-feature-card">
                  <div className="arca-feature-icon">
                    <ClipboardCheck size={24} />
                  </div>

                  <h3 className="h5 fw-bold">Cadastrar tutor</h3>

                  <p className="mb-0 text-muted">
                    Crie seu cadastro para iniciar o atendimento no programa.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="arca-feature-card">
                  <div className="arca-feature-icon">
                    <HeartPulse size={24} />
                  </div>

                  <h3 className="h5 fw-bold">Solicitar atendimento</h3>

                  <p className="mb-0 text-muted">
                    Informe seus dados para que a solicitação seja analisada.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="arca-feature-card">
                  <div className="arca-feature-icon">
                    <PhoneCall size={24} />
                  </div>

                  <h3 className="h5 fw-bold">Acompanhar contato</h3>

                  <p className="mb-0 text-muted">
                    A equipe poderá orientar o tutor sobre documentos e próximos passos.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="arca-feature-card">
                  <div className="arca-feature-icon">
                    <FileText size={24} />
                  </div>

                  <h3 className="h5 fw-bold">Entender regras</h3>

                  <p className="mb-0 text-muted">
                    Veja critérios, prioridades e informações importantes do programa.
                  </p>
                </div>
              </div>
            </div>

            <div className="arca-actions mt-5">
              <Link href="/registro" className="arca-primary-btn">
                Cadastrar tutor
              </Link>

              <Link href="/login" className="arca-secondary-btn">
                Acessar minha conta
              </Link>

              <a href="#como-funciona" className="arca-secondary-btn">
                Entender como funciona
              </a>
            </div>
          </div>
        </section>

        <section id="avisos" className="arca-section pt-0">
          <div className="arca-container">
            <div className="arca-card">
              <div className="row g-4 align-items-center">
                <div className="col-lg-5">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="arca-feature-icon mb-0">
                      <AlertCircle size={24} />
                    </div>

                    <h2 className="arca-section-title h3 mb-0">
                      Avisos importantes
                    </h2>
                  </div>

                  <p className="text-muted mb-0">
                    Antes de realizar o cadastro, leia as informações principais
                    sobre a análise das solicitações.
                  </p>
                </div>

                <div className="col-lg-7">
                  <div className="d-grid gap-3">
                    {avisosImportantes.map((aviso) => (
                      <div className="d-flex gap-2" key={aviso}>
                        <CheckCircle2 className="text-success flex-shrink-0" size={21} />
                        <span>{aviso}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="arca-section pt-0">
          <div className="arca-container">
            <div className="mb-5">
              <h2 className="arca-section-title">Como funciona o atendimento</h2>

              <p className="arca-section-subtitle">
                O processo começa pelo cadastro e segue para análise, contato da
                equipe responsável, orientação e possível agendamento.
              </p>
            </div>

            <div className="row g-4">
              {etapasPrograma.map((etapa) => (
                <div className="col-md-6 col-lg-4" key={etapa.number}>
                  <div className="arca-feature-card">
                    <span className="d-block fs-2 fw-bold text-success mb-3">
                      {etapa.number}
                    </span>

                    <h3 className="h5 fw-bold">{etapa.title}</h3>

                    <p className="text-muted mb-0">{etapa.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="prioridades" className="arca-section pt-0">
          <div className="arca-container">
            <div className="arca-card">
              <div className="row align-items-center g-4">
                <div className="col-lg-7">
                  <h2 className="arca-section-title">
                    Critérios de prioridade
                  </h2>

                  <p className="text-muted mb-0">
                    A seleção considera critérios sociais, proteção animal,
                    disponibilidade de vagas e fatores relacionados à saúde pública.
                  </p>
                </div>

                <div className="col-lg-5">
                  <div className="p-4 rounded-4" style={{ background: 'var(--arca-green-soft)' }}>
                    <h3 className="h5 fw-bold mb-3">Prioridades consideradas</h3>

                    <ul className="mb-0">
                      {prioridadesPrograma.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
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