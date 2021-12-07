const FLIP = 'show/showDiv'
export const toggle = (id)=> {
    return {
        type: FLIP,
        payload:id
    }
}
function psReducer(state=null,action){
    switch(action.type){
        case FLIP:
            return action.payload;
        default:
            return state;
    }
}
export default psReducer;