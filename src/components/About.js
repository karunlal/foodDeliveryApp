import User from './User'
import UserClass from './UserClass'
import UserContext from './userContext'

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <div>
        Logged In
        <UserContext.Consumer>
          {(data)=>console.log(data)}
        </UserContext.Consumer> 
              </div>
      <h2>This is Namaste React Web Series</h2>
      <UserClass name={'Karunlal'} location={'Dehradun'} />
    </div>
  )
}

export default About
