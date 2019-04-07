import { api } from './api';

const getCase = async function(caseType) {
    const response = await api.get('/Case',{
        params: {caseType:caseType}
    })

    return response.data;
}

export default { 
    getCase
};