import { useEffect, useState } from "react"
import api from "../../utils/api"
import Input from "../form/Input"
import styles from "./EditPerfil.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'

function EditPerfil() {
  const [user, setUser] = useState({})
  const [newUser, setNewUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      return setUser(response.data)
    })
    .catch((error) => {
      return console.log(error.response.data)
    })
  }, [token])

  async function updateUser(e) {
    e.preventDefault()
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(newUser).forEach((key) => formData.append(key, newUser[key]))

    const data = await api.put(`users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    })
    .catch((error) => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage( data.message, msgType)
  }

  function handleOnChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value})
  }

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setNewUser({ ...newUser, [e.target.name]: e.target.files[0]})
  }
  
  return (
    <>
      <section className={styles.form_container}>
        <h1>Editing: {user.name}</h1>
        <main>
          {(user.image || preview) && (
            <img 
            src={
              preview 
              ? URL.createObjectURL(preview) 
              : `${process.env.REACT_APP_API}/images/users/${user.image}`} 
              alt={user.name} 
            />
          )}
          <form action="" onSubmit={updateUser}>
            <Input 
              name='image'
              type='file'
              handleOnChange={onFileChange}
            />
            <Input 
              name='name'
              placeholder={user.name}
              handleOnChange={handleOnChange}
            />
            <Input 
              name='email'
              placeholder={user.email}
              handleOnChange={handleOnChange}
            />
            <Input 
              name='password'
              placeholder='Password'
              handleOnChange={handleOnChange}
            />
            <Input 
              name='confirmpassword'
              placeholder='Confirm password'
              handleOnChange={handleOnChange}
            />
            <Input 
              name='phone'
              placeholder={user.phone}
              handleOnChange={handleOnChange}
            />
            <input type="submit" value="Update"/>
          </form>
        </main>
        
      </section>
    </>
  )
}

export default EditPerfil