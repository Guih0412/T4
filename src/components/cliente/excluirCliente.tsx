import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as clienteService from "../../services/clienteService";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const next = () => {
    if (!id || isNaN(parseInt(id))) {
      alert("Por favor, digite um ID válido.");
      return;
    }
    setStep(2);
  };

  const back = () => {
    setStep(1);
    setId("");
    onHide();
  };

  const handleConfirm = async () => {
    try {
      const idNum = parseInt(id);
      const resposta = await clienteService.excluirCliente(idNum);
      if (resposta.ok) {
        alert("Cliente excluído com sucesso!");
        back();
      } else {
        alert("Falha ao excluir cliente.");
      }
    } catch (error) {
      alert("Erro ao excluir cliente.");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={back} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Excluir Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do cliente a ser excluído</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="ID do cliente"
              />
            </Form.Group>
          </Form>
        )}

        {step === 2 && (
          <p>
            Tem certeza que deseja excluir o cliente com ID {id}?<br />
            Essa ação não poderá ser desfeita.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={() => setStep(1)}
          >
            ⬅ Voltar
          </Button>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleConfirm}
          >
            🗑️ Excluir
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirCliente;
