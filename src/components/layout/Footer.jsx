import Link from 'next/link';
import { Mail, PawPrint, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="arca-footer">
      <div className="arca-container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-3">
              <div className="arca-feature-icon mb-0">
                <PawPrint size={24} />
              </div>
              <div>
                <strong className="d-block">Programa ARCA</strong>
                <span className="text-muted">Prefeitura Municipal da Serra</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex flex-column gap-2 text-muted small">
              <span className="d-flex align-items-center gap-2">
                <Phone size={16} /> Atendimento em horário comercial
              </span>
              <span className="d-flex align-items-center gap-2">
                <Mail size={16} /> Secretaria responsável pelo programa
              </span>
            </div>
          </div>

          <div className="col-lg-3 text-lg-end">
            <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
              <Link className="arca-small-link" href="/consulta">
                Consulta
              </Link>
              <Link className="arca-small-link" href="/documentos">
                Documentos
              </Link>
              <Link className="arca-small-link" href="/admin/relatorios">
                Painel demo
              </Link>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-wrap justify-content-between gap-2 text-muted small">
          <span>Programa ARCA - Serra/ES</span>
          <span>Protótipo front-end com dados simulados no navegador.</span>
        </div>
      </div>
    </footer>
  );
}
