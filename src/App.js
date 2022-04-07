import './App.css';
import AnimalList from './component/list'
import AnimalCreate from './component/create';

function App() {
  return (
    <div className="App">
      <AnimalCreate/>
      <AnimalList/>
    </div>
  );
}

export default App;
