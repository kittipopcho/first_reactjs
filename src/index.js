import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


let content = require('./news/news_content.json');
// import App from './App';
// import reportWebVitals from './reportWebVitals';


class Search extends React.Component{
  constructor() {
    super();
    this.state = {
      text: '',
      checked: false
    };
    this.timer = null;
  }
  
  componentDidUpdate (prevProps, prevState) {
    if(prevState.text !== this.state.text) {
      this.handleSearchDelay();
    }
  }
  
  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  
  handleSearchDelay = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search();
    }, 2000);
  }
  
  search = () => {
    this.setState( prevState => ({ checked: !prevState.checked }));
    // send backend search request here ******
  }
  
  render () {
    return (
      <div className='menu-search-div'>
        <input className='menu-search' type='text' placeholder="Search" onChange={this.onChange} />
      </div>

    )
  }
}

class Menu extends React.Component{
  
  renderMenuButton(name){
    return <button  className='menu-button'
    value={name}
    onClick={() => {this.props.onClick(name);}}>
      {name}
      </button>;
  }

  render() {

    return (
        
        <div className='menu'>
          <div className='logo-div'>
            <img className='logo' src={require('./img/logo.png')}/>
          </div>
          <div className='menu-button-div'>
            {this.renderMenuButton('News')}
          </div>
          <div className='menu-button-div'>
            {this.renderMenuButton('Regions')}
          </div>
          <div className='menu-button-div'>
            {this.renderMenuButton('Videos')}
          </div>
          <div className='menu-button-div'>
            {this.renderMenuButton('TV')}
          </div>
          <div className='menu-button-div'>
            <Search />
          </div>
          
          
          
          
          {/* {this.renderSearchBox()} */}
        </div>
      
    )
  }
}

class Content extends React.Component{
  renderContent(fromMenu, elementOrder){
    let img_path = require('./news/images/' + content[fromMenu][elementOrder].image)
    return (
      <div className='content-element'>
        <div>
          <div className='content-title'>
            <h1>
              {content[fromMenu][elementOrder].title}
            </h1>
          </div>
          <div >
            <img className='content-img' src={img_path}/>
          </div>
          <div>
            <p className='content-desc'>
              {content[fromMenu][elementOrder].content}
            </p>
          </div>
          <div className='content-update'>
            <p>
            Updated: {content[fromMenu][elementOrder].update}
            </p>
          </div>
          
        </div>
      </div>
    )
  }

  render() {

    return (
      <div>
        <div className='content-row'>
          {this.renderContent(this.props.dataFromMenu, "a")}
          {this.renderContent(this.props.dataFromMenu, "b")}
          {this.renderContent(this.props.dataFromMenu, "c")}
          {this.renderContent(this.props.dataFromMenu, "d")}
          {this.renderContent(this.props.dataFromMenu, "a")}
          {this.renderContent(this.props.dataFromMenu, "b")}
          {this.renderContent(this.props.dataFromMenu, "c")}
          {this.renderContent(this.props.dataFromMenu, "d")}
          {this.renderContent(this.props.dataFromMenu, "a")}
          {this.renderContent(this.props.dataFromMenu, "b")}
          {this.renderContent(this.props.dataFromMenu, "c")}
          {this.renderContent(this.props.dataFromMenu, "d")}
        </div>
      </div>
    )
  }
}

class All extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      content: "News"
    }
  }


  menuClick(name) {
    // change content of body to the clicked one
    console.log('click ' + name)
    this.setState({
      content: name
    })
  }

  render() {

    return (
      <div>
        
        <Menu onClick={(name) => this.menuClick(name)}/>
        
        <div className='content-c'>
          <Content dataFromMenu={this.state.content}/>
        </div>
      </div>
      
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<All />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

