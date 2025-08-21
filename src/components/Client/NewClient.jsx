import { use, useEffect, useState } from "react";
import { useClientForm } from "../../hook/useClientForm";
import './NewClient.scss';
import { addClient } from "../../services/clients";
import { filterLocalidades, filterProv } from "../../services/localidades";
import Swal from 'sweetalert2'

function NewClient() {
  const { values, error, handleChange, validate, resetForm } = useClientForm({
    name: '',
    cIva: '',
    ident: '',
    provincia: '',
    street: '',
    home: '',
    depto: '',
    tel: '',
    email: ''
  });
  const [loc, setLoc] = useState([]);
  const [prov, setProv] = useState([])
  const [identIva, setIdentIva] = useState()
  const [iva, setIva] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("datos validos", values);
    if (validate()) {
      console.log("datos validos 2", values);
      // resetForm
    } else { 
      const form = e.target
      form.classList.add('was-validated')
    }
  }
  const imputIdent = (e) => {
    switch (e) {
      case "consumidorFinal":
      case "noDeclarado":
        setIdentIva("DNI");
        break;
      case "monotributo":
      case "exento":
      case "inscripto":
        setIdentIva("CUIT");
        break;
      default:
        setIdentIva("DNI"); // fallback por si llega algo inesperado
        break;
    }
  };

  useEffect(() => {
    setProv(filterProv())
  }, [])

  return (
    <section className="container-fluid newclient p-0">
      <article className="p-3 mx-3 mb-3 newclient__form">
        <form
          className="row row-gap-2 align-items-start needs-validation"
          id="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-7">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre"
              required
              onChange={handleChange}
            />
            <div className="invalid-feedback">{error.name}</div>
          </div>
          <div className="col-5">
            <label htmlFor="cIva">Condicion de IVA</label>
            <select
              className="form-select"
              id="cIva"
              aria-label="Floating label select example"
              required
              onChange={(e) => {
                handleChange(e);
                imputIdent(e.target.value);
                setIva(true);
              }}
            >
              <option disabled selected value=""></option>
              <option value="consumidorFinal">Consumidor final</option>
              <option value="monotributo">Monotributo</option>
              <option value="exento">Exento</option>
              <option value="inscripto">Responsable Inscripto</option>
            </select>
            <div className="invalid-feedback">{error.cIva}</div>
          </div>
          <div className="col-3">
            <label htmlFor="ident">Identificador</label>
            <input
              type="text"
              className="form-control"
              id="ident"
              onChange={handleChange}
              pattern={identIva === "DNI" ? "[0-9]{7,8}" : "[0-9]{11}"}
              placeholder={identIva}
              required
              disabled={!iva}
            />
            <div className="invalid-feedback">{error.ident}</div>
          </div>
          <hr className="" />
          <p className="p-0 m-0">Domicilio</p>
          <div className="col-3">
            <label htmlFor="provincia">Provincia</label>
            <select
              className="form-select"
              id="provincia"
              aria-label="Floating label select example"
              required
              onChange={handleChange}
            >
              {prov.map((l) => (
                <option key={l.index} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="localidad">Localidad</label>
            <select
              className="form-select"
              id="localidad"
              aria-label="Floating label select example"
              required
              onChange={handleChange}
            >
              {loc.map((l) => (
                <option key={l.index} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="street">Calle</label>
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Calle"
              required
              onChange={handleChange}
            />
            <div className="invalid-feedback">{error.street}</div>
          </div>
          <div className="col-2">
            <label htmlFor="home">Casa N°</label>
            <input
              type="number"
              className="form-control"
              id="home"
              min="0"
              placeholder="0"
              onChange={handleChange}
            />
          </div>
          <div className="col-2">
            <label htmlFor="depto">Depto</label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="depto"
              placeholder="0"
              onChange={handleChange}
            />
          </div>
          <hr />
          <p className="p-0 m-0">Datos de contacto</p>
          <div className="col-3">
            <label htmlFor="tel">Celular</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              placeholder="1112345678"
              inputMgiode='numeric'
              autoComplete="tel"
              required
              pattern="[0-9]{8,12}"
              onChange={handleChange}
            />
            <div className="invalid-feedback">{error.tel}</div>
          </div>
          <div className="col-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="usuario@dominio.com"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              onChange={handleChange}
            />
            <div className="invalid-feedback">{error.email}</div>
          </div>
          <hr />
          <div className="mt-3 text-end">
            <button
              className="newclient__btnSubmit"
              type="button"
              onClick={(e) => resetForm(e.target.closest("form"))}
            >
              Cancelar
            </button>
            <button className="newclient__btnSubmit" type="Submit">
              Nuevo
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default NewClient;
