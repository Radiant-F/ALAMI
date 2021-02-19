function reducer(
  state = {token: '', nomer: '', alamat: '', name: '', avatar: ''},
  action,
) {
  switch (action.type) {
    case 'CHANGE_USER':
      return {...state, ...action.payload};
  }
  return state;
}

export default reducer;
