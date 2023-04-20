const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return (state = action.payload);
    case "UNSET_TOKEN":
      return (state = "");
    default:
      return state;
  }
};

export default tokenReducer;
