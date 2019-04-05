import { api } from './api';

const getAllMotherboards = async function() {
    const response = await api.get('/Motherboard')

    return response.data;
}

export default { 
    getAllMotherboards
};