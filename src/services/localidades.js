import pais from '../data/pais.json'
const URL = 'https://infra.datos.gob.ar/georef/localidades_censales.json'
// const provincias = []

export const filterLocalidades = (filter) =>{
        const localidadesBA = pais.localidades_censales.filter(localidad => localidad.provincia.nombre === filter).map(localidad=>localidad.nombre);
        return localidadesBA.sort();
}

export const filterProv = () =>{
    const provinciasAll = pais.localidades_censales.map(prov => prov.provincia.nombre)
    const provincias = [... new Set(provinciasAll)]
    return provincias.sort();
}