import Input from "./UI/Input";
import { useInputHandler } from "../customHooks/useInputHandler";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {

  //use the custom hooks that provides all the functionality needed for Input operation (event handling, input validation, etc.) for convinience
  const {value: emailVal, setValue: setEmail, handleOnChange: handleEmailInput, handleInputBlur: handleEmailBlur, error: emailError} = useInputHandler(
    "", 
    (value) => (isNotEmpty(value) && isEmail(value)),
    "Please provide valid email address."
  );

  const {value: passwordVal, setValue: setPassword, handleOnChange: handlePasswordInput, handleInputBlur: handlePasswordBlur, error: passwordError} = useInputHandler(
    "", 
    (value) => (isNotEmpty(value) && hasMinLength(value, 8)),
    "Password should be minimum of 8 characters."
  );
  //-----------------------------------------------------------------------------

  function handleSubmit(event){
    event.preventDefault();

    if(!emailError && !passwordError){//as long as there is no error, submit
      const details = {
        email: emailVal,
        password: passwordVal
      }

      console.log(details);

      event.target.reset();//reset the form
    }
  }

  function handleReset(){
    //when the reset event of the form is invoked, clear the state values too because the input element derive their value from the corresponding states
    setEmail("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input label="Email" id="email" type="email" name="email" value={emailVal} onChange={handleEmailInput} onBlur={handleEmailBlur} error={emailError}/>
        </div>
        <div className="control no-margin">
          <Input label="Password" id="password" type="password" name="password" value={passwordVal} onChange={handlePasswordInput} onBlur={handlePasswordBlur} error={passwordError}/>
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
