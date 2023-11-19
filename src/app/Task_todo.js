
import { isEditable } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import './style.css';




function To_Do_Manager() {

    const [tasks, setTask] = useState([]);

    const [inputValue, setInputvalue] = useState("")

    function addData() {

        if (inputValue.length === 0) {
            return;
        }
        setTask([
            ...tasks,
            {
                content: inputValue,
                isComplete: false,
                isEditing: false
            }
        ]);

        setInputvalue("");
    }

    function deleteTask(taskIndex) {

        tasks.splice(taskIndex, 1)
        setTask([

            ...tasks

        ])
    }

    function markCompleted(taskIndex) {
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;

        setTask([
            ...tasks
        ])
    }

    function editTask(taskIndex) {
        tasks[taskIndex].isEditing = true;
        setTask([
            ...tasks
        ])
    }

    function updateValue(taskIndex, value) {

        tasks[taskIndex].content = value;
        setTask([
            ...tasks
        ])
    }

    function saveTask(taskIndex) {
        tasks[taskIndex].isEditing = false;
        setTask([
            ...tasks
        ])
    }


    return (
        <div class='task-manager '>


            <h1>Task Manager</h1>
            <div className="tasks">
                {
                    tasks.sort((a) => a.isComplete ? 1 : -1).map(
                        (task, index) =>
                         <div className={ (task.isComplete ? "completed" : "task") }key={index}>

                            <input type="checkbox" checked={task.isComplete} onChange={() => markCompleted(index)} />

                            {
                                task.isEditing ?

                                    <input className="edit-input" value={task.content} onChange={(event) => updateValue(index, event.target.value)} />

                                    :

                                    <span className="content">
                                        {
                                            task.isComplete ?
                                                <del>{task.content}</del> :
                                                task.content

                                        }
                                    </span>

 

                            }
                            {
                                task.isEditing ?
                                    <button className="save" onClick={() => saveTask(index)}>Save</button> :
                                    <button className='edit' onClick={() => editTask(index)}>Edit</button>

                            }

                            <button className="delete" onClick={() => deleteTask(index)}>Remove</button>
                        </div>
                    )

                }
            </div>
            <div className="add-task-container">
                <input value={inputValue} onChange={(event) => setInputvalue(event.target.value)} placeholder="Enter a task"/>
                <button onClick={addData}>Add task</button>
            </div>



        </div>

    )


}

export default To_Do_Manager;