export default function Input({label, id, onChange, onBlur, error, ...others}){
    return (
        <>
          <label htmlFor={id}>{label}</label>
          <input id={id} onBlur={onBlur} onChange={onChange} {...others} />
          {error && <div className="control-error"><p>{error}</p></div>}
        </>
    );
}