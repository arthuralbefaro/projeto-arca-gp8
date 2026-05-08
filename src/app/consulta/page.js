import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import ConsultaForm from '@/components/forms/ConsultaForm';

export const metadata = {
  title: 'Consulta de Cadastro | Programa ARCA',
};

export default function ConsultaPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="py-5">
        <div className="arca-container">
          <PageTitle
            badge="Acompanhamento"
            title="Consulta de cadastro"
            subtitle="Consulte visualmente o andamento de uma solicitação usando CPF ou protocolo."
          />

          <div className="arca-register-card">
            <ConsultaForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}