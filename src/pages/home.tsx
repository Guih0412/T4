import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CadastrarCliente from "../components/cliente/cadastrarCliente";
import ListarClientes from "../components/cliente/listarCliente";
import AtualizarCliente from "../components/cliente/atualizarCliente";
import ExcluirCliente from "../components/cliente/excluirCliente";
import BuscarClientePorCPF from "../components/cliente/buscarClientePorCpf";


interface Props {
  tema: string;
}

export default function Home({ tema }: Props) {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalListagem, setMostrarModalListagem] = useState(false);
  const [mostrarModalAtualizacao, setMostrarModalAtualizacao] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [mostrarModalBuscaCPF, setMostrarModalBuscaCPF] = useState(false);

  const cardStyle = {
    borderColor: "#5c4033",
    backgroundColor: "rgb(255, 161, 106)",
    transition: "transform 0.2s",
    cursor: "pointer",
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  };

  return (
    <div className="container-fluid mt-5 text-center">
      <div className="d-flex align-items-center justify-content-center gap-3 title mt-5">
        <img src="/icone.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Pet Lovers -  Área de Clientes</h1>
      </div>

      <h4 className="subtitle mt-5">
        Seja bem-vindo à área de clientes da Pet Lovers!
      </h4>
      <hr className="line" />
      
      

      <div className="row justify-content-center">

        {/* Card - Cadastrar Cliente */}
        <div className="col-md-3 col-sm-12 mb-4">
          <div
            className="card shadow"
            style={cardStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Cadastro de Cliente
              </h5>
              <p className="card-text text-center subtitleCard">
                Informe corretamente os dados do cliente para realizar seu cadastro
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalCadastro(true)}
                >
                  📝 Cadastrar Cliente
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Cadastrar Cliente */}
        <CadastrarCliente
          show={mostrarModalCadastro}
          onHide={() => setMostrarModalCadastro(false)}
        />

        {/* Card - Listar Cliente */}
        <div className="col-md-3 col-sm-12 mb-4">
          <div
            className="card shadow"
            style={cardStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Listagem de Clientes
              </h5>
              <p className="card-text text-center subtitleCard">
                Confira a lista completa dos clientes cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalListagem(true)}
                >
                  📋 Listar Clientes
                </Button>

                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalBuscaCPF(true)}
                >
                  🔍 Buscar Cliente
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Listar Cliente */}
        <ListarClientes
          show={mostrarModalListagem}
          onHide={() => setMostrarModalListagem(false)}
        />

        {/* Modal - Buscar Cliente por CPF */}
        <BuscarClientePorCPF
          show={mostrarModalBuscaCPF}
          onHide={() => setMostrarModalBuscaCPF(false)}
        />
      </div>

      <div className="row justify-content-center">
        {/* Card - Atualizar Cliente */}
        <div className="col-md-3 col-sm-12 mb-4">
          <div
            className="card shadow"
            style={cardStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Atualização de Cliente
              </h5>
              <p className="card-text text-center subtitleCard">
                Edite os dados dos clientes já cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalAtualizacao(true)}
                >
                  🔄 Atualizar Cliente
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Atualizar Cliente */}
        <AtualizarCliente
          show={mostrarModalAtualizacao}
          onHide={() => setMostrarModalAtualizacao(false)}
        />

        {/* Card - Excluir Cliente */}
        <div className="col-md-3 col-sm-12 mb-4">
          <div
            className="card shadow"
            style={cardStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Exclusão de Cliente
              </h5>
              <p className="card-text text-center subtitleCard">
                Exclua um cliente do sistema de forma simples e rápida.
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalExclusao(true)}
                >
                  ❌ Excluir Cliente
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Excluir Cliente */}
        <ExcluirCliente
          show={mostrarModalExclusao}
          onHide={() => setMostrarModalExclusao(false)}
        />
      </div>
    </div>
  );
}
