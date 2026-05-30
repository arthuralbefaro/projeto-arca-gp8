'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assetPath } from '@/lib/assets';
import {
  FileText,
  LogIn,
  Menu,
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
  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
  }

  function isActive(href) {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  }

  return (
      <header className="arca-header">
        <a href="#conteudo-principal" className="arca-skip-link">
          Ir para o conteúdo principal
        </a>

        <div className="arca-gov-strip">
          <div className="arca-gov-strip-inner">
            <span>
              <ShieldCheck size={14} />
              Prefeitura Municipal da Serra
            </span>
            <span>Serviço digital institucional</span>
          </div>
        </div>

        <div className="arca-header-inner">
          <Link href="/" className="arca-brand" onClick={closeMenu}>
          <span className="arca-brand-mark">
            <Image
                src={assetPath('/logo-serra.jpg')}
                alt="Prefeitura da Serra"
                className="arca-brand-logo"
                width={44}
                height={44}
                priority
            />
          </span>

            <span className="arca-brand-text">
            <strong>Programa ARCA</strong>
            <span>Atendimento animal da Serra</span>
          </span>
          </Link>

          <nav className="arca-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                >
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
                aria-expanded={isOpen}
                aria-controls="arca-menu-mobile"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
            <nav className="arca-mobile-menu" id="arca-menu-mobile" aria-label="Menu mobile">
              {navLinks.map((link) => (
                  <Link
                      href={link.href}
                      key={link.href}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
              ))}

              <Link href="/registro" onClick={closeMenu}>
                <UserPlus size={17} /> Cadastro do tutor
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
