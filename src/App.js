import {useState} from 'react';
import  {connect} from 'react-redux';
import DateList from './components/DateList'
import DiaryNote from './components/DiaryNote'

function App(props) {

  return (
    <div style={{
      margin:30, 
      borderWidth:2,
      borderRadius:15,
      display:"flex",
      backgroundColor:"grey",
      flexDirection:'column',
      justifyContent:"center",
      textAlign:"center",
      padding:20,
     }}>
       <h1 style={{color:'white'}}>My Diary</h1>
       <div style={{
      display:"flex",
      justifyContent:"center",
     }}>
       <DiaryNote chosenId={props.id_val}/>
       <DateList handleChoiceId={(val)=>props.changeId_val(val)}/>
       </div>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    id_val:state.txt
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    changeId_val:(id_val)=>{dispatch({type:'CHANGE_TXT',payload:id_val})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);