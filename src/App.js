import './App.css';
import AnimalList from './component/list'
import AnimalCreate from './component/create';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      list: false
    }

    this.fetchAnimalList = this.fetchAnimalList.bind(this)
  }

  async fetchAnimalList(){
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    const retValData = await fetch("https://animalrestapi.azurewebsites.net/Animal/List?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696", requestOptions)
    const theList = await retValData.json()
    this.setState({list: theList.list})
  }

  componentDidMount(){
    this.fetchAnimalList()
  }

  render(){
    return (
      <div className="App">
        <AnimalCreate loadAnimalList = {this.fetchAnimalList} />
        <AnimalList list = {this.state.list} loadAnimalList = {this.fetchAnimalList}/>
      </div>
    );
  }

}

export default App;
