export const SET_TOKEN = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

export const UNSET_TOKEN = () => {
  return {
    type: "UNSET_TOKEN",
  };
};
