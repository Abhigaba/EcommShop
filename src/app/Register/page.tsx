"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '../contexts/useAuth'

const  Register = () => {

    const router = useRouter();
    const {userId, setuserId} = useAuth() 
    function Button({value}: any) {
        return (
          <button 
            className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-teal-600 transform hover:-translate-y-1 hover:shadow-lg">
            {value}
        </button>
        )
      }
      
        function Input({type, id, name, label, placeholder, autofocus} : any) {
          return (
            <label className="text-gray-500 block mt-3">{label}
              <input
                autoFocus={autofocus}
                type={type} 
                id={id} 
                name={name} 
                placeholder={placeholder}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
            </label>
          )

        }

    const handleRegister = async (e: any) => {
            e.preventDefault()
            const user = e.target[0].value
            const email = e.target[1].value
            const pass = e.target[2].value

            try{
                const res = await axios.post('/api/register',{user: user , userId : email, password: pass})
                console.log('signup success')

                localStorage.setItem('userId', JSON.stringify(email));
                localStorage.setItem('username', JSON.stringify(user));
                setuserId(email);
                router.push('/');
            }
            catch(error: any) { 
                console.log(error);
            }
    }
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
    <div className=" border-t-8 rounded-sm border-teal-600 relative bg-white px-12 pt-8 pb-16 shadow-2xl w-96">
      <h1 className='font-bold text-center block text-2xl'>Register</h1>
      <form onSubmit={handleRegister}>
      <Input type="text" id="name" name="name" label="User_name" placeholder="Username" autofocus={true}/>
      <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true} />
      <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" />
      <Button value="Register" />
             </form>
        <Link href="/Login" className={`absolute bottom-6 text-blue-600`}>Already Registered? Log In</Link>
    </div>
    </div>
  )
}


export default Register;