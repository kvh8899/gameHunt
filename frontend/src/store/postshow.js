const FLIP = "show/showDiv";

export const toggle = (id) => {
  return {
    type: FLIP,
    payload: id,
  };
};
/*
    this reducer updates a variable that 
    lets the program know when to show the
    product profile page
*/
function psReducer(state = null, action) {
  switch (action.type) {
    case FLIP:
      return action.payload;
    default:
      return state;
  }
}
export default psReducer;
