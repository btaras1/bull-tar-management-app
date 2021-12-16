import './App.scss';
import { Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Main} from './lib/style/generalStyles';
import Dogs from './Pages/Dogs/Dogs';
import Mating from './Pages/Mating/Mating';
import Home from './Pages/Home/Home';
const App = () => {

  return (
    <>
      <Header/>
      <Main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/dog' component={Dogs}/>
            <Route path='/mating' component={Mating}/>
            </Switch>
      </Main>
      <Footer /> 
    </>
  );
}

export default App;
