'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { setAdminAuth } from '@/lib/arca-storage';
import { Lock, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [toast, setToast] = useState('');
    const [form, setForm] = useState({
        email: 'admin@arca.serra.es.gov.br',
        password: 'admin123',
    });

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (form.email === 'admin@arca.serra.es.gov.br' && form.password === 'admin123') {
            setAdminAuth(true);
            router.push('/admin/relatorios');
            return;
        }

        setToast('E-mail ou senha inválidos.');
    }

    return (
        <div className="arca-page">
            <Header />
            <Toast message={toast} onClose={() => setToast('')} />

            <main className="arca-section">
                <div className="arca-container arca-auth-wrap">
                    <section className="arca-auth-card">
            <span className="arca-card-icon">
              <ShieldCheck size={25} />
            </span>

                        <h1>Acesso administrativo demo</h1>

                        <p>
                            Área demonstrativa para acompanhamento das solicitações do Programa ARCA.
                        </p>

                        <div className="arca-demo-credentials">
                            <strong>Credenciais de teste</strong>
                            <span>E-mail: admin@arca.serra.es.gov.br</span>
                            <span>Senha: admin123</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label>
                                E-mail
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => updateField('email', event.target.value)}
                                />
                            </label>

                            <label>
                                Senha
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(event) => updateField('password', event.target.value)}
                                />
                            </label>

                            <button type="submit" className="arca-btn arca-btn-primary">
                                Entrar no painel
                                <Lock size={18} />
                            </button>
                        </form>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}