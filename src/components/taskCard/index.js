import React, { Component } from 'react';
import Moment from 'react-moment';

//css
import '../../styles/main.css';

//icons
import edit from '../../media/edit.png';
import remove from '../../media/remove.png';

class TaskCard extends Component {


  render() {
    const {text,date, purge, completed, complete ,id} = this.props
    return (
      <div className="tasks">
        <div className="task">
            <div className='task-details'>
              <input type="checkbox" checked={completed} onClick={()=>complete(id)}/>
              <div>
                {completed?<p style={{textDecoration:'line-through'}}>{text}</p>:<p>{text}</p>}
                <p>Created on <Moment format="YYYY/MM/DD">{date}</Moment></p>
              </div>
            </div>
            <div className='task-options'>
            <img src={edit} alt="edit.." width="32px" height="32px"/>
            <img src={remove} alt="delete.." width="32px" height="32px" onClick={()=>purge(id)}/>
          </div>
        </div>
        </div>
    );
  }

}

export default TaskCard;
