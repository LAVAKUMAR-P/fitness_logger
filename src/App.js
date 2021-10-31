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
import Edit_Workout_done from './components/Edit_Workout_done';
import BmicalcEdit from './components/BmicalcEdit';
import Adminusers from './components/Adminusers';
import Forgotpassword from './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';
import Workout from './components/Workout';
import Adminworkout from './components/Adminworkout';
import EditworkoutA from './components/EditworkourA';
function App() {
  return (
    <>
    <Router>
      <Switch>
         <Route path="/" component={Login} exact={true}/>
         <Route path="/register" component={Register} exact={true}/>
         <Route path="/home" component={Home} exact={true}/>
         <Route path="/workout" component={Workout_done} exact={true}/>
         <Route path="/bmicalc" component={Bmicalc} exact={true}/>
         <Route path="/adminworkout" component={Workout} exact={true}/>
         <Route path="/adminworkoutall" component={Adminworkout} exact={true}/>
         <Route path="/admin" component={Adminusers} exact={true}/>
         <Route path="/workoutlog" component={WorkoutLog} exact={true}/>
         <Route path="/forgetpassword" component={Forgotpassword} exact={true}/>
         <Route path="/EditWorkout/:id" component={Edit_Workout_done} exact={true}/>
         <Route path="/Editbmi/:id" component={BmicalcEdit} exact={true}/>
         <Route path="/EditworkoutA/:id" component={EditworkoutA} exact={true}/>
         <Route path="/password-reset/:userId/:token" component={Resetpassword} exact={true}/>
     </Switch>
     </Router>
    </>
  );
}

export default App;
