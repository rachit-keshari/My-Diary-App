import react, {useState, useEffect} from 'react';
import './diaryStyle.css';
import TextareaAutosize from 'react-textarea-autosize';
import firebase from '../firebase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryNote =(props)=>{

    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(date.toDateString());
    const [diary,setDiary] = useState([]);

    const updateCalendar= (date) =>{
        setDate(date);
        setDisplayDate(date.toDateString());
    }

    useEffect(()=>{
        const unsubscribe = firebase
        .firestore()
        .collection('diary')
        .onSnapshot((snapshot)=>{
          const temp = snapshot.docs.map((doc)=>({
              id:doc.id,
              ...doc.data()
          })) 
          setDiary(temp);
        })

        return () => unsubscribe();
    },[])

    const handleAdd = () => {
        firebase
        .firestore()
        .collection('diary')
        .add({
            note:note,
            date:displayDate,
            week:date.getDate(),
            month:date.getMonth(),
            year:date.getFullYear(),
        })
        .then(()=>{
            setNote('');
        })
    }
    
    const handleNoteChange=()=>{
        
          diary.forEach((doc)=>{
              if(doc.id===props.chosenId)
              {
                  setNote(doc.note);
                  setDisplayDate(doc.date);
                  console.log(doc.note);
              }
          })   
    }

    const handleUpdate=(id_val,n)=>{
        firebase
        .firestore()
        .collection('diary')
        .doc(id_val).update({note:n});
        setNote('');
   }
   
   const handleDelete=(id_val)=>{
       firebase
        .firestore()
        .collection('diary')
        .doc(id_val).delete();
        setNote('');
   }   

    return(
        <div style={{
            margin:20,
            borderWidth:2,
            borderRadius:15,
            backgroundColor:"khaki",
            padding:35,
            textAlign:"start",
        }}>
            <div>
            <h3 style={{color:'Black', margin:0}} >Daily Writeup</h3>
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
            <label><h4 style={{margin:5}}>Note Here: {displayDate}</h4></label>
                <br/>
                <div style={{
                display:"flex",
                flexDirection:"row"
            }}>
                <TextareaAutosize  
                minRows={18}
                maxRows={20}
                style={{margin:20, marginLeft:0, marginTop:0, width:400, height:300}}
                value={note} onChange={e=>setNote(e.target.value)} />
                <br/>
                <Calendar
                   style={{ margin:20 }}
                   onChange={updateCalendar}
                   value={date}
                />
                </div>
                {console.log(date)}
            </div>
            <div>
            </div>
            <button class="btn2" onClick={()=>handleAdd()}>Save As New Note</button>
            <button class="btn2" onClick={()=>handleUpdate(props.chosenId,note)}>Update</button>
            <button class="btn2" onClick={()=>handleDelete(props.chosenId)}>Delete</button>
            <button class="btn2" onClick={()=>handleNoteChange()}>Open Selected Note</button>
        </div>
        </div>
    );
}

export default DiaryNote;