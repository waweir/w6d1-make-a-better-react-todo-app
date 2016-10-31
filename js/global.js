import React from 'react'
import ReactDOM from 'react-dom'
import Todos from '../components/Todos'

// function to render the view using the todos array
function renderView() {
    ReactDOM.render(
        <Todos />,
        document.getElementById('todos')
    )
}

renderView()
