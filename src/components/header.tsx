import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
  tema: string;
  botoes: string[];
  seletorView: (view: string) => void;
};

export default function Header(props: Props) {
  const gerarListaBotoes = () => {
    if (props.botoes.length <= 0) {
      return <></>;
    } else {
      return props.botoes.map((valor) => (
        <li key={valor} className="nav-item">
          <button
            className="nav-link btn btn-link"
            onClick={() => props.seletorView(valor)}
            style={{ textTransform: "capitalize" }}
          >
            {valor}
          </button>
        </li>
      ));
    }
  };

  const tema = props.tema;

  return (
    <nav
      className="navbar navbar-expand-lg"
      data-bs-theme="light"
      style={{ backgroundColor: tema, marginBottom: 10 }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex w-100 justify-content-between ">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn mx-1 d-flex align-items-center gap-3"
                  onClick={() => props.seletorView("Home")}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                  }}
                >
                  <img
                    src="/icone.png"
                    alt="Home"
                    style={{ height: "40px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />

                  <span className="title" style={{ fontSize: "30px" }}>
                    Pet Lovers
                  </span>
                </button>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {props.botoes
                .filter((b) => b !== "Home")
                .map((valor) => (
                  <li key={valor} className="nav-item mx-1 ">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => props.seletorView(valor)}
                      style={{
                        color: "white",
                        backgroundColor: "rgb(72, 40, 33)",
                        border: "1px solid rgb(70, 23, 3)",
                        borderRadius: "5px",
                        padding: "0.375rem 0.75rem",
                        marginRight: "10px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "rgb(46, 16, 8)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "rgb(69,32,23)")
                      }
                    >
                      {valor}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
