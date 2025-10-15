import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For better experience download the<br /> Food Delivery App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="img" />
            <img src={assets.app_store} alt="img" />
        </div>
    </div>
  )
}

export default AppDownload