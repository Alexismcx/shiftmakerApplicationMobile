export default function(historiqueList = [], action){
    if(action.type === 'saveAllAtelier'){
        return action.allAtelier
    } else {

        return historiqueList
    
    } 
}