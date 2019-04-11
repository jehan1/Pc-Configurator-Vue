import { api } from './api';

const getMports = async function(mPortId) {
    const response = await api.get('/StorageDriveMdrive',{
        params: {mPortId:mPortId}
    })

    return response.data;
}

export default { 
    getMports
}