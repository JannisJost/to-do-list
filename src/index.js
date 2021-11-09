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
        { name: "My first task", description: "This task uses the importancy normal", importancy: "normal" }
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
  handleAddTask(name, description, importancy) {
    this.setState({
      tasks: this.state.tasks.concat(
        [
          { name: name, description: description, importancy: importancy }
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
        <div className="text-sm absolute"><ImportancyDot importancy={this.props.importancy} /></div>
        <h2 className="text-2xl	font-light w-full">{this.props.name}</h2>
        <p className="text-md">{this.props.description}</p>
      </div>
    );
  }
}
class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      importancy: 'normal'
    }
    this.changeMenuIsVisible = this.changeMenuIsVisible.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImportancyChange = this.handleImportancyChange.bind(this);
  }
  handleAddTask(e) {
    e.preventDefault();
    this.props.handleAddTask(this.state.name, this.state.description, this.state.importancy);
  }
  changeMenuIsVisible() {
    this.props.changeMenuIsVisible();
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleImportancyChange(event) {
    this.setState({ importancy: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  render() {

    return (

      <div className="wrapper">
        <div id="newToDo" className={`overlay ${this.props.menuIsVisible ? "menu-visible" : "menu"}`}>
          <div className="overlay-content p-5 h-96 font-mono text-indigo-300 bg-opacity-90 bg-white rounded-2xl shadow-2xl mx-3 mt-3 text-center">
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
              <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" className="focus:ring-2 ring-indigo-400" id="name" required /><br />
              <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" className="focus:ring-2 ring-indigo-400" id="description" required /><br />
              <select value={this.state.importancy} onChange={this.handleImportancyChange} name="importancy"
                className="text-center w-52 h-10 text-indigo-500 rounded-lg bg-indigo-200 shadow-inner mt-2 focus:ring-2 ring-indigo-400" required>
                <option value="important">Important</option>
                <option value="normal">Normal</option>
                <option value="lazy">Lazy</option>
              </select><br />
              <button type="submit" className="btn-custom bg-indigo-600 rounded-lg p-2 mt-2 w-52">Add</button>
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
        className="h-20 text-gray-400 bg-opacity-70 backdrop-filter backdrop-blur mx-3 mt-3 justify-center items-center flex">
        <div className=" m-auto text-center text-6xl">To-do's</div>
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
          <div className="m-5"><span className="pink-shadow align-middle bg-pink-600 text-gray-400 text-2xl title-tag">Pending</span></div>
          <div
            className="pink-shadow h-96 p-10 text-pink-100 bg-pink-600 bg-opacity-70 backdrop-filter backdrop-blur rounded-2xl shadow-2xl mx-3 mt-3 text-center">
            <div className="w-100 flex justify-end">
              <button
                className="shadow-inner text-2xl rounded-full py-2 px-4 bg-transparent text-pink-200 mt-1 mb-1 transition-all duration-500 ease-in-out hover:bg-pink-400"
                onClick={this.changeMenuIsVisible}>+ new</button></div>
            <div id="root" className="w-full">
              {this.props.tasks.map((item, index) => (
                <Task key={index} name={item.name} description={item.description} importancy={item.importancy} />
              ))}
            </div>
            <div className="text-3xl mt-5">Complete</div>
          </div>
        </div>
        <div className="pr-5">
          <div
            className="h-96 text-gray-50 mt-3">
            <div className="rounded-t-lg mt-5 mb-5"><span className="shadow-indigo align-middle bg-indigo-600 text-gray-400 text-2xl title-tag">Up next</span></div>
            <div className="shadow-indigo bg-indigo-600 bg-opacity-70 backdrop-filter backdrop-blur h-full rounded-2xl">
              <div className="font-mono rounded-b-lg text-gray-400 h-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class NormalDot extends React.Component {
  render() {
    return (
      <div
        className="dot-indicator bg-green-400 ">
      </div>
    );
  }
}
class ImportantDot extends React.Component {
  render() {
    return (
      <div
        className="dot-indicator  bg-red-700">
      </div>
    );
  }
}
class LazyDot extends React.Component {
  render() {
    return (
      <div
        className="dot-indicator  bg-yellow-400">
      </div>
    );
  }
}
function ImportancyDot(props) {
  const importancy = props.importancy;
  if (importancy === 'normal') {
    return <NormalDot />;
  }
  if (importancy === 'important') {
    return <ImportantDot />;
  }
  else {
    return <LazyDot />;
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Content />
  </React.StrictMode>,
  document.getElementById('root')
);
