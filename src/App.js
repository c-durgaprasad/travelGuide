import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TravelPlace from './components/TravelPlace'
import './App.css'

// Replace your code here
const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class App extends Component {
  state = {guideList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount = () => {
    this.getTravelDetails()
  }

  getTravelDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const api = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    const updatedData = data.packages.map(item => ({
      id: item.id,
      description: item.description,
      name: item.name,
      imageUrl: item.image_url,
    }))

    if (response.ok === true) {
      this.setState({
        guideList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderGuideList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {guideList} = this.state
    return (
      <ul className="ul-list">
        {guideList.map(eachPlace => (
          <TravelPlace eachPlace={eachPlace} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="travel-guide">Travel Guide</h1>
        {this.renderGuideList()}
      </div>
    )
  }
}

export default App
