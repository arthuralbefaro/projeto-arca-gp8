import { etapasPrograma } from '@/lib/constants';

export default function StepsSection() {
    return (
        <section className="arca-section">
            <div className="arca-container">
                <div className="mb-5">
                    <h2 className="arca-section-title">
                        Como funciona o atendimento
                    </h2>

                    <p className="arca-section-subtitle">
                        O processo começa pelo cadastro e segue para análise, contato da equipe
                        responsável e orientação ao tutor.
                    </p>
                </div>

                <div className="row g-4">
                    {etapasPrograma.map((etapa) => (
                        <div className="col-md-6 col-lg-3" key={etapa.number}>
                            <div className="arca-feature-card">
                <span className="d-block fs-2 fw-bold text-success mb-3">
                  {etapa.number}
                </span>

                                <h3 className="h5 fw-bold">
                                    {etapa.title}
                                </h3>

                                <p className="text-muted mb-0">
                                    {etapa.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}