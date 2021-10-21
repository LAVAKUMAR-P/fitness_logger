import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Workout_done from './components/Workout_done';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Switch>
         <Route path="/" component={Register} exact={true}/>
         <Route path="/login" component={Login} exact={true}/>
         <Route path="/workout" component={Workout_done} exact={true}/>
     </Switch>
     </Router>
    </>
  );
}

export default App;
