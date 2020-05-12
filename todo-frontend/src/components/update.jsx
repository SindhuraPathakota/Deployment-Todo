import React from 'react';
const UpdateTask = (props) => {
    return ( 

        <div className="update">
            <input> {props.task.title}</input>
            <button>save</button>
        </div>
     );
}
 
export default UpdateTask;