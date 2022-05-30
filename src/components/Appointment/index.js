import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  console.log("props", props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
//add the custom hook
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Create a function called save in the Appointment component.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //Call the props.bookInterview function with the 
    //appointment id and interview as arguments from within the save function.
    //console.log("props.bookInterview", props.bookInterview(props.id, interview))
      props.bookInterview(props.id, interview).then(() => {//interview is from the function save
      transition(SHOW)});//could this be done within the function pointers?
      
     //).catch((error) => console.log(error))
  }

  return (
    <article className="appointment">
        <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onEdit={() => {}}
              onDelete={() => {}}
              />
          )}
          {mode === CREATE && (<Form 
          
          interviewers = {props.interviewers}
          onCancel = {() => {back()}}
          onSave = {save}
          />)}
         
    </article>
  );
}

{/* <Show student="Lydia Miller-Jones" interviewer={interviewers[0].name} 
    onEdit={action("onEdit")} onDelete={action("onDelete")} />) */}
