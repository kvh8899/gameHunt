const FLIP = 'flip/showDiv'
const toggle = ()=> {
    return {
        type: FLIP,
    }
}
function psReducer(state=false,action){
    switch(action.type){
        case FLIP:
            let flip = state;
            return !flip;
        default:
            return state;
    }
}