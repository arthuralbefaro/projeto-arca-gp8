import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileCheck2, FileText, Home, IdCard, PawPrint } from 'lucide-react';

const documents = [
    {
        title: 'Documento com foto',
        description: 'RG, CNH ou outro documento oficial de identificação.',
        icon: IdCard,
    },
    {
        title: 'CPF do responsável',
        description: 'Documento usado para identificação do tutor no cadastro.',
        icon: FileText,
    },
    {
        title: 'Comprovante de residência',
        description: 'Comprovação de residência no município da Serra.',
        icon: Home,
    },
    {
        title: 'NIS/CadÚnico, quando houver',
        description: 'Pode ser usado na triagem de prioridade social.',
        icon: FileCheck2,
    },
    {
        title: 'Informações do animal',
        description: 'Nome, espécie, sexo, vacinação e situação de saúde.',
        icon: PawPrint,
    },
];

export default function DocumentosPage() {
    return (
        <div className="arca-page">
            <Header />

            <main className="arca-section">
                <div className="arca-container">
                    <div className="arca-section-heading">
            <span className="arca-eyebrow">
              <FileText size={16} />
              Documentos necessários
            </span>

                        <h1>Prepare os documentos antes de solicitar atendimento.</h1>

                        <p>
                            A documentação pode ser solicitada pela equipe responsável durante
                            a etapa de triagem e validação.
                        </p>
                    </div>

                    <div className="arca-grid arca-grid-3">
                        {documents.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article className="arca-card" key={item.title}>
                  <span className="arca-card-icon">
                    <Icon size={25} />
                  </span>

                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}