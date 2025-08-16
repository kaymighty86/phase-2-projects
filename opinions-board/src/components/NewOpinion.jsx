import { useActionState, useContext } from "react";

import { OpinionsContext } from "../store/opinions-context";
import Submit from "./UI/Submit";

export function NewOpinion() {

  const {addOpinion} = useContext(OpinionsContext);

  async function handleOpinionFormAction(prevState, formData){
    const opinionSubmited = {
      userName: formData.get("userName"),
      title: formData.get("title"),
      body: formData.get("body")
    }

    let errors = [];

    //validation of the inputs
    if(opinionSubmited.userName === ""){
      errors.push("Please input a username");
    }

    if(opinionSubmited.title === ""){
      errors.push("Please input a title");
    }
    
    if(opinionSubmited.body === ""){
      errors.push("Please input your opinion message");
    }
    
    //return
    if(errors.length == 0){//if inputed data is good, send to backend
      await addOpinion(opinionSubmited);
      
      //clear the data so that will form will reset
      return {
        opinionSubmited: undefined,
        errors
      }
    }
    else{
      //there is one or more errors encountered
      return {
        opinionSubmited,
        errors
      }
    }
  }

  const [opinionFormState, dispatchFormAction] = useActionState(handleOpinionFormAction,{
    opinionSubmited: undefined,
    errors: []
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={dispatchFormAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={opinionFormState.opinionSubmited?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={opinionFormState.opinionSubmited?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={opinionFormState.opinionSubmited?.body}></textarea>
        </p>

        <div className="control-row">
          <ul className="errors">
            {opinionFormState.errors.map(error => (<li key={error}>{error}</li>))}
          </ul>
        </div>

        <Submit />
      </form>
    </div>
  );
}
