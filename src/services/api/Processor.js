import { api } from './api';

const getProcessors = async function(id) {
    const response = await api.get('/Processor',{
        params: {id:id}
    })

    return response.data;
}

export default { 
    getProcessors
};