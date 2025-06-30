import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as clienteService from "../../services/clienteService";

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: {
    id: number;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
  telefones: {
    id: number;
    ddd: string;
    numero: string;
  }[];
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarClientes: React.FC<Props> = ({ show, onHide }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 1;

  useEffect(() => {
    if (show) {
      clienteService.listarClientes()
        .then((data) => {
          console.log("Dados recebidos do backend:", data);
          setClientes(data as Cliente[]);
          setPaginaAtual(1);
        })
        .catch((error) => {
          console.error("Erro ao carregar clientes:", error);
          setClientes([]);
        });
    }
  }, [show]);

  const totalPages = Math.ceil(clientes.length / clientesPorPagina);
  const start = (paginaAtual - 1) * clientesPorPagina;
  const end = start + clientesPorPagina;
  const clientesPagina = clientes.slice(start, end);

  const next = () => setPaginaAtual((prev) => (prev < totalPages ? prev + 1 : prev));
  const back = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {clientesPagina.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          clientesPagina.map((cliente) => (
            <div
              key={cliente.id}
              style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}
            >
              <p><strong>ID:</strong> {cliente.id}</p>
              <p><strong>Nome:</strong> {cliente.nome}</p>
              <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
              <p><strong>Email:</strong> {cliente.email ?? "Não informado"}</p>
              <p><strong>Endereço:</strong></p>
              <ul>
                <p>Rua: {cliente.endereco.rua}, Nº {cliente.endereco.numero}</p>
                <p>Bairro: {cliente.endereco.bairro}</p>
                <p>Cidade: {cliente.endereco.cidade} - {cliente.endereco.estado}</p>
                <p>CEP: {cliente.endereco.codigoPostal}</p>
              </ul>
              <p><strong>Informações Adicionais:</strong> {cliente.endereco.informacoesAdicionais}</p>
              <p><strong>Telefone(s):</strong></p>
              <ul>
                {cliente.telefones.map((tel) => (
                  <p key={tel.id}>{`(${tel.ddd}) ${tel.numero}`}</p>
                ))}
              </ul>
            </div>
          ))
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        <Button
          onClick={back}
          disabled={paginaAtual === 1}
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
        >
          ⬅ Voltar
        </Button>
        <span style={{ color: "#451F17", margin: "0 1rem" }}>
          Página {paginaAtual} de {totalPages}
        </span>
        <Button
          onClick={next}
          disabled={paginaAtual === totalPages || totalPages === 0}
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListarClientes;
