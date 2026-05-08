"use client"

import { useState } from "react";
import FormInput from "../ui/FormInput";
import FormSection from "../ui/FormSection";
import AlertBox from "../ui/AlertBox";

export default function CastracaoForm() {
    const [message, setMessage] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const cpf = String(formData.get("cpf") || "").trim();
        const telefone = String(formData.get("telefone") || "").trim();
        const termo = formData.get("termo");

        if (cpf.length !== 11) {
            setMessage({
                type: "warning",
                title: "CPF inválido",
                text: "Informe o CPF com 11 números, sem pontos ou traços.",
            });
            return;
        }

        if (telefone.length < 10) {
            setMessage({
                type: "warning",
                title: "Telefone inválido",
                text: "Informe um telefone válido para contato da equipe responsável.",
            });
            return;
        }

        if (!termo) {
            setMessage({
                type: "warning",
                title: "Confirmação obrigatória",
                text: "Confirme que leu as informações antes de envuiar.",
            })
            return;
        }

        setMessage({
            type: "success",
            title: "Formulário validado",
            text: "Os dados foram preenchidos corretamente. (ainda tá sem backend",
        });
    }

    return (
    <form onSubmit={handleSubmit} noValidate>
      {message && (
        <div className="mb-4">
          <AlertBox type={message.type} title={message.title}>
            {message.text}
          </AlertBox>
        </div>
      )}

      <FormSection
        title="Dados do tutor"
        description="Informe os dados do responsável pelo animal."
      >
        <div className="row">
          <div className="col-md-8">
            <FormInput
              label="Nome completo"
              name="nomeTutor"
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
              helper="Digite apenas os 11 números do CPF."
            />
          </div>

          <div className="col-md-6">
            <FormInput
              label="Telefone/WhatsApp"
              name="telefone"
              placeholder="(27) 99999-9999"
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="seuemail@email.com"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Dados do animal"
        description="Informe as características principais do cão ou gato."
      >
        <div className="row">
          <div className="col-md-6">
            <FormInput
              label="Nome do animal"
              name="nomeAnimal"
              placeholder="Ex.: Mel"
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput label="Espécie" name="especie" as="select" required>
              <option value="">Selecione</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </FormInput>
          </div>

          <div className="col-md-4">
            <FormInput
              label="Raça"
              name="raca"
              placeholder="Ex.: SRD"
              required
            />
          </div>

          <div className="col-md-4">
            <FormInput label="Sexo" name="sexo" as="select" required>
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </FormInput>
          </div>

          <div className="col-md-4">
            <FormInput label="Porte" name="porte" as="select" required>
              <option value="">Selecione</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </FormInput>
          </div>

          <div className="col-md-6">
            <FormInput
              label="Idade aproximada"
              name="idade"
              placeholder="Ex.: 2 anos"
              required
            />
          </div>

          <div className="col-md-6">
            <FormInput
              label="Bairro ou localização"
              name="localizacao"
              placeholder="Ex.: Laranjeiras"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Informações de saúde"
        description="Esses dados ajudam a equipe a avaliar a solicitação."
      >
        <div className="row">
          <div className="col-md-4">
            <FormInput label="Vacinado contra raiva?" name="vacinado" as="select" required>
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </FormInput>
          </div>

          <div className="col-md-4">
            <FormInput label="Possui alguma doença?" name="doenca" as="select" required>
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </FormInput>
          </div>

          <div className="col-md-4">
            <FormInput label="Está gestante ou no cio?" name="gestanteOuCio" as="select" required>
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
              <option value="Não se aplica">Não se aplica</option>
            </FormInput>
          </div>

          <div className="col-12">
            <label htmlFor="observacoes" className="form-label">
              Observações
            </label>

            <textarea
              id="observacoes"
              name="observacoes"
              className="form-control"
              rows="4"
              placeholder="Informe detalhes importantes sobre o animal."
            />
          </div>
        </div>
      </FormSection>

      <div className="p-3 rounded-4 mb-4" style={{ background: 'var(--arca-green-soft)' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="termo"
            name="termo"
          />

          <label className="form-check-label" htmlFor="termo">
            Declaro que li as informações e estou ciente de que a solicitação passará por triagem.
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="arca-primary-btn px-5">
          Enviar solicitação
        </button>
      </div>
    </form>
  );
}