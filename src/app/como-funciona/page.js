import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import AlertBox from '@/components/ui/AlertBox';
import {
  etapasPrograma,
  documentosPrograma,
  prioridadesPrograma,
} from '@/lib/constants';
import { CheckCircle2, FileText } from 'lucide-react';

export const metadata = {
  title: 'Como Funciona | Programa ARCA',
};

export default function ComoFuncionaPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="py-5">
        <div className="arca-container">
          <PageTitle
            badge="Etapas do atendimento"
            title="Como funciona o Programa ARCA"
            subtitle="Entenda as principais etapas do cadastro, triagem, orientação e atendimento aos tutores."
          />

          <div className="row g-4 mb-5">
            {etapasPrograma.map((etapa) => (
              <div className="col-md-6 col-lg-4" key={etapa.number}>
                <div className="arca-feature-card">
                  <span className="d-block fs-2 fw-bold text-success mb-3">
                    {etapa.number}
                  </span>

                  <h2 className="h5 fw-bold">{etapa.title}</h2>

                  <p className="text-muted mb-0">{etapa.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <AlertBox type="warning" title="Importante">
              O cadastro não representa aprovação automática. A equipe responsável poderá solicitar documentos e entrar em contato para orientar os próximos passos.
            </AlertBox>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="arca-card h-100">
                <h2 className="h4 fw-bold mb-3">Critérios de prioridade</h2>

                <div className="d-grid gap-3">
                  {prioridadesPrograma.map((item) => (
                    <div className="d-flex gap-2" key={item}>
                      <CheckCircle2 className="text-success flex-shrink-0" size={21} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="arca-card h-100">
                <h2 className="h4 fw-bold mb-3">Documentos que podem ser solicitados</h2>

                <div className="d-grid gap-3">
                  {documentosPrograma.map((item) => (
                    <div className="d-flex gap-2" key={item}>
                      <FileText className="text-primary flex-shrink-0" size={21} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}