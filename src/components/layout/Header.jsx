'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Menu,
  X,
  Users,
  Landmark,
  Building2,
  UserRound,
  BookOpen,
  Files,
  PawPrint,
  ClipboardCheck,
  BarChart3,
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { label: 'Início', href: '/' },
    { label: 'Como funciona', href: '/como-funciona' },
    { label: 'Castração', href: '/servicos/castracao' },
    { label: 'Consulta', href: '/consulta' },
    { label: 'Relatórios', href: '/admin/relatorios' },
  ];

  return (
    <header className="pm-header">
      <div className="pm-header-main">
        <div className="arca-container pm-header-content">
          <Link href="/" className="pm-logo" onClick={() => setIsOpen(false)}>
            <div className="pm-logo-symbol">
              <PawPrint size={22} />
            </div>

            <div className="pm-logo-text">
              <span>Prefeitura da</span>
              <strong>Serra</strong>
            </div>
          </Link>

          <nav className="pm-main-links" aria-label="Menu principal">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pm-header-actions">
            <button type="button" aria-label="Pesquisar">
              <Search size={19} />
            </button>

            <button
              type="button"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="pm-mobile-panel">
            <div className="arca-container">
              <nav className="pm-mobile-links" aria-label="Menu mobile">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link href="/registro" onClick={() => setIsOpen(false)}>
                  Cadastro do tutor
                </Link>

                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Acessar minha conta
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>

      <div className="pm-category-bar">
        <div className="arca-container">
          <nav className="pm-category-nav" aria-label="Categorias">
            <Link href="#" className="pm-category-link">
              <Building2 size={18} />
              Secretarias
            </Link>

            <Link href="#" className="pm-category-link">
              <Users size={18} />
              Cidadão
            </Link>

            <Link href="#" className="pm-category-link">
              <Landmark size={18} />
              Empreendedor
            </Link>

            <Link href="#" className="pm-category-link">
              <UserRound size={18} />
              Servidor
            </Link>

            <Link href="#" className="pm-category-link">
              <BookOpen size={18} />
              Turista
            </Link>

            <Link href="/servicos/castracao" className="pm-category-link pm-category-highlight">
              <ClipboardCheck size={18} />
              Castração
            </Link>

            <Link href="/admin/relatorios" className="pm-category-link">
              <BarChart3 size={18} />
              Relatórios
            </Link>

            <Link href="/registro" className="pm-category-link">
              <Files size={18} />
              Cadastro
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
