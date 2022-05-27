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
          />)}
         
    </article>
  );
}

{/* <Show student="Lydia Miller-Jones" interviewer={interviewers[0].name} 
    onEdit={action("onEdit")} onDelete={action("onDelete")} />) */}
