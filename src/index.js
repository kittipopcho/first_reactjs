import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


let content = require('./news/news_content.json');
// import App from './App';
// import reportWebVitals from './reportWebVitals';



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
      
        <div className='menu-button'>
          {this.renderMenuButton('News')}
          {this.renderMenuButton('Regions')}
        </div>
      
    )
  }
}

class Content extends React.Component{
  renderContent(fromMenu, elementOrder){
    return (
      <div className='content-element'>
        <div className='content-title' value={fromMenu} order={elementOrder}>
          {content[fromMenu][elementOrder].title}
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
        <div className='menu'>
          <Menu onClick={(name) => this.menuClick(name)}/>
        </div>
        <div className='content'>
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

