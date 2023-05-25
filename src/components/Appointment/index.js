import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const initialMode = props.interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initialMode);

  // // or can handle on add function as follows
  // const handleAddAppointment = () => {
  //   transition(CREATE);
  // }; // then pass {handleAddAppointment into the onAdd function.}

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}

// Initial code to render mode.
{
  /* {props.interview ? (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => console.log("CONFIRM")}
    onEdit={() => console.log("EDIT")}
  />
) : (
  <Empty onAdd={() => console.log("CREATE")} />
)} */
}

// or pass onCancel as onCancel={() => back()}
