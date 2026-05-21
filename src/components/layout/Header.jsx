'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  LogIn,
  Menu,
  PawPrint,
  Search,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Como funciona', href: '/como-funciona' },
  { label: 'Documentos', href: '/documentos' },
  { label: 'Castração', href: '/servicos/castracao' },
  { label: 'Consulta', href: '/consulta' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
      <header className="arca-header">
        <div className="arca-header-inner">
          <Link href="/" className="arca-brand" onClick={closeMenu}>
          <span className="arca-brand-mark">
            <PawPrint size={23} />
          </span>

            <span className="arca-brand-text">
            <strong>Programa ARCA</strong>
            <span>Atendimento animal digital</span>
          </span>
          </Link>

          <nav className="arca-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
            ))}
          </nav>

          <div className="arca-header-actions">
            <Link href="/registro" className="arca-btn arca-btn-primary">
              <UserPlus size={18} />
              Cadastrar tutor
            </Link>

            <button
                type="button"
                className="arca-menu-btn"
                onClick={() => setIsOpen((current) => !current)}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
            <nav className="arca-mobile-menu" aria-label="Menu mobile">
              {navLinks.map((link) => (
                  <Link href={link.href} key={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
              ))}

              <Link href="/registro" onClick={closeMenu}>
                <UserPlus size={17} /> Cadastro do tutor
              </Link>

              <Link href="/consulta" onClick={closeMenu}>
                <Search size={17} /> Consultar protocolo
              </Link>

              <Link href="/documentos" onClick={closeMenu}>
                <FileText size={17} /> Documentos necessários
              </Link>

              <Link href="/login" onClick={closeMenu}>
                <LogIn size={17} /> Acessar conta
              </Link>

              <Link href="/admin/relatorios" onClick={closeMenu}>
                <ShieldCheck size={17} /> Painel
              </Link>
            </nav>
        )}
      </header>
  );
}