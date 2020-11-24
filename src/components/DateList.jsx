import './diaryStyle.css';
import react, {useState, useEffect} from 'react';
import firebase from '../firebase';



const SORT_OPTIONS = {
    'WEEK_ASC': {column:'week', direction:'asc'},
    'WEEK_DESC': {column:'week', direction:'desc'},
    'MONTH_ASC': {column:'month', direction:'asc'},
    'MONTH_DESC': {column:'month', direction:'desc'},
    'YEAR_ASC': {column:'year', direction:'asc'},
    'YEAR_DESC': {column:'year', direction:'desc'},
}


const useDiary = (sortBy = 'YEAR_DESC') => {
    const [diary,setDiary] = useState([]);
    useEffect(()=>{
        const unsubscribe = firebase
        .firestore()
        .collection('diary')
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
        .onSnapshot((snapshot)=>{
          const temp = snapshot.docs.map((doc)=>({
              id:doc.id,
              ...doc.data()
          })) 
          setDiary(temp);
        })

        return () => unsubscribe();
    },[sortBy])

    return diary;
}


const DateList = (props) => {
    
    const [sortBy, setSortBy] = useState('YEAR_DESC');
    const diary = useDiary(sortBy);

    return(
        <div style={{
            margin:20,
            borderWidth:2,
            borderRadius:15,
            backgroundColor:"pink",
            width:320,
            padding:20,
        }}>
            <h2>Note List</h2>
            <label><strong>(select note here then open Selected note)</strong></label>
            <div>
    <label><strong>Filter By : </strong></label>
                <select value={sortBy} onChange={(e) => setSortBy(e.currentTarget.value)}>
                    <option value="WEEK_DESC">Week (newest first)</option>
                    <option value="WEEK_ASC">Week (oldest first)</option>
                    <option disabled>---</option>
                    <option value="MONTH_DESC">Month (newest first)</option>
                    <option value="MONTH_ASC">Month (oldest first)</option>
                    <option disabled>---</option>
                    <option value="YEAR_DESC">Year (newest first)</option>
                    <option value="YEAR_ASC">Year (oldest first)</option>
                    
                </select>
            </div>
            <ol>
                {diary.map((diary)=>
                    <li key={diary.id}>
                    <div>
                        <button
                        class="btn1"
                        onClick={()=>{props.handleChoiceId(diary.id)}}>{diary.date}</button>
                    </div>
                </li>
                )}
            </ol>
        </div>
    )
}

export default DateList;