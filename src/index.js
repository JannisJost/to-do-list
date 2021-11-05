import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.handleMakeMenuInvisible = this.handleMakeMenuInvisible.bind(this);
    this.handleMakeMenuIsVisible = this.handleMakeMenuIsVisible.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.state = {
      menuIsVisible: false,
      tasks: [
        { name: "First task", description: "Description of task" }
      ]
    };
  }
  handleMakeMenuIsVisible() {
    this.setState(
      { menuIsVisible: true });
  }
  handleMakeMenuInvisible() {
    this.setState(
      { menuIsVisible: false });
  }
  handleAddTask(name, description) {
    this.setState({
      tasks: this.state.tasks.concat(
        [
          { name: name, description: description }
        ]
      )
    });
  }
  render() {
    return (<div className="content"> <TaskOverview changeMenuIsVisible={this.handleMakeMenuIsVisible} menuIsVisible={this.state.menuIsVisible} tasks={this.state.tasks} />
      <NewTaskForm changeMenuIsVisible={this.handleMakeMenuInvisible} menuIsVisible={this.state.menuIsVisible} handleAddTask={this.handleAddTask} /></div>);
  }
}
class Task extends React.Component {
  render() {
    return (
      <div
        className="task">
        <h2 className="text-2xl	 w-full">{this.props.name}</h2>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }
    this.changeMenuIsVisible = this.changeMenuIsVisible.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  handleAddTask(e) {
    e.preventDefault();
    this.props.handleAddTask(this.state.name, this.state.description);
  }
  changeMenuIsVisible() {
    this.props.changeMenuIsVisible();
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  render() {

    return (

      <div className="wrapper">
        <div id="newToDo" className={`overlay ${this.props.menuIsVisible ? "menu-visible" : "menu"}`}>
          <div className="overlay-content bg-opacity-70 p-5 h-96 font-mono text-white bg-indigo-200 rounded-lg shadow-2xl mx-3 mt-3 text-center">
            <div className="flex place-content-end">
              <svg onClick={this.changeMenuIsVisible} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                className="bi bi-x-lg btn-close hover:text-indigo-500" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fillRule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
              </svg>
            </div>
            <form onSubmit={this.handleAddTask} className=" text-white">
              <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" className="focus:ring-2 ring-indigo-400" id="name" /><br />
              <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" className="focus:ring-2 ring-indigo-400" id="description" /><br />
              <input type="date" className="text-indigo-500 rounded-lg bg-indigo-200 shadow-inner mt-2 w-52 h-10" /><br />
              <select name="importancy"
                className="w-52 h-10 text-indigo-500 rounded-lg bg-indigo-200 shadow-inner mt-2 focus:ring-2 ring-indigo-400">
                <option value="important">Important</option>
                <option value="neutral">Neutral</option>
                <option value="lazy">Lazy</option>
              </select><br />
              <button type="submit" className="bg-indigo-600 rounded-lg p-2 mt-2 w-52">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Title extends React.Component {
  render() {
    return (
      <div
        className="h-20 text-gray-400 bg-gray-300 bg-opacity-70 backdrop-filter backdrop-blur rounded-lg shadow-2xl mx-3 mt-3 justify-center items-center flex">
        <div className="font-mono text-4xl m-auto text-center">To-do's</div>
      </div>
    );
  }
}
class TaskOverview extends React.Component {
  constructor(props) {
    super(props);
    this.changeMenuIsVisible = this.changeMenuIsVisible.bind(this);
  }

  changeMenuIsVisible() {
    this.props.changeMenuIsVisible();
  }
  render() {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div
            className="h-96 p-10 font-mono text-gray-400 bg-gray-200 bg-opacity-70 backdrop-filter backdrop-blur rounded-lg shadow-2xl mx-3 mt-3 text-center">
            <button
              className="shadow-inner text-xl rounded-full py-2 px-4 bg-transparent text-gray-400 mt-1 mb-1 transition-all duration-500 ease-in-out hover:text-indigo-400 hover:bg-indigo-100"
              onClick={this.changeMenuIsVisible}>+ new task</button>
            <div className="underline text-3xl">Pending</div>
            <div id="root">
              {this.props.tasks.map((item, index) => (
                <Task key={index} name={item.name} description={item.description} />
              ))}
            </div>
            <div className="underline text-3xl">Complete</div>
          </div>
        </div>
        <div>
          <div
            className="h-96 p-8  font-mono text-gray-50 mx-3 mt-3 text-center">
            <div className="shadow-2xl bg-indigo-600 h-full rounded-lg">
              <div className="font-sans text-indigo-100 text-3xl text-center rounded-t-lg">Up next</div>
              <div className="font-mono rounded-b-lg text-gray-400 h-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Content />
  </React.StrictMode>,
  document.getElementById('root')
);
