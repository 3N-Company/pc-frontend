function createVisor(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      const isFunction = typeof action === "function";

      return isFunction
        ? action(dispatch, getState, extraArgument)
        : next(action);
    };
}

const visor = createVisor();
visor.withExtraArgument = createVisor;

export default visor;
