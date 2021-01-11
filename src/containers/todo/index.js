import React, { Component } from 'react';
import TaskCard from '../../components/taskCard';
import { v4 as uuidv4 } from 'uuid';
import plus from '../../media/plus.png';

class Todo extends Component {
  state = {
    input: '',
    list: [],
    completed: false,
    edit:[]
  }

  componentDidMount() {
    console.log("mounted")
    const data = JSON.parse(localStorage.getItem("tasks"))
    if (data) {
      this.setState({ list: data })
    }

  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.list));
  }

  changeInputHandler = e => {
    this.setState({ input: e.target.value })
  }

  changeCompleteHandler = () => {
    let c = this.state.completed
    this.setState({ completed: !c })
  }

  addTask = () => {
    const i = this.state.input
    this.setState({
      input: '', list: [
        ...this.state.list,
        {
          id: uuidv4(),
          text: i,
          completed: false,
          date: Date(),
          modify:false,
        }]
    })
  }


  completeTask = id => {
    const updated = this.state.list.map(i => {
      if (i.id === id) {
        i.completed = !i.completed
      }
      return i
    })
    this.setState({ list: updated })
  }

  deleteTask = id => {
    const updated = this.state.list.filter(i => i.id !== id)
    this.setState({ list: updated })
  }

  editTask = id =>{
    const updated = this.state.list.map(i => {
      if (i.id === id) {
        i.modify= !i.modify
      }
      return i
    })
    this.setState({ list: updated })
  }

  editTaskContent =(e,id) =>{
    const updated = this.state.list.map(i => {
      if (i.id === id) {
        i.text= e.target.value
      }
      return i
    })
    this.setState({ list: updated })
  }

  showTasks = () => {
    if (this.state.list) {
      let tasks = this.state.list.filter(i => i.text.includes(this.state.input))
      if (this.state.completed) {
        tasks = tasks.filter(i => i.completed)
      }

      return tasks.map(i => (
        <TaskCard
          key={i.id}
          {...i}
          complete={this.completeTask}
          purge={this.deleteTask} 
          editTask={this.editTask}
          editContent={this.editTaskContent}/>
      ))
    } else {
      return
    }
  }

  render() {
    return (
      <div className="container">
        <div className="search-area">
          <input type="text" value={this.state.input} onChange={this.changeInputHandler} />
          <img src={plus} alt="add.." width="28px" height="28px" onClick={this.addTask} />
        </div>
        <label>Completed</label>
        <input type="checkbox" onClick={this.changeCompleteHandler} />
        {this.showTasks()}
      </div>
    );
  }

}

export default Todo;
