import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from "axios";

let content = {}
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
    }, 1500);
  }
  
  search = () => {
    this.setState( prevState => ({ checked: !prevState.checked }));
    // send backend search request here ******
    this.props.parentSearchMenu(this.state.text)
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
  
  renderMenuButton = (name) => {
    return <button  className='menu-button'
    value={name}
    onClick={() => {this.props.onClick(name);}}>
      {name}
      </button>;
  }

  handleSearchMenu = (text) => {
    this.props.parentSearchAll(text)
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
            <Search parentSearchMenu={this.handleSearchMenu}/>
          </div>
        </div>
      
    )
  }
}



class ContentBody extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      fromMenu: "",
      search: "",
      contentInfo: {}
    }
  }

  renderContent(contentInfo){
    let e_key = Object.keys(contentInfo)
    // console.log('e_key = ')
    // console.log(e_key)
    let elements = []
    e_key.forEach(element => {
      // console.log('element = ')
      // console.log(element)
      let img_path = require('./news/images/' + contentInfo[element].image)
      elements.push(
        <div className='content-element'>
          <div>
            <div className='content-title'>
              <h1>
                {contentInfo[element].title}
              </h1>
            </div>
            <div >
              <img className='content-img' src={img_path}/>
            </div>
            <div>
              <p className='content-desc'>
                {contentInfo[element].content}
              </p>
            </div>
            <div className='content-update'>
              <p>
                Updated: {contentInfo[element].update}
              </p>
            </div>
            
          </div>
        </div>
      )
    });
    // console.log('elements = ')
    // console.log(elements)
    return (
      <div className='content-row'>
        {elements}
       
      </div>
    )
  }

  render() {
    console.log('this.props.dataFromMenu = ')
    console.log(this.props.dataFromMenu)
    console.log('this.props.searchFromMenu = ')
    console.log(this.props.searchFromMenu)
    let check = false
    if (this.props.dataFromMenu != "") {
      if (this.state.fromMenu !== this.props.dataFromMenu) {
        let url = 'http://127.0.0.1:3001/main/content/' + this.props.dataFromMenu
        // console.log('url = ')
        // console.log(url)
        axios.get(url).then(con => {
          this.setState({
            fromMenu: this.props.dataFromMenu,
            search: "",
            contentInfo: con.data
          })})
        console.log("wait response from backend for content type")
        return (<div></div>)
      } else {
        check = true
      }
    } else if(this.props.searchFromMenu != "") {
      if (this.state.search !== this.props.searchFromMenu) {
        let url = 'http://127.0.0.1:3001/main/search/' + this.props.searchFromMenu
        // console.log('url = ')
        // console.log(url)
        axios.get(url).then(con => {
          this.setState({
            fromMenu: "",
            search: this.props.searchFromMenu,
            contentInfo: con.data
          })})
        console.log("wait response from backend for content search")
        return (<div></div>)
      }else {
        check = true
      }
    } 
    if (check){
      console.log("content state changed !!! => ")
      return (
        <div>
          {this.renderContent(this.state.contentInfo)}
        </div>
      )
    }
  }
}

class All extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search: "",
      content: "News"
    }
  }

  menuClick(name) {
    // change content of body to the clicked one
    console.log('click ' + name)
    this.setState({
      search: "",
      content: name
    })
  }

  handleSearchAll = (text) => {
    console.log("search text at ALL = ")
    console.log(text)
    this.setState({
      search: text,
      content: ""
    })
  }

  render() {
    return (
      <div>
        
        <Menu onClick={(name) => this.menuClick(name)} parentSearchAll={this.handleSearchAll}/>
        
        <div className='content-c'>
          <ContentBody dataFromMenu={this.state.content} searchFromMenu={this.state.search}/>
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

