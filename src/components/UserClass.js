import React from 'react'

class UserClass extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      count: 0,
      count1: 0,
    }
  }
  render() {
    const { name, location } = this.props
    const { count, count1 } = this.state
    return (
      <div className="user-card">
        <h1>Class</h1>
        <h1>{count}</h1>
        <h1>{count1}</h1>

        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count1: this.state.count1 - 1,
            })
          }}
        >
          COUNT
        </button>
        <h2>Name:{name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact:@karunlalp</h4>
      </div>
    )
  }
}

export default UserClass
