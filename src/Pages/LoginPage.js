import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <form>
            <input type={'text'} name='username' placeholder='enter username' />

            <input type={'password'} name='password' placeholder='enter password' />

            <input type={'submit'} value='login' />
        </form>
    </div>
  )
}

export default LoginPage