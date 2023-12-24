'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const AddNewUser = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')

  const addNewUserHandler = async () => {
    console.log(name, age, email, users)
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, age, email }),
    })
    let response = await res.json()
    users.push(response)

    if (response.ok) {
      alert('User added successfully')
    } else {
      alert('User not created !')
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center border '>
      <div className='w-1/4 flex flex-col items-center justify-center border p-10 rounded-xl '>
        <Input
          className=' '
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Please enter your name'
        />
        <br />
        <Input
          className=' '
          type='text'
          onChange={(e) => setAge(e.target.value)}
          value={age}
          placeholder='Please enter your age'
        />
        <br />
        <Input
          className=''
          type='text'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Please enter your email'
        />
        <br />
        <Button className=' ' onClick={addNewUserHandler}>
          Add User
        </Button>

        {/* {users.map((user) => ( */}
        {/* ))} */}
      </div>
      <>
        <h1>Added User</h1>
        <h3>{name}</h3>
      </>
    </div>
  )
}

export default AddNewUser
