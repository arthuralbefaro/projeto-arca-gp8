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

      <main className="arca-section">
        <div className="arca-container">
          <PageTitle
            badge="Serviço"
            title="Solicitação de castração"
            subtitle="Cadastre a solicitação de castração do animal e gere um protocolo para acompanhamento."
          />

          <div className="mb-4">
            <AlertBox type="warning" title="Atenção">
              O envio do formulário não garante vaga imediata. A solicitação será analisada pela equipe responsável.
            </AlertBox>
          </div>

          <CastracaoForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
