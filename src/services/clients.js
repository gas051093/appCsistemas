const URL = "https://683911776561b8d882aef082.mockapi.io/api/v1/clients";

export const getClient = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err)
        return err;
    }

}

export const addClient = async (client) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
        if(!response.ok){
            throw new Error('Error en la respuesta del sevidor API')
        } else {
            const data = await response.json();
            return data
        }
    } catch (err) {
        console.error(err)
        throw err;
    }
}
