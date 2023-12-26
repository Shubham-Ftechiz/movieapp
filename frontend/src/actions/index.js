export const getHealthMetrics = (payload) => {
  return {
    type: "HEALTHMETRICS",
    payload: payload,
  };
};

export const getBarData = (payload) => {
  return {
    type: "GETBARDATA",
    payload: payload,
  };
};

export const getBodyParts = (payload) => {
  return {
    type: "GETBODYPARTS",
    payload: payload,
  };
};
