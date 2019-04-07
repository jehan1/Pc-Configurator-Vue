import { api } from './api';

const getGrCard = async function(PciLaneId) {
    const response = await api.get('/GraphicsCard',{
        params: {PciLaneId:PciLaneId}
    })

    return response.data;
}

export default { 
    getGrCard
};