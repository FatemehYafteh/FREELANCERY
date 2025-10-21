

export default function TextField({name ,label , onChange , value }) {
  return (
<div>
        <label className="mb-1" htmlFor={name}>
            {label}
        </label>
        <input
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        className="textField__input"
        type="text"
        autoComplete="off"     
        />
      </div>
  )
}
