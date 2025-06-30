import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as clienteService from "../../services/clienteService";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface ClienteForm {
  nome: string;
  nomeSocial: string;
  email: string | null;
  ddd: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

const CadastrarCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cliente, setCliente] = useState<ClienteForm>({
    nome: "",
    nomeSocial: "",
    email: null,
    ddd: "",
    telefone: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    codigoPostal: "",
    informacoesAdicionais: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Para email, se ficar vazio, setar null para bater com JSON
    setCliente((prev) => ({
      ...prev,
      [name]: name === "email" && value === "" ? null : value,
    }));
  };

  const next = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const back = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const limparCampos = () => {
    setStep(1);
    setCliente({
      nome: "",
      nomeSocial: "",
      email: null,
      ddd: "",
      telefone: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    });
    onHide();
  };

  const handleSalvar = async () => {
    const payload = {
      nome: cliente.nome,
      nomeSocial: cliente.nomeSocial,
      email: cliente.email,
      telefones: [
        {
          ddd: cliente.ddd,
          numero: cliente.telefone,
        },
      ],
      endereco: {
        rua: cliente.rua,
        numero: cliente.numero,
        bairro: cliente.bairro,
        cidade: cliente.cidade,
        estado: cliente.estado,
        codigoPostal: cliente.codigoPostal,
        informacoesAdicionais: cliente.informacoesAdicionais,
      },
    };

    try {
      await clienteService.cadastrarCliente(payload);
      alert("Cliente cadastrado com sucesso!");
      limparCampos();
    } catch (error: any) {
      console.error("Erro ao cadastrar cliente:", error.response || error.message || error);
      alert(`Erro ao cadastrar cliente: ${error.response?.data?.message || error.message || "Verifique os dados e tente novamente."}`);
    }
  };

  return (
    <Modal show={show} onHide={limparCampos} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Cadastro de Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {/* Passo 1: Nome, nome social e email */}
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome Social</Form.Label>
                <Form.Control
                  type="text"
                  name="nomeSocial"
                  value={cliente.nomeSocial}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={cliente.email || ""}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </Form.Group>
            </>
          )}

          {/* Passo 2: Telefones */}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>DDD</Form.Label>
                <Form.Control
                  type="text"
                  name="ddd"
                  value={cliente.ddd}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {/* Passo 3: Endereço */}
          {step === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  type="text"
                  name="rua"
                  value={cliente.rua}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  name="numero"
                  value={cliente.numero}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="bairro"
                  value={cliente.bairro}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={cliente.cidade}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={cliente.estado}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="codigoPostal"
                  value={cliente.codigoPostal}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Informações Adicionais</Form.Label>
                <Form.Control
                  type="text"
                  name="informacoesAdicionais"
                  value={cliente.informacoesAdicionais}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={back}
          >
            ⬅ Voltar
          </Button>
        )}
        {step < 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleSalvar}
          >
            📝 Cadastrar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CadastrarCliente;
