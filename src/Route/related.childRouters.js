const relatedLogin = {
    path: "relatedLogin",
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require("../Components/loginRelated/Related.js").default);
      });
    }
  };
  
  const noRelated = {
    path: "noRelated",
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require("../Components/loginRelated/NoRelated.js").default);
      });
    }
  };
  
  const registerConnect = {
    path: "registerConnect",
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require("../Components/loginRelated/registerConnect.js").default);
      });
    }
  };
  
  const loginConnect = {
    path: "loginConnect",
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require("../Components/loginRelated/loginConnect.js").default);
      });
    }
  };

export default [relatedLogin, noRelated,registerConnect,loginConnect]