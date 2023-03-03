import styles from './Input.module.css'

function Input({type, name, placeholder, handleOnChange, value, multiple}) {
  return(
    <div className={styles.form_control}>
      <input 
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder} 
        onChange={handleOnChange} 
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

export default Input