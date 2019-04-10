import { api } from './api';

const getMonitors = async function(vPort) {
    const response = await api.get('/Monitors',{
        params: {vPort:vPort}
    })

    return response.data;
}

export default { 
    getMonitors
};