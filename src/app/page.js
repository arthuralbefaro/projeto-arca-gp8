import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartPulse,
  PawPrint,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';

const quickActions = [
  {
    title: 'Cadastrar tutor',
    description:
        'Crie o cadastro inicial do responsável e gere um protocolo para acompanhamento.',
    href: '/registro',
    icon: ClipboardCheck,
  },
  {
    title: 'Solicitar castração',
    description:
        'Informe dados do animal e envie a solicitação para análise da equipe responsável.',
    href: '/servicos/castracao',
    icon: PawPrint,
  },
  {
    title: 'Consultar protocolo',
    description:
        'Acompanhe status, pendências e próxima etapa usando CPF, e-mail ou protocolo.',
    href: '/consulta',
    icon: SearchCheck,
  },
  {
    title: 'Ver documentos',
    description:
        'Confira os documentos que podem ser solicitados na validação do atendimento.',
    href: '/documentos',
    icon: FileText,
  },
];

const stats = [
  {
    number: '01',
    label: 'Cadastro digital do tutor',
  },
  {
    number: '02',
    label: 'Triagem e validação dos dados',
  },
  {
    number: '03',
    label: 'Acompanhamento por protocolo',
  },
  {
    number: '04',
    label: 'Orientação e possível agendamento',
  },
];

const steps = [
  {
    number: '01',
    title: 'Cadastro do tutor',
    description:
        'O responsável informa seus dados pessoais, endereço, contato e perfil de solicitação.',
  },
  {
    number: '02',
    title: 'Solicitação do serviço',
    description:
        'O tutor registra a demanda, como castração, atendimento ou orientação relacionada ao animal.',
  },
  {
    number: '03',
    title: 'Triagem da equipe',
    description:
        'A equipe avalia critérios sociais, documentação, disponibilidade e prioridade de atendimento.',
  },
  {
    number: '04',
    title: 'Acompanhamento por protocolo',
    description:
        'O cidadão pode consultar o andamento da solicitação e verificar possíveis pendências.',
  },
];

const priorities = [
  {
    title: 'Famílias em vulnerabilidade',
    description:
        'Cadastros vinculados a critérios sociais podem receber atenção prioritária na triagem.',
    icon: UserCheck,
  },
  {
    title: 'Proteção animal',
    description:
        'Protetores, ONGs e casos coletivos podem ser sinalizados para organização da demanda.',
    icon: ShieldCheck,
  },
  {
    title: 'Saúde pública',
    description:
        'Situações com risco sanitário, grande volume de animais ou urgência podem ser priorizadas.',
    icon: HeartPulse,
  },
];

export default function Home() {
  return (
      <div className="arca-page">
        <Header />

        <main>
          <section className="arca-hero">
            <div className="arca-container arca-hero-inner">
              <div>
              <span className="arca-eyebrow">
                <Sparkles size={16} />
                Prefeitura Municipal da Serra
              </span>

                <h1>
                  Cadastro digital para <span>atendimento animal</span> na Serra.
                </h1>

                <p>
                  O Programa ARCA organiza o cadastro de tutores, solicitações de
                  castração, triagem de informações e acompanhamento do processo
                  por protocolo.
                </p>

                <div className="arca-hero-actions">
                  <Link href="/registro" className="arca-btn arca-btn-primary">
                    Cadastrar tutor
                    <ArrowRight size={18} />
                  </Link>

                  <Link href="/consulta" className="arca-btn arca-btn-secondary">
                    Consultar protocolo
                    <SearchCheck size={18} />
                  </Link>
                </div>

                <div className="arca-hero-note">
                  <CheckCircle2 size={20} />
                  <span>
                  O cadastro passa por análise da equipe responsável e não
                  garante vaga imediata. As solicitações seguem critérios de
                  prioridade, documentação e disponibilidade do programa.
                </span>
                </div>
              </div>

              <div className="arca-hero-card">
                <div className="arca-pet-visual">
                  <img
                      src="/projeto-arca-gp8/logo-serra.jpg"
                      alt="Prefeitura da Serra"
                      className="arca-brand-logo"
                  />
                </div>

                <div className="arca-floating-card one">
                  <strong>Cadastro com protocolo</strong>
                  <span>O tutor recebe uma identificação para acompanhar o processo.</span>
                </div>

                <div className="arca-floating-card two">
                  <strong>Triagem organizada</strong>
                  <span>Solicitações podem ser analisadas por status, bairro e prioridade.</span>
                </div>

                <div className="arca-floating-card three">
                  <strong>Atendimento orientado</strong>
                  <span>Fluxo claro para documentos, pendências e próximos passos.</span>
                </div>
              </div>
            </div>

            <div className="arca-container">
              <div className="arca-stats-band">
                <div className="arca-grid arca-grid-4">
                  {stats.map((item) => (
                      <div className="arca-stat-pill" key={item.number}>
                        <span className="arca-stat-number">{item.number}</span>
                        <span className="arca-stat-label">{item.label}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="arca-section-sm">
            <div className="arca-container">
              <div className="arca-section-heading center">
              <span className="arca-eyebrow">
                <BadgeCheck size={16} />
                Acesso rápido
              </span>

                <h2>O que você precisa fazer hoje?</h2>

                <p>
                  Escolha uma das opções abaixo para iniciar cadastro, solicitar
                  atendimento ou acompanhar uma solicitação já registrada.
                </p>
              </div>

              <div className="arca-grid arca-grid-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                      <Link
                          href={action.href}
                          className={`arca-card arca-delay-${index + 1}`}
                          key={action.title}
                      >
                    <span className="arca-card-icon">
                      <Icon size={25} />
                    </span>

                        <h3>{action.title}</h3>
                        <p>{action.description}</p>

                        <span className="arca-card-link">
                      Acessar
                      <ArrowRight size={17} />
                    </span>
                      </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="arca-section">
            <div className="arca-container">
              <div className="arca-section-heading">
              <span className="arca-eyebrow">
                <CalendarCheck size={16} />
                Jornada do atendimento
              </span>

                <h2>Um fluxo mais claro para tutores e equipe responsável.</h2>

                <p>
                  A plataforma foi pensada para reduzir dúvidas, organizar a
                  demanda e permitir que cada solicitação tenha uma etapa
                  identificável.
                </p>
              </div>

              <div className="arca-timeline">
                {steps.map((step, index) => (
                    <div
                        className={`arca-timeline-item arca-delay-${index + 1}`}
                        key={step.number}
                    >
                      <span className="arca-timeline-number">{step.number}</span>

                      <div className="arca-timeline-content">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          <section className="arca-section-sm">
            <div className="arca-container">
              <div className="arca-section-heading center">
              <span className="arca-eyebrow">
                <HeartPulse size={16} />
                Critérios de prioridade
              </span>

                <h2>Triagem com mais organização e transparência.</h2>

                <p>
                  A análise pode considerar vulnerabilidade social, proteção
                  animal, disponibilidade de vagas, documentação e fatores
                  relacionados à saúde pública.
                </p>
              </div>

              <div className="arca-grid arca-grid-3">
                {priorities.map((item, index) => {
                  const Icon = item.icon;

                  return (
                      <article
                          className={`arca-card arca-delay-${index + 1}`}
                          key={item.title}
                      >
                    <span className="arca-card-icon">
                      <Icon size={25} />
                    </span>

                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="arca-section-sm">
            <div className="arca-container">
              <div className="arca-highlight">
                <h2>Tenha seu protocolo em mãos para acompanhar a solicitação.</h2>

                <p>
                  Depois de preencher o cadastro ou solicitar um serviço, o
                  sistema gera um protocolo. Com ele, o tutor pode consultar o
                  andamento, verificar pendências e entender o próximo passo.
                </p>

                <Link href="/consulta" className="arca-btn arca-btn-secondary">
                  Consultar agora
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}