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
                            Cuidando dos animais da cidade
                        </h1>

                        <p className="arca-text mt-4">
                            O Programa ARCA organiza o cadastro de tutores, a triagem das
                            solicitações e o acompanhamento das etapas para castração de cães
                            e gatos no município da Serra.
                        </p>

                        <p className="arca-text">
                            A solicitação passa por avaliação da equipe responsável, seguindo
                            critérios de prioridade social, saúde pública, bem-estar animal e
                            disponibilidade de vagas.
                        </p>

                        <div className="arca-actions">
                            <Link href="/registro" className="arca-primary-btn">
                                Fazer cadastro
                                <ArrowRight size={18} />
                            </Link>

                            <Link href="/login" className="arca-secondary-btn">
                                Já tenho cadastro
                            </Link>
                        </div>

                        <div className="arca-pet-visual" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    );
}