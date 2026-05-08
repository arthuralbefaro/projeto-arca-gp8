import Link from 'next/link';
import { ArrowRight, PawPrint } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="arca-hero-shell">
      <div className="arca-container">
        <div className="arca-hero-card">
          <div className="arca-hero-top">
            <span>Programa ARCA</span>
            <span>Atendimento digital ao tutor</span>
          </div>

          <div className="arca-hero-content">
            <span className="arca-kicker">
              <PawPrint size={18} />
              Castração gratuita de cães e gatos
            </span>

            <h1 className="arca-title">
              Cadastro digital para tutores da Serra
            </h1>

            <p className="arca-text mt-4">
              Plataforma para tutores interessados nos serviços do Programa ARCA,
              com foco em cadastro, triagem e acompanhamento das solicitações.
            </p>

            <p className="arca-text">
              O cadastro é analisado pela equipe responsável e não garante vaga
              imediata. As solicitações seguem critérios de prioridade e
              disponibilidade do programa.
            </p>

            <div className="arca-actions">
              <Link href="/registro" className="arca-primary-btn">
                Cadastrar tutor
                <ArrowRight size={18} />
              </Link>

              <Link href="/servicos/castracao" className="arca-secondary-btn">
                Solicitar castração
              </Link>

              <Link href="/como-funciona" className="arca-secondary-btn">
                Entender como funciona
              </Link>
            </div>

            <div className="arca-pet-visual" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}