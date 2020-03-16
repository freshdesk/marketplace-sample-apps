$(document).ready(function () {
  app.initialized()
    .then(function (_client) {
      window.client = _client;
      client.events.on('app.activated',
        function () {
          ReactDOM.render(<div>
            <Todolist />
            <Todo />
          </div>
            , document.getElementById('mydiv'))
        });
    });
});

/**
 * React Component to list todo's 
 */
class Todolist extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: []
    };
    this.handleChecked = this.handleChecked.bind(this);
  }


  /**
   * Get list of Todo's on load
   */
  getList() {
    client.db.get("todos").then(todos =>
      this.setState({
        todos: todos.todos
      })
    )
      .catch(error =>
        this.handleError(error)
      )
  }

  handleError(error) {
    if (error.status === 400) {
      client.db.set('todos', { "todos": [] })
    }
  }

  /**
   * Handle checkbox's updated value
   * @param {number} index Index of curret todo
   */
  handleChecked(index) {
    let updateTodo = this.state.todos

    console.log('todo before checking', updateTodo);

    if (updateTodo[index].state == true) {
      updateTodo[index].state = false
      client.db.set('todos', { "todos": updateTodo })
    }
    if (updateTodo[index].state == false) {
      updateTodo[index].state = true
      client.db.set('todos', { "todos": updateTodo })
    }
  }

  render() {

    const { todos } = this.state;
    return (
      <div className="App">
        <h4>TODO</h4>
        {
          todos.map((todo, index) =>
            <div key={index}>
              <input checked={todo.state} type="checkbox" id={todo.index} onChange={() => this.handleChecked(index)} name={todo.index} value={todo.state} />
              <label for={todo.index}>{todo.todo}</label>
            </div>
          )
        }

      </div>
    );
  }a
}

/**
 * React Component to add Todos
 */
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: '', state: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value, state: false });
  }

  /**
   * function to handle todo submit
   * @param {object} event 
   */
  handleSubmit(event) {
    this.updateTodos(this.state)
    event.preventDefault();
  }

  /**
   * Update the status of todo 
   * @param {Object} todo current todo object
   */
  updateTodos(todo) {
    client.db.update("todos", "append", { "todos": [todo] }).then(
      function (data) {
        console.log('data Updated', data)
      },
      function (error) {
        console.error('error', error)
      });

  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
            <input type="text" value={this.state.todo} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
