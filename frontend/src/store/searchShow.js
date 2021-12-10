const TOGGLE = 'searchToggle'
export const showAction = (bool) => {
    return {
        type:TOGGLE,
        payload:bool
    }
}

function searchHideReducer(state = true, action) {
    switch (action.type) {
      case TOGGLE:
        return action.payload;
      default:
        return state;
    }
  }

  export default searchHideReducer;