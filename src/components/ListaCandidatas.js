import { inAxios, webServiceURL } from "../config_axios";
import { useState, useEffect } from "react";

import "./ListaCandidatas.css";

const ListaCandidatas = () => {
  // declara a variável de estado e o método que irá atualizá-la
  const [candidatas, setCandidatas] = useState([]);

  const obterCandidatas = async () => {
    // obtém do Web Service a lista das candidatas cadastradas
    const lista = await inAxios.get("candidatas");

    // atualiza a variável de estado
    setCandidatas(lista.data);
  };

  // chama o método ao carregar o componente
  useEffect(() => {
    obterCandidatas();
  }, []);

  const excluir = async (id, nome) => {
    if (!window.confirm(`Confirma a exclusão da candidata "${nome}"?`)) {
      return;
    }
    try {
      await inAxios.delete(`candidatas/${id}`);
      setCandidatas(candidatas.filter((cand) => cand.id !== id));
    } catch (error) {
      alert(`Erro... Não foi possível excluir esta candidata: ${error}`);
    }
  };

  const alterar = async (id, nome, clube, idade, index) => {
    const novoNome = prompt(`Qual o nome correto da candidata "${nome}"?`);
    if (novoNome === null || novoNome === "") {
      return;
    }
    try {
      await inAxios.put(`candidatas/${id}`, { nome: novoNome, clube, idade });
      const candsAlteracao = [...candidatas];
      candsAlteracao[index].nome = novoNome;
      setCandidatas(candsAlteracao);
    } catch (error) {
      alert(`Erro... Não foi possível alterar o nome: ${error}`);
    }
  };

  return (
    <div className="container">
      <h2>Lista das Candidatas Inscritas no Concurso</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Clube</th>
            <th>Idade</th>
            <th>Votos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatas.map((cand, index) => (
            <tr>
              <td>
                <img
                  src={webServiceURL + cand.foto}
                  alt={cand.nome}
                  className="img-cand"
                />
              </td>
              <td>{cand.nome}</td>
              <td>{cand.clube}</td>
              <td>{cand.idade} anos</td>
              <td>{cand.votos} votos</td>
              <td className="text-center">
                <h4>
                  <i
                    class="bi bi-pencil-square text-success"
                    onClick={() =>
                      alterar(cand.id, cand.nome, cand.clube, cand.idade, index)
                    }
                  ></i>
                  &ensp;
                  <i
                    className="bi bi-person-dash-fill text-danger"
                    onClick={() => excluir(cand.id, cand.nome)}
                  ></i>
                </h4>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCandidatas;
