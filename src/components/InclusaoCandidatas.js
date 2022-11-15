import { useState } from "react";
import { inAxios } from "../config_axios";

const InclusaoCandidatas = () => {
  // declara as variáveis de estado (e os métodos para manipulá-las)
  const [nome, setNome] = useState("");
  const [clube, setClube] = useState("");
  const [hobby, setHobby] = useState("");
  const [idade, setIdade] = useState("");
  const [foto, setFoto] = useState(null);

  const enviarDados = async (e) => {
    e.preventDefault();

    // como deve ser enviado um arquivo também, deve ser desta forma
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("clube", clube);
    formData.append("idade", idade);
    formData.append("foto", foto);
    formData.append("admin_id", 1);

    try {
      const inc = await inAxios.post("candidatas", formData);
      alert(`Ok! Inserida com sucesso. Código: ${inc.data.id}`);
    } catch (erro) {
      alert(`Erro: ${erro}`);
    }
  };

  return (
    <form className="container" onSubmit={enviarDados}>
      <h2>Inclusão de Candidatas</h2>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome da Candidata:
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="clube" className="form-label">
          Clube que Representa:
        </label>
        <input
          type="text"
          className="form-control"
          id="clube"
          placeholder="Nome do clube"
          value={clube}
          onChange={(e) => setClube(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hobby" className="form-label">
          Hobby:
        </label>
        <input
          type="text"
          className="form-control"
          id="hobby"
          placeholder="Hobby da candidata"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          required
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="idade" className="form-label">
            Idade:
          </label>
          <input
            type="number"
            className="form-control"
            id="idade"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="foto" className="form-label">
            Foto:
          </label>
          <input
            type="file"
            className="form-control"
            id="foto"
            placeholder="Foto da candidata"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg px-5">
        Enviar
      </button>
      <button type="reset" className="btn btn-danger btn-lg px-5 ms-3">
        Limpar
      </button>
    </form>
  );
};

export default InclusaoCandidatas;
