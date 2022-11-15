import { inAxios } from "../config_axios";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Nº Candidatas por Cidade"
};

const GerenciaCandidatas = () => {
  // declara a variável de estado e o método que irá atualizá-la
  const [gerais, setGerais] = useState(0);
  const [total, setTotal] = useState(0);
  const [votos, setVotos] = useState([]);
  const [cidades, setCidades] = useState([]);

  const obterDados = async () => {
    // obtém do Web Service dados gerais das candidatas
    const dadosGerais = await inAxios.get("candidatas/dados_gerais");
    const dadosTotais = await inAxios.get("candidatas/total_votos");
    const dadosVotos = await inAxios.get("candidatas/premiadas");
    const dadosCidades = await inAxios.get("candidatas/cidades");

    // atualiza a variável de estado
    setGerais(dadosGerais.data);
    setTotal(dadosTotais.data);

    // conforme a documentação do exemplo de gráfico
    // define as colunas de título
    const data = [["Candidata", "Votos", { role: "style" }]];

    const data2 = [["Cidade", "NºCandidatas"]];

    const cores = ["#D02090", "#32CD32", "#4169E1", "#D2691E", "#00CED1"];

    // acrescenta os dados "propriamente ditos" do gráfico
    dadosVotos.data.map((voto, i) =>
      data.push([voto.nome, voto.votos, cores[i]])
    );

    // acrescenta os dados "propriamente ditos" do gráfico
    dadosCidades.data.map((cidade) => data2.push([cidade.cidade, cidade.num]));

    // atualiza a variável de estado
    setVotos(data);
    setCidades(data2);
  };

  // chama o método ao carregar o componente
  useEffect(() => {
    obterDados();
  }, []);

  return (
    <div className="container">
      <h2 className="my-3">Dados Gerenciais do Sistema</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-primary fs-2 fw-bold p-3 my-2">
                {gerais.num}
              </span>
            </div>
            <h5 className="my-4">Nº Candidatas Inscritas</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-primary fs-2 fw-bold p-3 my-2">
                {gerais.media}
              </span>
            </div>
            <h5 className="my-4">Média das Idades</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-primary fs-2 fw-bold p-3 my-2">
                {total.total}
              </span>
            </div>
            <h5 className="my-4">Total de Votos</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-primary fs-2 fw-bold p-3 my-2">
                {total.maior}
              </span>
            </div>
            <h5 className="my-4">Nº Votos da Rainha</h5>
          </div>
        </div>
      </div>

      <h4 className="mt-5 ms-5">5 candidatas mais votadas</h4>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={votos} />

      <Chart
        chartType="PieChart"
        data={cidades}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default GerenciaCandidatas;
