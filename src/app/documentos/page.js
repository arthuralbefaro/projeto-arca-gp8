import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import AlertBox from '@/components/ui/AlertBox';
import { documentosPrograma } from '@/lib/constants';
import { BadgeCheck, FileText, Home, IdCard, PawPrint, ShieldCheck } from 'lucide-react';

const documentosDetalhados = [
  {
    title: 'Documento pessoal',
    description: 'RG, CNH ou outro documento oficial com foto do responsável pelo cadastro.',
    icon: IdCard,
  },
  {
    title: 'CPF do responsável',
    description: 'Usado para identificar o cadastro e permitir a consulta da solicitação.',
    icon: BadgeCheck,
  },
  {
    title: 'Comprovante de residência',
    description: 'Documento que comprove moradia no município da Serra.',
    icon: Home,
  },
  {
    title: 'Comprovante do NIS',
    description: 'Solicitado quando o tutor informa participação no CadÚnico.',
    icon: ShieldCheck,
  },
  {
    title: 'Cartão de vacinação',
    description: 'Quando aplicável, a equipe poderá solicitar cartão de vacinação antirrábica atualizado.',
    icon: PawPrint,
  },
  {
    title: 'Informações do animal',
    description: 'Fotos, histórico, sintomas ou outras informações podem ser solicitadas durante a triagem.',
    icon: FileText,
  },
];

export const metadata = {
  title: 'Documentos Necessários | Programa ARCA',
};

export default function DocumentosPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="arca-section">
        <div className="arca-container">
          <PageTitle
            badge="Preparação"
            title="Documentos necessários"
            subtitle="Confira os documentos que podem ser solicitados durante a análise do cadastro e evite pendências no atendimento."
          />

          <div className="mb-4">
            <AlertBox type="info" title="Importante">
              Nem todos os documentos serão obrigatórios para todos os casos. A equipe poderá pedir documentos específicos conforme o perfil do tutor e a situação do animal.
            </AlertBox>
          </div>

          <div className="row g-4 mb-5">
            {documentosDetalhados.map((documento) => {
              const Icon = documento.icon;

              return (
                <div className="col-md-6 col-lg-4" key={documento.title}>
                  <div className="arca-feature-card">
                    <div className="arca-feature-icon">
                      <Icon size={24} />
                    </div>
                    <h2 className="h5 fw-bold">{documento.title}</h2>
                    <p className="text-muted mb-0">{documento.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="arca-card">
            <h2 className="fw-bold h4 mb-3">Lista resumida</h2>
            <div className="row g-3">
              {documentosPrograma.map((item) => (
                <div className="col-md-6" key={item}>
                  <div className="d-flex gap-3 p-3 rounded-4 border h-100">
                    <BadgeCheck color="var(--arca-green-dark)" />
                    <span className="fw-bold">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
