import {Route} from 'react-router-dom'
import Landing from "./Components/Landing/Landing"
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer';
import Detail from './Components/Detail/Detail';
import CreateVideoGame from './Components/CreateVideoGame/CreateVideoGame';
// import Error404 from './Components/Error404/Error404';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={Landing}/>
      <Route path="/home" component={Nav}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/home/detail/:id" component={Detail}/>
      <Route path="/home/createvideogame" component={CreateVideoGame}/>
      <Route path="/home" component={Footer}/>
      {/* <Route render={() => <Error404/>}/> */}
      
    </div>
  );
}

export default App;
