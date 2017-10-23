exports.createStore = function(reducer) {
  return function(initialState) {
    return function() {
      var state = initialState;
      var listeners = [];

      var getState = function() {
        return state;
      };

      var dispatch = function(action) {
        state = reducer(state)(action);
        listeners.forEach(function(l) {
          l(state)();
        });
      };

      var subscribe = function(listener) {
        listeners.push(listener);

        return function() {
          listeners = listeners.filter(function(l) {
            l !== listener;
          });
        };
      };

      return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
      };
    };
  };
};

exports.subscribe = function(s) {
  return function(l) {
    return function() {
      // TODO: implement unsubscribing on the PureScript side.
      s.subscribe(l);
    };
  };
};

exports.dispatch = function(s) {
  return function(a) {
    return function() {
      s.dispatch(a);
    };
  };
};

exports.getState = function(s) {
  return function() {
    return s.getState();
  };
};
