import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { assetPath } from '@/lib/assets';

export default function Footer() {
  return (
      <footer className="arca-footer">
        <div className="arca-container">
          <div className="arca-footer-grid">
            <div>
              <div className="arca-brand" style={{ marginBottom: 18 }}>
              <span className="arca-brand-mark">
                <Image
                    src={assetPath('/logo-serra.jpg')}
                    alt="Prefeitura da Serra"
                    className="arca-brand-logo"
                    width={44}
                    height={44}
                />
              </span>

                <span className="arca-brand-text">
                <strong>Programa ARCA</strong>
                <span>Prefeitura Municipal da Serra</span>
              </span>
              </div>

              <p>
                Plataforma digital de apoio ao cadastro, triagem e acompanhamento
                de solicitações relacionadas ao atendimento animal no município da Serra.
              </p>
            </div>

            <div>
              <h4>Navegação</h4>

              <div className="arca-footer-links">
                <Link href="/">Início</Link>
                <Link href="/registro">Cadastro do tutor</Link>
                <Link href="/servicos/castracao">Solicitar castração</Link>
                <Link href="/consulta">Consultar protocolo</Link>
                <Link href="/documentos">Documentos necessários</Link>
              </div>
            </div>

            <div>
              <h4>Atendimento</h4>

              <div className="arca-footer-links">
              <span>
                <Phone size={16} /> Horário comercial
              </span>

                <span>
                <Mail size={16} /> Secretaria responsável
              </span>

                <span>
                <MapPin size={16} /> Serra/ES
              </span>

                <Link href="/admin/relatorios">Painel administrativo</Link>
              </div>
            </div>
          </div>

          <div className="arca-footer-bottom">
            <span>Programa ARCA — Prefeitura Municipal da Serra.</span>
            <span>
              <ShieldCheck size={14} /> Ambiente institucional com acesso administrativo protegido
            </span>
          </div>
        </div>
      </footer>
  );
}
