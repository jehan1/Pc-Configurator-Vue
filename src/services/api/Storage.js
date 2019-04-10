import { api } from './api';

const getStorageDrive = async function() {
    const response = await api.get('/StorageDrive')

    return response.data;
}

export default { 
    getStorageDrive
}