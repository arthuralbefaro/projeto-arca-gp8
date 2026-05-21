import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Painel Administrativo | Programa ARCA',
};

export default function RelatoriosPage() {
  return (
    <div className="arca-page">
      <Header />

      <main className="arca-section">
        <div className="arca-container">
          <PageTitle
            badge="Área interna demo"
            title="Painel administrativo"
            subtitle="Acompanhe cadastros, status, demanda por bairro e solicitações de castração. Esta versão usa dados salvos no navegador para funcionar no GitHub Pages."
          />

          <AdminDashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
