import Link from 'next/link';
import { PawPrint, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="arca-footer">
            <div className="arca-container">
                <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                        <Link href="/" className="arca-brand">
                            <div className="arca-logo">
                                <PawPrint size={24} />
                            </div>

                            <div>
                <span className="arca-brand-title d-block text-dark">
                  Programa ARCA
                </span>
                                <span className="arca-brand-subtitle d-block text-muted">
                  Prefeitura Municipal da Serra
                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex flex-column flex-md-row justify-content-md-end gap-3 text-muted">
              <span className="d-inline-flex align-items-center gap-2">
                <Phone size={17} />
                Atendimento em horário comercial
              </span>

                            <span className="d-inline-flex align-items-center gap-2">
                <Mail size={17} />
                Secretaria de Meio Ambiente
              </span>
                        </div>
                    </div>
                </div>

                <hr />

                <p className="mb-0 text-muted small">
                    Programa ARCA - Serra ES
                </p>
            </div>
        </footer>
    );
}
