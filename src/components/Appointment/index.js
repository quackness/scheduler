import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  console.log("props", props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
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
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {//interview is from the function save
      transition(SHOW)});//could this be done within the function pointers?
      
     //).catch((error) => console.log(error))
  }

  function removeInterview() {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => transition(EMPTY))
    console.log("clicked")
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
              //instead of deleting it will go to the CONFIRM
              onDelete={() => transition(CONFIRM)}
              />
          )}
          {mode === CREATE && (<Form 
          
          interviewers = {props.interviewers}
          onCancel = {() => {back()}}
          onSave = {save}
          />)}

          {mode === SAVING && <Status
          message={"Saving"}
          />}

          {mode === DELETING && <Status 
          message={"Deleting appointment"}
          />}

          {mode === CONFIRM && <Confirm
          message={"Are you sure you want to delete this interview?"}
          onConfirm={removeInterview}
          onCancel={back}//back is coming from a custom hook

          />}
         
    </article>
  );
}

{/* <Show student="Lydia Miller-Jones" interviewer={interviewers[0].name} 
    onEdit={action("onEdit")} onDelete={action("onDelete")} />) */}
