import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
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
     props.bookInterview(props.id,interview);
  }

  // Call the props.bookInterview function with the appointment id and interview as 
  // arguments from within the save function. 
  // Verify that the id and interview values are correct in the console output.






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
