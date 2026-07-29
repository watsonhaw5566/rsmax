export default {
  data: {
    inputValue: '',
    todos: [
      { id: 1, text: 'Learn RSmax JSX', completed: true },
      { id: 2, text: 'Build a Mini Program', completed: false },
      { id: 3, text: 'Deploy to WeChat', completed: false }
    ],
    nextId: 4
  },

  onLoad() {
    console.log('Todos page loaded');
  },

  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  addTodo() {
    const { inputValue, todos, nextId } = this.data;
    if (!inputValue.trim()) return;
    
    const newTodo = {
      id: nextId,
      text: inputValue.trim(),
      completed: false
    };
    
    this.setData({
      todos: [...todos, newTodo],
      inputValue: '',
      nextId: nextId + 1
    });
  },

  toggleTodo(e) {
    const id = e.currentTarget.dataset.id;
    const todos = this.data.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setData({ todos });
  },

  deleteTodo(e) {
    const id = e.currentTarget.dataset.id;
    const todos = this.data.todos.filter(todo => todo.id !== id);
    this.setData({ todos });
  },

  clearCompleted() {
    const todos = this.data.todos.filter(todo => !todo.completed);
    this.setData({ todos });
  },

  render() {
    const { inputValue, todos } = this.data;
    const completedCount = todos.filter(t => t.completed).length;
    const remainingCount = todos.length - completedCount;

    return (
      <view class="container">
        <view class="header">
          <text class="title">Todo List</text>
          <text class="stats">{remainingCount} items left</text>
        </view>

        <view class="input-area">
          <input 
            class="input" 
            placeholder="Add a new todo..." 
            value={inputValue}
            onInput={this.handleInput}
            onConfirm={this.addTodo}
          />
          <button class="add-btn" onClick={this.addTodo}>Add</button>
        </view>

        <view class="todo-list">
          {todos.map(todo => (
            <view class={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}>
              <view 
                class="todo-check" 
                data-id={todo.id} 
                onClick={this.toggleTodo}
              >
                {todo.completed ? (
                  <text class="check-icon">✓</text>
                ) : null}
              </view>
              <text class="todo-text">{todo.text}</text>
              <text 
                class="delete-btn" 
                data-id={todo.id} 
                onClick={this.deleteTodo}
              >×</text>
            </view>
          ))}
        </view>

        {completedCount > 0 ? (
          <view class="footer">
            <button class="clear-btn" onClick={this.clearCompleted}>
              Clear completed ({completedCount})
            </button>
          </view>
        ) : null}

        {todos.length === 0 ? (
          <view class="empty">
            <text class="empty-text">No todos yet! Add one above.</text>
          </view>
        ) : null}
      </view>
    );
  }
};
