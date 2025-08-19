import { useState } from "react";

function NewClient() {
    const [identIva, setIdentIva] = useState('DNI');
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    console.log(name);
    e.preventDefault();
    };
    const imputIdent = (e) => {
      switch (e) {
        case "consumidorFinal":
        case "noDeclarado":
          setIdentIva("DNI");
          break;
        case "monotributo":
        case "exento":
          setIdentIva("CUIT");
          break;
        default:
          setIdentIva("DNI"); // fallback por si llega algo inesperado
          break;
      }
    };

  return (
    <section className="container-fluid p-3">
      <article className="newclient__head">
        <h2 className="p-0 m-0">
          <i className="bi bi-person-plus me-2"></i>Nuevo Cliente
        </h2>
              <p>Formulario de alta de clientes</p>
      </article>
      <article className="">
        <form className="row" onSubmit={handleSubmit}>
          <div className="form-floating col-7">
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div class="form-floating mb-3 col-5">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) => imputIdent(e.target.value)}
            >
              <option selected value="consumidorFinal">
                Consumidor final
              </option>
              <option value="monotributo">Monotributo</option>
              <option value="exento">Exento</option>
              <option value="noDeclarado">no declarado</option>
            </select>
            <label htmlFor="floatingSelect">Condicion de IVA</label>
          </div>
          <div className="form-floating col-3">
            <input
              type="text"
              className="form-control"
              id="ident"
              placeholder="identificador"
              pattern={identIva === "DNI" ? "[0-9]{7,8}" : "[0-9]{11}"}
              //   onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="ident">{identIva} solo numeros</label>
                  </div>
                  <div className="mt-3">
                      <button type="submit">enviar</button>
                  </div>
        </form>
      </article>
    </section>
  );
}

export default NewClient;
