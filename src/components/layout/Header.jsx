'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Building2,
  ClipboardCheck,
  Files,
  Landmark,
  Menu,
  PawPrint,
  Search,
  UserRound,
  Users,
  X,
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { label: 'Início', href: '/' },
    { label: 'Como funciona', href: '/como-funciona' },
    { label: 'Documentos', href: '/documentos' },
    { label: 'Castração', href: '/servicos/castracao' },
    { label: 'Consulta', href: '/consulta' },
  ];

  const categoryLinks = [
    { label: 'Secretarias', href: '#', icon: Landmark },
    { label: 'Cidadão', href: '#', icon: Users },
    { label: 'Empreendedor', href: '#', icon: Building2 },
    { label: 'Servidor', href: '#', icon: UserRound },
    { label: 'Educação', href: '#', icon: BookOpen },
    { label: 'Documentos', href: '/documentos', icon: Files },
    { label: 'Castração', href: '/servicos/castracao', icon: PawPrint, highlight: true },
    { label: 'Cadastro', href: '/registro', icon: ClipboardCheck, highlight: true },
  ];

  return (
    <header className="pm-header">
      <div className="pm-header-main">
        <div className="arca-container pm-header-content">
          <Link className="pm-logo" href="/" onClick={() => setIsOpen(false)}>
            <span className="pm-logo-symbol">
              <PawPrint size={23} />
            </span>
            <span className="pm-logo-text">
              <span>Programa</span>
              <strong>ARCA</strong>
            </span>
          </Link>

          <nav className="pm-main-links" aria-label="Navegação principal">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pm-header-actions">
            <Link className="arca-primary-btn py-2 px-3 d-none d-md-inline-flex" href="/registro">
              Cadastrar tutor
            </Link>
            <button type="button" aria-label="Pesquisar">
              <Search size={18} />
            </button>
            <button
              type="button"
              aria-label="Abrir menu"
              className="d-lg-none"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="pm-mobile-panel">
            <div className="arca-container pm-mobile-links">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/registro" onClick={() => setIsOpen(false)}>
                Cadastro do tutor
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Acessar minha conta
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="pm-category-bar">
        <div className="arca-container pm-category-nav">
          {categoryLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={`${link.label}-${link.href}`}
                className={`pm-category-link ${link.highlight ? 'pm-category-highlight' : ''}`}
                href={link.href}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
