import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterTutorForm from '@/components/forms/RegisterTutorForm';

export const metadata = {
    title: 'Registro de Tutor | Programa ARCA',
};

export default function RegisterPage() {
    return (
        <div className="arca-page">
            <Header />

            <main className="py-5">
                <div className="arca-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="mb-4 text-center">
                                <h1 className="arca-section-title">
                                    Registro do Tutor
                                </h1>

                                <p className="arca-section-subtitle mx-auto">
                                    Preencha seus dados para criar o cadastro no Programa ARCA.
                                    O backend em Java será responsável por validar e salvar essas informações futuramente.
                                </p>
                            </div>

                            <div className="arca-register-card">
                                <RegisterTutorForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}