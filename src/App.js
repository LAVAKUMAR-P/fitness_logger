import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Workout_done from './components/Workout_done';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bmicalc from './components/Bmicalc';
import Home from './components/Home';
import WorkoutLog from './components/WorkoutLog';
function App() {
  return (
    <>
    <Router>
      <Switch>
         <Route path="/" component={Home} exact={true}/>
         <Route path="/register" component={Register} exact={true}/>
         <Route path="/login" component={Login} exact={true}/>
         <Route path="/workout" component={Workout_done} exact={true}/>
         <Route path="/bmicalc" component={Bmicalc} exact={true}/>
         <Route path="/workoutlog" component={WorkoutLog} exact={true}/>
     </Switch>
     </Router>
    </>
  );
}

export default App;
