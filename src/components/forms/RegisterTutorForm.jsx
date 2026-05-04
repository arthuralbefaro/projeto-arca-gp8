import Link from 'next/link';
import FormInput from '@/components/ui/FormInput';
import { bairrosSerra, tiposSolicitante } from '@/lib/constants';

export default function RegisterTutorForm() {
    return (
        <form>
            <div className="row">
                <div className="col-md-8">
                    <FormInput
                        label="Nome completo"
                        name="nomeCompleto"
                        placeholder="Ex.: Maria Silva"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <FormInput
                        label="CPF"
                        name="cpf"
                        placeholder="Somente números"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <FormInput
                        label="Data de nascimento"
                        name="dataNascimento"
                        type="date"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <FormInput
                        label="Telefone/WhatsApp"
                        name="telefone"
                        placeholder="(27) 99999-9999"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <FormInput
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="seuemail@email.com"
                        required
                    />
                </div>

                <div className="col-md-8">
                    <FormInput
                        label="Endereço"
                        name="endereco"
                        placeholder="Rua, número e complemento"
                        required
                    />
                </div>

                <div className="col-md-4">
                    <FormInput
                        label="Bairro"
                        name="bairro"
                        as="select"
                        required
                    >
                        <option value="">Selecione o bairro</option>
                        {bairrosSerra.map((bairro) => (
                            <option key={bairro} value={bairro}>
                                {bairro}
                            </option>
                        ))}
                    </FormInput>
                </div>

                <div className="col-md-6">
                    <FormInput
                        label="Tipo de solicitante"
                        name="tipoSolicitante"
                        as="select"
                        required
                    >
                        <option value="">Selecione</option>
                        {tiposSolicitante.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>
                                {tipo.label}
                            </option>
                        ))}
                    </FormInput>
                </div>

                <div className="col-md-6">
                    <FormInput
                        label="NIS"
                        name="nis"
                        placeholder="Informe se possuir"
                    />
                </div>

                <div className="col-md-6">
                    <FormInput
                        label="Senha"
                        name="senha"
                        type="password"
                        placeholder="Crie uma senha"
                        required
                    />
                </div>

                <div className="col-md-6">
                    <FormInput
                        label="Confirmar senha"
                        name="confirmarSenha"
                        type="password"
                        placeholder="Repita a senha"
                        required
                    />
                </div>
            </div>

            <div className="p-3 rounded-4 mb-4" style={{ background: 'var(--arca-green-soft)' }}>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="termoCadastro"
                        required
                    />

                    <label className="form-check-label" htmlFor="termoCadastro">
                        Declaro que as informações preenchidas são verdadeiras e estou ciente
                        de que o cadastro poderá passar por triagem antes da aprovação.
                    </label>
                </div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
                <Link href="/login" className="arca-small-link text-decoration-none">
                    Já possui cadastro? Entrar
                </Link>

                <button type="button" className="arca-primary-btn px-5">
                    Criar cadastro
                </button>
            </div>
        </form>
    );
}