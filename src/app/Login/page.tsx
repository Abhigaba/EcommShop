"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '../contexts/useAuth'
import { useCart } from '../contexts/useCart'
const Login = () => {

  const {userId, setuserId} = useAuth() 
  const [loading, setloading] = useState(false)
  const {setCart} = useCart()
  const router = useRouter()
  const [error, seterror] = useState('')
  const [email, setEmail] = useState('test123@gmail.com');
  const [pass, setPass] = useState('12345678')

  if (userId) {
    router.push('/')
  }
  

    function Button({value}: any) {
        return (
          <button 
            className={`mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-teal-600 transform hover:-translate-y-1 hover:shadow-lg`}>
            {loading ? <div className='h-5 w-5 m-auto border-2 border-t-2 border-white border-solid rounded-full animate-spin'></div> :value}
        </button>
        )
      }
      
      const onChangeEmail = (e:any) => {
        setEmail(e.target.value);
      } 

      const onChangePass = (e:any) => {
        setPass(e.target.value);
      }

        function Input({type, id, name, label, placeholder, autofocus, onChange, value} : any) {
          return (
            <label className="text-gray-500 block mt-3">{label}
              <input
                autoFocus={autofocus}
                type={type} 
                id={id} 
                name={name} 
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
            </label>
          )

        }

    const handleLogin = async (e: any) => {
      e.preventDefault()
      setloading(true);
      const email = e.target[0].value
      const pass = e.target[1].value

      try{
          const data = await axios.post('/api/login',{userId : email, password: pass})
          const res = await axios.post('/api/UpdateCart', {userId: email})
          setCart(res.data.cart || [])
          localStorage.setItem('userId', JSON.stringify(email));
          localStorage.setItem('username', JSON.stringify(data.data.username));
          
          setuserId(email);
          router.push('/');
      }
      catch(error: any) { 
          seterror(error.response.data.error);
          console.log(error);
      
      }
      finally{
        setloading(false);
      }
    }
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
    <div className="relative border-t-8 rounded-sm border-teal-600 bg-white px-12 pt-8 pb-16 shadow-2xl w-96">
      <h1 className="font-bold text-center block text-2xl">Log In</h1>
      <form onSubmit={(e) => handleLogin(e)}>
      <Input type="email" id="email" onChange={onChangeEmail} value={email} name="email" label="Email Address" placeholder="me@example.com" autofocus={true}/>
      <Input type="password" id="password" name="password" value={pass} onChange={onChangePass} label="Password" placeholder="••••••••••" />
      <Button value="Submit" />
      </form>
      {error && <p className='font-medium text-lg mt-2 text-red-500'>{error}</p>}
      <Link href="/Register" className={`absolute bottom-7 text-blue-600`}>New User? Sign up</Link>
    </div>
  </div>
  )
}

export default Login;