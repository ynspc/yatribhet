import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/AuthAction'

const Register = () => {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName: ""
    })
    const { message } = useSelector(state => state.ErrorReducer)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(input))
    }
    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="register-form">
            {message ? <p>{message}</p> : ''}

            <form onSubmit={submitHandler}>
                <input type="text" name="firstName" value={register.firstName} placeholder="Enter First Name" onChange={changeHandler} />
                <input type="text" name="lastName" value={register.lastName} placeholder="Enter Last Name" onChange={changeHandler} />
                <input type="email" name="email" value={register.email} placeholder="Enter Email" onChange={changeHandler} />
                <input type="password" name="password" value={register.password} placeholder="Enter Password" onChange={changeHandler} />
                <input type="text" name="userName" value={register.userName} placeholder="Enter Username" onChange={changeHandler} />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register
