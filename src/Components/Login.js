import { useState, useContext } from 'react';
import { LOGIN_URL } from '../utils/constant';
import validate from '../utils/validate';
import { withRouter } from 'react-router';
import UserContext from './UserContext';
function Login(props) {
  const initialUserSTate = {
    email: 'username5@gmail.com',
    password: 'username5',
    errors: {
      email: '',
      password: '',
    },
  };
  const [user, setUser] = useState(initialUserSTate);
  let { email, password, errors } = user;
  let { updateUser } = useContext(UserContext);
  const handleChange = (event) => {
    let { name, value } = event.target;
    validate(errors, name, value);
    setUser((user) => {
      return { ...user, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      user: {
        email: email,
        password: password,
      },
    };
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errors) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        updateUser(user.user);
        setUser(initialUserSTate);
        props.history.push('/');
      })
      .catch((errors) =>
        setUser((user) => {
          return {
            ...user,
            errors: { email: 'Email or password is incorrect!' },
          };
        })
      );
  };
  return (
    <section className="text-center pt-14">
      <h2 className="text-4xl">Sign In</h2>
      <button className="text-primary mt-2">Need an account?</button>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
          placeholder="Email"
          value={email}
        />
        <span className="text-red-500">{errors.email}</span>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="block w-132 border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
          placeholder="Password"
          value={password}
        />
        <span className="text-red-500 block">{errors.password}</span>
        <button
          className="bg-primary px-6 py-3 rounded text-white text-lg inline-block ml-108 mt-6 submit"
          type="submit"
          disabled={errors.email || errors.password}
        >
          Sign In
        </button>
      </form>
    </section>
  );
}

export default withRouter(Login);
