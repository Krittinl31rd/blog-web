'use client'

import { useFormState } from 'react-dom'
import { login } from './action'

export default function Page() {
    const inintState = {
        message: null
    }

    const [state, formAction] = useFormState(login, inintState)

    return (
        <form action={formAction}>
            <div>Email <input className="border-2" name="email" /></div>
            <div>Password <input className="border-2" type="password" name="password" /></div>
            <div className="font-semibold">Message: {state?.message}</div>
            <button className='bg-yellow-400 px-4 py-1 rounded-lg'>Login</button>
        </form>
    )
}