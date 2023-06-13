import "../HomePage/home.css";
import logo from "../../assets/prueba.png";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";

export default function News() {
  return (
    <>
      <h2>Publicaciones</h2>
      <div className="search">
        <select>
          <option value="option1">Option 1nmdmkndfjknfr sdjkdfhjdfjidfgksdfjk sdjildfdfrhusdajnhdfjoinjadsdnjfhgujn</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
        <input />{" "}
        <button id="search-button">
          <label>Buscar</label>
          <img src={search}></img>
        </button>
      </div>
      <section className="grid-container">
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <div className="grid-item">
          <img src={logo} alt="Logo" />
          <label>
            Comunicado | Comité Electoral de la Universidad del Quindío | 10 de
            marzo
          </label>
        </div>
        <button id="create-event-button">
          <label>Crear publicación</label>
          <img src={plus} />
        </button>
      </section>
    </>
  );
}
