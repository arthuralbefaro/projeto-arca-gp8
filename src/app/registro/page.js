import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterTutorForm from '@/components/forms/RegisterTutorForm';
import PageTitle from '@/components/ui/PageTitle';

export const metadata = {
  title: 'Registro de Tutor | Programa ARCA',
};

export default function RegisterPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="arca-section">
        <div className="arca-container">
          <PageTitle
            badge="Cadastro público"
            title="Registro do tutor"
            subtitle="Preencha os dados do responsável, endereço, perfil de prioridade e informações iniciais dos animais. Ao final, o sistema gera um protocolo de acompanhamento."
          />

          <RegisterTutorForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
