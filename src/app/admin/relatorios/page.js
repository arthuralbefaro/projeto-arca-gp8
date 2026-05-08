import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/ui/PageTitle';
import StatCard from '@/components/ui/StatCard';
import { BarChart3, PawPrint, Scissors, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Relatórios | Programa ARCA',
};

export default function RelatoriosPage() {
  const adocoesPorMes = [
    { mes: 'Janeiro', especie: 'Cachorro', total: 120 },
    { mes: 'Janeiro', especie: 'Gato', total: 96 },
    { mes: 'Fevereiro', especie: 'Cachorro', total: 135 },
    { mes: 'Fevereiro', especie: 'Gato', total: 104 },
    { mes: 'Março', especie: 'Cachorro', total: 148 },
    { mes: 'Março', especie: 'Gato', total: 118 },
  ];

  const demandaCastracao = [
    { especie: 'Cachorro', solicitacoes: 860, status: 'Maior demanda' },
    { especie: 'Gato', solicitacoes: 740, status: 'Alta demanda' },
  ];

  return (
    <div className="arca-page">
      <Header />

      <main className="py-5">
        <div className="arca-container">
          <PageTitle
            badge="Relatórios"
            title="Relatórios do Programa ARCA"
            subtitle="Visualização estática dos principais indicadores usados nas consultas SQL do projeto."
          />

          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <StatCard
                title="Total de adoções"
                value="721"
                description="Dados simulados"
                icon={PawPrint}
              />
            </div>

            <div className="col-md-6 col-lg-3">
              <StatCard
                title="Solicitações de castração"
                value="1.600"
                description="Cães e gatos"
                icon={Scissors}
              />
            </div>

            <div className="col-md-6 col-lg-3">
              <StatCard
                title="Média mensal"
                value="240"
                description="Adoções por mês"
                icon={TrendingUp}
              />
            </div>

            <div className="col-md-6 col-lg-3">
              <StatCard
                title="Relatórios SQL"
                value="3"
                description="Consultas exigidas"
                icon={BarChart3}
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="arca-card h-100">
                <h2 className="h4 fw-bold mb-3">
                  Relação de adoções por mês
                </h2>

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Mês</th>
                        <th>Espécie</th>
                        <th>Total de adoções</th>
                      </tr>
                    </thead>

                    <tbody>
                      {adocoesPorMes.map((item) => (
                        <tr key={`${item.mes}-${item.especie}`}>
                          <td>{item.mes}</td>
                          <td>{item.especie}</td>
                          <td>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="arca-card h-100">
                <h2 className="h4 fw-bold mb-3">
                  Demanda de castração
                </h2>

                <div className="d-grid gap-3">
                  {demandaCastracao.map((item) => (
                    <div className="arca-demand-item" key={item.especie}>
                      <div>
                        <strong>{item.especie}</strong>
                        <span>{item.status}</span>
                      </div>

                      <strong>{item.solicitacoes}</strong>
                    </div>
                  ))}
                </div>

                <hr />

                <p className="text-muted mb-0">
                  Esta tela é visual. Os dados reais serão carregados futuramente
                  pelo backend conectado ao PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}