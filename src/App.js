import './App.css';
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
import Bmicalc from './components/Bmicalc';
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Switch>
         <Route path="/" component={Register} exact={true}/>
         <Route path="/login" component={Login} exact={true}/>
         <Route path="/workout" component={Workout_done} exact={true}/>
         <Route path="/bmicalc" component={Bmicalc} exact={true}/>
     </Switch>
     </Router>
    </>
  );
}

export default App;
