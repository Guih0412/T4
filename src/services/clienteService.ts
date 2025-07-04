async function buscarInfo(rota: string) {
    try {
        const url = `http://localhost:32831${rota}`
        const resposta = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        const dados = await resposta.json();
        return dados;

    } catch (e) {
        return {
            error: e,
        }
    }
}

export async function listarClientes() {
    return buscarInfo("/cliente/clientes");
}

export async function buscarCliente(id: number) {
    return buscarInfo(`/cliente/${id}`);
}

export async function cadastrarCliente(cliente: any) {
    try {
        const url = `http://localhost:32831/cliente/cadastrar`
        const resposta = await fetch(url.toString(), {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(cliente)
        });

        return resposta;

    } catch (e) {
        return {
            error: e,
        }
    }
}


export async function excluirCliente(id: number): Promise<Response> {
    const excluirCliente = {
        id: id
    };

    const response = await fetch('http://localhost:32831/cliente/excluir', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(excluirCliente)
    });

    return response;
}


export async function atualizarCliente(atualizarCliente: any): Promise<Response> {
    const response = await fetch('http://localhost:32831/cliente/atualizar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizarCliente)
    });

    return response;
}