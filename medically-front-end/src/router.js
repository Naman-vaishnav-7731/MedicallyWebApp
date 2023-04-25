import {Route , Routes} from 'react-router-dom';
import Home from './components/main/home';
import Main from './components/main/main';
import Login from './components/login/login';
import Registration from './components/registration/registration';
import Pagenotfound from './components/pagenotfound';

const Routers = () =>  {
    return(
        <Routes>
            {/* Implement Spreate Login Route */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Registration />} />

            {/* Implement Nested Routing*/}
            <Route path='/' element={<Main />}>
                <Route index element={<Home />} />
            </Route>
            <Route path='*' element={<Pagenotfound />} />
            
        </Routes>
    )
}

export default Routers;
