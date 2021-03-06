const model = {
  username: '',
  privileges: null,
  email: '',
  name: '',
  surname: '',
  phone: '',
  id: '',
};

export default (state = model, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { payload } = action;

      state = {
        ...state,
        username: payload.username,
        privileges: payload.privileges,
        email: payload.email,
        name: payload.name,
        surname: payload.surname,
        phone: payload.phone,
        id: payload.id,
      };
      return state;

    case 'LOGOUT':
      window.localStorage.removeItem('passport');
      window.location.replace('/');
      state = model;
      return state;

    default:
      return state;
  }
};
