import { CheckCircle2, FileText } from 'lucide-react';
import { documentosPrograma, prioridadesPrograma } from '@/lib/constants';

export default function PrioritySection() {
    return (
        <section className="arca-section pt-0">
            <div className="arca-container">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="arca-card h-100">
                            <h2 className="arca-section-title h3">
                                Critérios de prioridade
                            </h2>

                            <p className="text-muted">
                                A triagem considera critérios sociais, proteção animal e saúde pública.
                            </p>

                            <div className="d-grid gap-3 mt-4">
                                {prioridadesPrograma.map((item) => (
                                    <div className="d-flex gap-2" key={item}>
                                        <CheckCircle2 className="text-success flex-shrink-0" size={22} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="arca-card h-100">
                            <h2 className="arca-section-title h3">
                                Documentos importantes
                            </h2>

                            <p className="text-muted">
                                A documentação poderá ser solicitada durante a validação do cadastro.
                            </p>

                            <div className="d-grid gap-3 mt-4">
                                {documentosPrograma.map((item) => (
                                    <div className="d-flex gap-2" key={item}>
                                        <FileText className="text-primary flex-shrink-0" size={22} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}