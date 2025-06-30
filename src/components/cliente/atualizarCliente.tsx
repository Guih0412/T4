import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as clienteService from "../../services/clienteService";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
  telefones: {
    id: number;
    ddd: string;
    numero: string;
  }[];
}

const AtualizarCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [idBusca, setIdBusca] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const handleChangeIdBusca = (e: ChangeEvent<HTMLInputElement>) => {
    setIdBusca(e.target.value);
  };

  // Atualiza campos do cliente (para qualquer passo)
  const handleChangeCliente = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!cliente) return;

    const { name, value } = e.target;

    // Tratamento para campos aninhados (ex: endereco)
    if (name.startsWith("endereco.")) {
      const campoEndereco = name.split(".")[1];
      setCliente({
        ...cliente,
        endereco: {
          ...cliente.endereco,
          [campoEndereco]: value,
        },
      });
    } else if (name.startsWith("telefone.")) {
      // Se quiser editar telefones, precisaria índice ou só o primeiro
      // Aqui vamos editar só o primeiro telefone para simplificar
      const campoTelefone = name.split(".")[1];
      if (cliente.telefones.length > 0) {
        const telefonesAtualizados = [...cliente.telefones];
        telefonesAtualizados[0] = {
          ...telefonesAtualizados[0],
          [campoTelefone]: value,
        };
        setCliente({ ...cliente, telefones: telefonesAtualizados });
      }
    } else {
      // Campos diretos do cliente
      setCliente({
        ...cliente,
        [name]: value,
      });
    }
  };

  // Busca cliente por ID e preenche dados
  const buscarCliente = async () => {
    const idNum = parseInt(idBusca);
    if (isNaN(idNum)) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const clienteBuscado = await clienteService.buscarCliente(idNum);
      if (clienteBuscado && clienteBuscado.id) {
        setCliente(clienteBuscado);
        setStep(2);
      } else {
        alert("Cliente não encontrado com este ID.");
      }
    } catch (error) {
      alert("Erro ao buscar cliente.");
      console.error(error);
    }
  };

  // Envia a atualização para o backend
  const handleAtualizar = async () => {
    if (!cliente) return;

    try {
      const response = await clienteService.atualizarCliente(cliente);
      if (response.ok) {
        alert("Cliente atualizado com sucesso!");
        limparForm();
        onHide();
      } else {
        alert("Falha ao atualizar cliente.");
      }
    } catch (error) {
      alert("Erro ao atualizar cliente.");
      console.error(error);
    }
  };

  const limparForm = () => {
    setStep(1);
    setIdBusca("");
    setCliente(null);
  };

  const voltar = () => {
    if (step === 2) {
      limparForm();
    } else if (step > 2) {
      setStep(step - 1);
    }
  };

  const avancar = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const fechar = () => {
    limparForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Atualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o ID do cliente a ser atualizado</Form.Label>
            <Form.Control
              type="number"
              value={idBusca}
              onChange={handleChangeIdBusca}
              placeholder="ID"
            />
          </Form.Group>
        )}

        {step === 2 && cliente && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={cliente.nome}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nome Social</Form.Label>
              <Form.Control
                type="text"
                name="nomeSocial"
                value={cliente.nomeSocial}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={cliente.email ?? ""}
                onChange={handleChangeCliente}
              />
            </Form.Group>
          </>
        )}

        {step === 3 && cliente && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>DDD</Form.Label>
              <Form.Control
                type="text"
                name="telefone.ddd"
                value={cliente.telefones[0]?.ddd || ""}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone.numero"
                value={cliente.telefones[0]?.numero || ""}
                onChange={handleChangeCliente}
              />
            </Form.Group>
          </>
        )}

        {step === 4 && cliente && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                name="endereco.rua"
                value={cliente.endereco.rua}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="endereco.numero"
                value={cliente.endereco.numero}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="endereco.bairro"
                value={cliente.endereco.bairro}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="endereco.cidade"
                value={cliente.endereco.cidade}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="endereco.estado"
                value={cliente.endereco.estado}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="endereco.codigoPostal"
                value={cliente.endereco.codigoPostal}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Informações Adicionais</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="endereco.informacoesAdicionais"
                value={cliente.endereco.informacoesAdicionais}
                onChange={handleChangeCliente}
              />
            </Form.Group>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={voltar}
          >
            ⬅ Voltar
          </Button>
        )}
        {step < 4 && step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={avancar}
          >
            Próximo ➡
          </Button>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={buscarCliente}
            disabled={!idBusca}
          >
            Buscar
          </Button>
        )}
        {step === 4 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleAtualizar}
          >
            🔄 Atualizar
          </Button>
        )}
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)", marginLeft: "auto" }}
          onClick={fechar}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AtualizarCliente;
