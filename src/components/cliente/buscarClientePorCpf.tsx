import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as clienteService from "../../services/clienteService";

interface Props {
  show: boolean;
  onHide: () => void;
}

const BuscarClientePorID: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [idBusca, setIdBusca] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState<any>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdBusca(e.target.value);
  };

  const buscarCliente = async () => {
    try {
      const todos = await clienteService.listarClientes();
      const idNum = parseInt(idBusca);

      const encontrado = todos.find((c: any) => c.id === idNum);

      if (encontrado) {
        setClienteEncontrado(encontrado);
        setStep(2);
      } else {
        alert("Cliente não encontrado com este ID.");
      }
    } catch (error) {
      alert("Erro ao buscar cliente.");
      console.error(error);
    }
  };

  const voltar = () => {
    setStep(1);
    setIdBusca("");
    setClienteEncontrado(null);
  };

  const fechar = () => {
    voltar();
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Cliente por ID</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o ID do cliente</Form.Label>
            <Form.Control
              type="number"
              value={idBusca}
              onChange={handleChange}
              placeholder="ID"
            />
          </Form.Group>
        )}

        {step === 2 && clienteEncontrado && (
          <>
            <p><strong>ID:</strong> {clienteEncontrado.id}</p>
            <p><strong>Nome:</strong> {clienteEncontrado.nome}</p>
            <p><strong>Nome Social:</strong> {clienteEncontrado.nomeSocial}</p>
            <p><strong>Email:</strong> {clienteEncontrado.email ?? "Não informado"}</p>

            <p><strong>Endereço:</strong></p>
            <ul style={{ marginLeft: "1rem" }}>
              <p>Rua: {clienteEncontrado.endereco.rua}, Nº {clienteEncontrado.endereco.numero}</p>
              <p>Bairro: {clienteEncontrado.endereco.bairro}</p>
              <p>Cidade: {clienteEncontrado.endereco.cidade} - {clienteEncontrado.endereco.estado}</p>
              <p>CEP: {clienteEncontrado.endereco.codigoPostal}</p>
              <p>Informações Adicionais: {clienteEncontrado.endereco.informacoesAdicionais || "Nenhuma"}</p>
            </ul>

            <p><strong>Telefones:</strong></p>
            <ul style={{ marginLeft: "1rem" }}>
              {clienteEncontrado.telefones?.map((tel: any) => (
                <p key={tel.id}>{`(${tel.ddd}) ${tel.numero}`}</p>
              )) ?? <p>Não informado</p>}
            </ul>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={buscarCliente}
            disabled={!idBusca}
          >
            Buscar
          </Button>
        )}

        {step === 2 && (
          <Button
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={voltar}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={fechar}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarClientePorID;
