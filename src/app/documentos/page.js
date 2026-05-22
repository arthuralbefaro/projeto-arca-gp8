import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  AlertCircle,
  CheckCircle2,
  FileCheck2,
  FileText,
  Home,
  IdCard,
  PawPrint,
  ShieldCheck,
} from 'lucide-react';

const documents = [
  {
    title: 'Documento pessoal',
    description:
        'RG, CNH ou outro documento oficial com foto do responsável pelo cadastro.',
    icon: IdCard,
  },
  {
    title: 'CPF do responsável',
    description:
        'Usado para identificar o cadastro e permitir a consulta da solicitação.',
    icon: FileText,
  },
  {
    title: 'Comprovante de residência',
    description:
        'Documento que comprove residência no município da Serra.',
    icon: Home,
  },
  {
    title: 'NIS ou CadÚnico',
    description:
        'Quando houver, pode ser usado para análise de prioridade social.',
    icon: ShieldCheck,
  },
  {
    title: 'Cartão de vacinação',
    description:
        'Informações de vacinação do animal podem ser solicitadas na triagem.',
    icon: FileCheck2,
  },
  {
    title: 'Dados do animal',
    description:
        'Nome, espécie, sexo, quantidade de animais e situação de saúde.',
    icon: PawPrint,
  },
];

export default function DocumentosPage() {
  return (
      <div className="arca-page">
        <Header />

        <main className="arca-documents-page">
          <section className="arca-container">
            <div className="arca-documents-hero">
            <span className="arca-eyebrow">
              <FileText size={16} />
              Preparação
            </span>

              <h1>Documentos necessários</h1>

              <p>
                Confira os documentos que podem ser solicitados durante a análise
                do cadastro e evite pendências no atendimento.
              </p>
            </div>

            <div className="arca-documents-alert">
              <AlertCircle size={24} />

              <div>
                <strong>Importante</strong>
                <p>
                  Nem todos os documentos serão obrigatórios para todos os casos.
                  A equipe poderá solicitar documentos específicos conforme o
                  perfil do tutor, o tipo de solicitação e a situação do animal.
                </p>
              </div>
            </div>

            <div className="arca-documents-grid">
              {documents.map((item, index) => {
                const Icon = item.icon;

                return (
                    <article
                        className="arca-document-card"
                        key={item.title}
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                  <span className="arca-document-icon">
                    <Icon size={24} />
                  </span>

                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </div>

                      <CheckCircle2 className="arca-document-check" size={20} />
                    </article>
                );
              })}
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}