import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function removeInterview() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }


  function editInterview() {
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editInterview}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (<Form

        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
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
        onCancel={back}
      />}

      {mode === EDIT && (<Form
        student={props.interview.student}
        interviewers={props.interviewers}
        onCancel={() => { back() }}
        onSave={save}
      />)}

      {mode === ERROR_DELETE && <Error
        message={"Cannot cancel appointment"}
        onClose={back}
      />}

      {mode === ERROR_SAVE && <Error
        message={"Cannot save appointment"}
        onClose={back}
      />}

    </article>
  );
}


