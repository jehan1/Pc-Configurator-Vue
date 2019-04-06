import { api } from './api';

const getMemory = async function(memTypeId) {
    const response = await api.get('/Memory',{
        params: {memTypeId:memTypeId}
    })

    return response.data;
}

const getMaxMemory = function([mem]){
    var i;
    totalMem = 0;
    for(i = 0; i <mem.length; i++){
        let maxMem =  mem.capasity;
        var totalMem = totalMem + maxMem; 
    }
        return totalMem;
}

export default { 
    getMemory,
    getMaxMemory
};