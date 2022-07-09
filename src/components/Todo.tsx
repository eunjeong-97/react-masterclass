import {ITodo} from '../atom';

function Todo({text}:ITodo) {
    return (
        <li>{text}
    <button>TO DO</button>
    <button>DOING</button>
    <button>DONE</button>
    </li>
    );
}

export default Todo;