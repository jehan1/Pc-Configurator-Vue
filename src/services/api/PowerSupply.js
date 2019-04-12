import { api } from './api';

const getPowerSupplies = async function(sMolex, sVoltage) {
    const response = await api.get('/PowerSupply',{
        params: {
            sVoltage:sVoltage,
            sMolex:sMolex
        }
    })

    return response.data;
}

export default { 
    getPowerSupplies
};