import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CalendarCheck, ClipboardCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Cadastro',
    description:
        'O tutor informa dados pessoais, endereço, contato e perfil de solicitação.',
  },
  {
    number: '02',
    title: 'Solicitação',
    description:
        'O cidadão registra o serviço desejado, como castração ou orientação.',
  },
  {
    number: '03',
    title: 'Triagem',
    description:
        'A equipe avalia documentação, prioridade, disponibilidade e critérios do programa.',
  },
  {
    number: '04',
    title: 'Acompanhamento',
    description:
        'O tutor acompanha o andamento usando o protocolo gerado pelo sistema.',
  },
  {
    number: '05',
    title: 'Orientação',
    description:
        'Quando necessário, a equipe solicita documentos ou informa os próximos passos.',
  },
  {
    number: '06',
    title: 'Atendimento',
    description:
        'Com a solicitação aprovada, o tutor recebe orientação sobre o atendimento.',
  },
];

export default function ComoFuncionaPage() {
  return (
      <div className="arca-page">
        <Header />

        <main className="arca-section">
          <div className="arca-container">
            <div className="arca-section-heading">
            <span className="arca-eyebrow">
              <CalendarCheck size={16} />
              Como funciona
            </span>

              <h1>Entenda a jornada do atendimento.</h1>

              <p>
                O fluxo foi pensado para organizar a demanda, reduzir dúvidas e
                permitir acompanhamento por protocolo.
              </p>
            </div>

            <div className="arca-timeline">
              {steps.map((step) => (
                  <div className="arca-timeline-item" key={step.number}>
                    <span className="arca-timeline-number">{step.number}</span>

                    <div className="arca-timeline-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
              ))}
            </div>

            <section className="arca-highlight" style={{ marginTop: 40 }}>
              <h2>Comece pelo cadastro do tutor.</h2>

              <p>
                Após o cadastro, você poderá solicitar atendimento e acompanhar o
                status da solicitação.
              </p>

              <Link href="/registro" className="arca-btn arca-btn-secondary">
                Fazer cadastro
                <ArrowRight size={18} />
              </Link>
            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
}