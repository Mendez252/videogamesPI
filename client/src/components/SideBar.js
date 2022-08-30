import './styles/SideBar.css'
import Filter from './Filter'
import Order from './Order'
import Rating from './Rating'
import ApiCreated from './ApiCreated'
import {fetchVideogames} from '../redux/actions'
import { useDispatch } from 'react-redux'

const SideBar = () => {
    const dispatch = useDispatch()

    const onResetVideogames = () =>{
        dispatch(fetchVideogames())
    }

    return ( 
        <div className='sideBar_container'>
            <Filter/>
            <Order />
            <Rating/>
            <ApiCreated/>
            <button className='button_sidebar' onClick={onResetVideogames}>Reset videogames</button>
        </div>
     );
}
 
export default SideBar;