export const validationsClient = (values) => {
  const error = {};
  if (!values.name) error.name = "El nombre es obligatorio";
  if (!values.cIva) error.cIva = "Selecciones la condicion del IVA del cliente";
  if (!values.ident) {
    error.ident = "El campo identificador es obligatorio";
  } else {
    let regex;
    if (values.cIva === "consumidorFinal") {
      regex = /^[0-9]{7,8}$/;
    } else {
      regex = /^[0-9]{11}$/;
    }

    if (!regex.test(values.ident)) {
      error.ident = `El ${
        values.cIva === "consumidorFinal" ? "DNI" : "CUIT"
      } ingresado no es válido`;
    }
  }
  if (!values.street) error.street = "Este campo es obligatorio";
  if (!values.tel) {
    error.tel = "Ingrese un numero de celular sin el 0, ni el 15";
  } else {
    const regexTel = /^[0-9]{8,12}$/;
    if (!regexTel.test(values.tel)) {
      error.tel = "el numero ingresado no es valido";
    }
  }
  if (!values.email) {
    error.email = "Por favor ingrese un correo electronico";
  } else {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(values.email)) {
      error.email = "Ingrese un email valido debe contener usuario@dominio";
    }
  }
  return error;
};
