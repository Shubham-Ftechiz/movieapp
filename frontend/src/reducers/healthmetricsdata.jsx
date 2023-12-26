const initialState = [];
export const changeHealthMetrics = (state = initialState, action) => {
  switch (action.type) {
    case "HEALTHMETRICS":
      return action.payload;
    default:
      return state;
  }
};

export const changeBarData = (state = initialState, action) => {
  switch (action.type) {
    case "GETBARDATA":
      return action.payload;
    default:
      return state;
  }
};

export const changeBodyParts = (state = initialState, action) => {
  switch (action.type) {
    case "GETBODYPARTS":
      return action.payload;
    default:
      return state;
  }
};
