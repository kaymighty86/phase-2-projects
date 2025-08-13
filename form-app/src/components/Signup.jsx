import Input from "./UI/Input";
import { useInputHandler } from "../customHooks/useInputHandler";
import { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue } from "../util/validation";

export default function Signup() {

  const {value: emailValue, handleOnChange: handleEmailInput, handleInputBlur: handleEmailBlur, error: emailInputError, setValue: setEmailValue} = useInputHandler(
    "", 
    (value)=>(isEmail(value) && isNotEmpty(value)), 
    "Please provide valid email address."
  );

  const {value: passwordValue, handleOnChange: handlePasswordInput, handleInputBlur: handlePasswordBlur, error: passwordInputError, setValue: setPasswordValue} = useInputHandler(
    "", 
    (value)=>(isNotEmpty(value) && hasMinLength(value, 8)), 
    "Password should be minimum of 8 characters."
  );

  const {value: confirmPasswordValue, handleOnChange: handleConfirmPasswordInput, handleInputBlur: handleConfirmPasswordBlur, error: confirmPasswordInputError, setValue: setConfirmPasswordValue} = useInputHandler(
    "", 
    (value)=>(isNotEmpty(value) && isEqualsToOtherValue(value, passwordValue)), 
    "Passwords do not match."
  );

  function handleSubmit(event){
    event.preventDefault();

    if(!emailInputError && !passwordInputError && !confirmPasswordInputError){
      const formD = new FormData(event.target);
      console.log(typeof(formD.get("terms")));
      const inputs = Object.fromEntries(formD.entries());//extract all the iterable object "entries" provided by the FormData into simple javascript object with key-value pairs

      //the values in the "acquisition" mode grouped values will only show one value becuase the "fromEnteries()" function only stores one value per key when converting from iterable object to the normal (non-iterable) javascript object. So it just keeps replacing the value of the key with the value of the next activated element that used the same name
      //to get all the selected values under the "acquisition" inputs group, the formData class provides a function for stuffs like that
      const acquisitionMethods = formD.getAll("acquisition");
      inputs.acquisition = acquisitionMethods;//just assign the returned array by the getAll() function as the new value the "acquisition" key

      console.log(inputs);

      //reset the form
      event.target.reset();
    }
  }

  function handleReset(){
    setEmailValue("");
    setPasswordValue("");
    setConfirmPasswordValue("");
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <Input label="Email" id="email" type="email" name="email" value={emailValue} onChange={handleEmailInput} onBlur={handleEmailBlur} error={emailInputError} required/>
      </div>

      <div className="control-row">
        <div className="control">
          <Input label="Password" id="password" type="password" name="password" value={passwordValue} onChange={handlePasswordInput} onBlur={handlePasswordBlur} error={passwordInputError} required/>
        </div>

        <div className="control">
          <Input label="Confirm Password" id="confirm-password" type="password" name="confirm-password" value={confirmPasswordValue} onChange={handleConfirmPasswordInput} onBlur={handleConfirmPasswordBlur} error={confirmPasswordInputError} required/>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
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
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required/>I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
