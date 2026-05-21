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

      <main className="arca-section">
        <div className="arca-container">
          <PageTitle
            badge="Acompanhamento"
            title="Consulta de cadastro"
            subtitle="Consulte a situação da solicitação usando protocolo, CPF ou e-mail informado no cadastro."
          />

          <ConsultaForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
