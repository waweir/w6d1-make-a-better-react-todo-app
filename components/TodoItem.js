import React, { Component } from 'react'

// stateless component. always have to refer back to function passed to it, can't define functions within it
const TodoItem = (props) => (
    <div className={props.data.done?'row todoItem flex animated fadeInDown taskComplete':'row todoItem flex animated fadeInDown'} style={{display:props.data.remove?'none':''}}>
        <div className='col-xs-8'>{props.data.text}</div>
        <div className='col-xs-4 text-right'>
            <div className={props.data.done?'completeChecked button':'complete button'} onClick={props.markDone} style={{backgroundImage:props.data.done?"url('../img/checkmark-green.svg')":''}}></div>
            <div className='remove button' onClick={props.removeTask}></div>
        </div>
    </div>
)

export default TodoItem
