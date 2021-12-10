const TOGGLE = 'searchContentToggle'
export const showContentAction = (bool) => {
    return {
        type:TOGGLE,
        payload:bool
    }
}

function searchContentReducer(state = true, action) {
    switch (action.type) {
      case TOGGLE:
        return action.payload;
      default:
        return state;
    }
  }

  export default searchContentReducer;