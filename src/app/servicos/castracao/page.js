import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import AlertBox from '@/components/ui/AlertBox';
import CastracaoForm from '@/components/forms/CastracaoForm';

export const metadata = {
  title: 'Solicitação de Castração | Programa ARCA',
};

export default function CastracaoPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="py-5">
        <div className="arca-container">
          <PageTitle
            badge="Serviço digital"
            title="Solicitação de castração"
            subtitle="Preencha os dados do tutor e do animal para iniciar uma solicitação de atendimento no Programa ARCA."
          />

          <div className="mb-4">
            <AlertBox type="info" title="Atenção">
              O envio do formulário não garante vaga imediata. A solicitação será analisada pela equipe responsável.
            </AlertBox>
          </div>

          <div className="arca-register-card">
            <CastracaoForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}