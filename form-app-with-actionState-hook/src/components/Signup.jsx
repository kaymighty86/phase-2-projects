import { useActionState } from "react";
import { isEmail, isNotEmpty, isEqualToOtherValue, hasMinLength } from "../util/validation";

export default function Signup() {

  function handleFormAction(prevState, formData){
    let errors = Array(0);

    const formEntries = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      role: formData.get("role"),
      acquisition: formData.getAll("acquisition"),
      terms: formData.get("terms")
    }

    if(!isEmail(formEntries.email)){
      errors.push("Email is invalid");
    }

    if(!hasMinLength(formEntries.password, 8)){
      errors.push("Password must have a minimum of 8 characters");
    }

    if(!isEqualToOtherValue(formEntries.confirmPassword, formEntries.password)){
      errors.push("Passwords don't match");
    }

    if(!isNotEmpty(formEntries.firstName) || !isNotEmpty(formEntries.lastName)){
      errors.push("Names must not be empty");
    }

    console.log(formEntries);

    return {
      errors,
      formEntries
    }
  }

  const [ formState, dispatchFormAction ] = useActionState(handleFormAction, {
    errors:[]
  });

  return (
    <form action={dispatchFormAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.formEntries?.email}/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.formEntries?.password}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id="confirm-password" type="password" name="confirm-password" defaultValue={formState.formEntries?.confirmPassword}/>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.formEntries?.firstName}/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.formEntries?.lastName}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.formEntries?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.formEntries?.acquisition.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.formEntries?.acquisition.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
           type="checkbox" 
           id="other" 
           name="acquisition" 
           value="other" 
           defaultChecked={formState.formEntries?.acquisition.includes("other")} 
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
           type="checkbox" 
           id="terms-and-conditions" 
           name="terms" 
           defaultChecked={formState.formEntries?.terms != null && true} 
          />
          I agree to the terms and conditions
        </label>
      </div>

      <ul className="control-error">
        {formState.errors.map(error => (<li key={error} className="error ">{error}</li>))}
      </ul>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
