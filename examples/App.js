import React, { Component } from 'react'
import './App.css'

import { Calendar } from '@src'

let primaryDefault = '#a89be8'
let secondaryDefault = 'white'

const urlParams = new URLSearchParams(window.location.search)
let token = urlParams.get('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiY2FsZW5kYXIiLCJkYXRhIjp7InJvbGUiOiJ2ZW51ZSIsImlkIjoyfSwiaWF0IjoxNTQ0NDcyOTk5fQ.JweMosqVyxNrcE2XGbO5sydyBWnsdbsFr2EtvXzlArU'

class App extends Component {
  render () {
    return (
      <div>
        <Calendar token={token} type='large' primary={primaryDefault} secondary={secondaryDefault} />
        <Calendar token={token} type='small' primary={primaryDefault} secondary={secondaryDefault} />
      </div>
    )
  }
}

export default App
