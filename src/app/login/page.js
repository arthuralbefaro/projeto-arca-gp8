'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import { authApi, ApiError } from '@/lib/api';
import { Lock, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        senha: '',
    });

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const data = await authApi.login(form.email, form.senha);
            authApi.saveToken(data.token);
            router.push('/admin/relatorios');
        } catch (error) {
            const message =
                error instanceof ApiError
                    ? error.message
                    : 'Erro ao conectar com o servidor. Verifique sua conexão.';
            setToast(message);
        } finally {
            setLoading(false);
        }
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

                        <h1>Acesso administrativo</h1>

                        <p>
                            Área restrita aos operadores do Programa ARCA.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <label>
                                E-mail
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => updateField('email', event.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </label>

                            <label>
                                Senha
                                <input
                                    type="password"
                                    value={form.senha}
                                    onChange={(event) => updateField('senha', event.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </label>

                            <button
                                type="submit"
                                className="arca-btn arca-btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Entrando...' : 'Entrar no painel'}
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
