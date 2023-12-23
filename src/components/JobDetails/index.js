import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const apistatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGESS',
}

class JobDetails extends Component {
  render() {
    const {jobDetailsList} = this.props

    return (
      <>
        <div className="jobs-search-container">
          <ul className="job-list-container">
            {jobDetailsList.map(eachItem => (
              <JobItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}
export default JobDetails
