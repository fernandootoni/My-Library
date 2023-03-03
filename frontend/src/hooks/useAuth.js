import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token') 

    if(token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function register(user) {
    let msgText = 'User created successfully!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user)
      .then((response) => {
        return response.data.token
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  async function login(user) {
    let msgText = 'Login successfully!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/login', user)
      .then((response) => {
        return response.data.token
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  async function authUser(data) {
    setAuthenticated(true)

    localStorage.setItem('token', JSON.stringify(data))

    navigate('/dashboard')
  }

  function logout() {
    const msgText = 'Log out!'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')

    setFlashMessage(msgText, msgType)
  }

  return { register, authenticated, logout, login }
}