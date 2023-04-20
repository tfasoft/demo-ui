export const SET_USER = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const UNSET_USER = () => {
  return {
    type: "UNSET_USER",
  };
};
