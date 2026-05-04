import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
    title: 'Login | Programa ARCA',
};

export default function LoginPage() {
    return (
        <div className="arca-page">
            <Header />

            <main className="arca-auth-wrapper">
                <div className="arca-container">
                    <div className="arca-login-card">
                        <h1 className="arca-auth-title h3 mb-2">Login</h1>

                        <p className="text-muted mb-4">
                            Acesse sua conta para acompanhar o cadastro e futuras solicitações.
                        </p>

                        <LoginForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}