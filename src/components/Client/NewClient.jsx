import { use, useEffect, useState } from "react";
import './NewClient.scss';
import { addClient } from "../../services/clients";
import { filterLocalidades, filterProv } from "../../services/localidades";
import Swal from 'sweetalert2'

function NewClient() {
  const [identIva, setIdentIva] = useState('DNI');
  const [name, setName] = useState('');
  const [iva, setIva] = useState("consumidorFinal");
  const [ident, setIdent] = useState();
  const [city, setCity] = useState('Buenos Aires');
  const [dep, setDep] = useState();
  const [street, setStreet] = useState();
  const [nhome, setNhom] = useState('0');
  const [ndepto, setNdepto] = useState('0');
  const [cel, setCel] = useState();
  const [email, setEmail] = useState();
  const [loc, setLoc] = useState([]);
  const [prov, setProv] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated")
      return;
    }
    Swal.fire({
      title: 'Agregando cliente',
      text: 'por favor aguarde',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })
    try {
      const newClient = {
        id: "",
        name: name,
        ident: ident,
        iva: iva,
        city: city,
        locate: dep,
        street: street,
        nhome: nhome,
        dhome: ndepto,
        cel: cel,
        email: email,
      }
      const response = await addClient(newClient);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "cliente agregado con exito",
          text: `Cliente nuevo: ${response.name} ID: ${response.id}`,
          didOpen: () => Swal.hideLoading(),
          didClose: () => {
            resetForm(form);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear el cliente",
          text: `intente de nuevo mas tarde`,
          didOpen: () => Swal.hideLoading()
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el cliente",
        text: err.message,
        didOpen: () => Swal.hideLoading()

      });
    }
  };
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

  const resetForm = (form) => {
    setName('')
    setCel('')
    setStreet('')
    setCity('Buenos Aires')
    setEmail('')
    setIdent('')
    setIva('consumidorFinal')
    setNdepto('0')
    setNhom('0')
    form.classList.remove("was-validated")
  }

  useEffect(() => {
    setProv(filterProv())
    setLoc(filterLocalidades(city))
  }, [city])

  return (
    <section className="container-fluid newclient p-0">
      <article className="newclient__head px-3 pt-2">
        <h2 className="p-0 m-0">
          <i className="bi bi-person-plus me-2"></i>Nuevo Cliente
        </h2>
        <p>Formulario de alta de clientes</p>
      </article>
      <article className="p-3 mx-3 mb-3 newclient__form">
        <form className="row row-gap-2 align-items-start needs-validation" id="form" noValidate onSubmit={handleSubmit}>
          <div className="col-7">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Ingrese el nombre del cliente
            </div>
          </div>
          <div className="col-5">
            <label htmlFor="floatingSelect">Condicion de IVA</label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={iva}
              required
              onChange={(e) => {
                imputIdent(e.target.value)
                setIva(e.target.value)
              }}
            >
              <option value="consumidorFinal">Consumidor final</option>
              <option value="monotributo">Monotributo</option>
              <option value="exento">Exento</option>
              <option value="inscripto">Responsable Inscripto</option>
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="ident">Identificador</label>
            <input
              type="text"
              className="form-control"
              id="ident"
              value={ident}
              placeholder={identIva}
              pattern={identIva === "DNI" ? "[0-9]{7,8}" : "[0-9]{11}"}
              onChange={(e) => setIdent(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              No es un {identIva} valido
            </div>
          </div>
          <hr className="" />
          <p className="p-0 m-0">Domicilio</p>
          <div className="col-3">
            <label htmlFor="floatingSelect">Provincia</label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              required
              onChange={(e)=>setCity(e.target.value)}
            >
              {prov.map((l) => (<option key={l.index} value={l}>{l}</option>))}
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="floatingSelect">Localidad</label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              required
              onChange={(e)=>setDep(e.target.value)}
            >
              {loc.map((l) => (<option key={l.index} value={l}>{l}</option>))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="street">Calle</label>
            <input
              type="text"
              className="form-control"
              id="street"
              value={street}
              placeholder="Calle"
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="col-2">
            <label htmlFor="home">Casa N°</label>
            <input
              type="number"
              className="form-control"
              id="home"
              min='0'
              value={nhome}
              placeholder="home"
              onChange={(e) => setNhom(e.target.value)}
              required
            />
          </div>
          <div className="col-2">
            <label htmlFor="dep">Depto</label>
            <input
              type="number"
              min='0'
              className="form-control"
              id="dep"
              value={ndepto}
              placeholder="dep"
              onChange={(e) => setNdepto(e.target.value)}
              required
            />
          </div>
          <hr />
          <p className="p-0 m-0">Datos de contacto</p>
          <div className="col-3">
            <label htmlFor="tel">Celular</label>
            <input
              type="tel"
              value={cel}
              className="form-control"
              id="tel"
              placeholder="1112345678"
              pattern="[0-9]{2,4}\s+[0-9]{3,4}[-\s]?[0-9]{4}" 
              onChange={(e) => setCel(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              El numero ingresado no es valido
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="email"
              placeholder="usuario@dominio.com"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              El correo ingresado no coincide con el formado admitido
            </div>
          </div>
          <hr />
          <div className="mt-3 text-end">
            <button className="newclient__btnSubmit" type="button" onClick={(e)=>resetForm(e.target.closest("form"))}>Cancelar</button>
            <button className="newclient__btnSubmit" type="Submit">Nuevo</button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default NewClient;
