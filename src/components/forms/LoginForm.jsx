import Link from 'next/link';
import { LockKeyhole, Mail } from 'lucide-react';

export default function LoginForm() {
    return (
        <form>
            <div className="mb-3">
                <label className="form-label required d-flex align-items-center gap-2">
                    <Mail size={17} />
                    E-mail
                </label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Digite seu e-mail"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label required d-flex align-items-center gap-2">
                    <LockKeyhole size={17} />
                    Senha
                </label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Digite sua senha"
                    required
                />
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <Link href="#" className="arca-small-link text-decoration-none">
                    Esqueci a senha
                </Link>

                <button type="button" className="arca-primary-btn py-2 px-4">
                    Login
                </button>
            </div>
        </form>
    );
}