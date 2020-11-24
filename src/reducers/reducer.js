const myState = {
  txt:""
}

const reducer = (state=myState,action) => {
   
  if(action.type==='CHANGE_TXT')
  {
      return {
          txt:action.payload
      }
  }
  return state;
}

export default reducer;