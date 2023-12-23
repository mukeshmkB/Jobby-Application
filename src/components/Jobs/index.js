import {Component} from 'react'
import Cookies from 'js-cookie'
import {FiSearch} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import JobDetails from '../JobDetails'
import Header from '../Header'

import './index.css'

const apistatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGESS',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobDetailsList: [],
    selectedEmploymentType: [],
    salaryType: '',
    searchInput: '',
    apiStatusProfile: apistatusConstant.initial,
    apiStatusJobs: apistatusConstant.initial,
  }

  componentDidMount() {
    this.getProfileDetails()

    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatusJobs: apistatusConstant.inProgress})

    const {selectedEmploymentType, salaryType, searchInput} = this.state
    const selectedQuery = selectedEmploymentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedQuery}&minimum_package=${salaryType}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      if (data.jobs.length === 0) {
        this.setState({apiStatusJobs: apistatusConstant.noJobs})
      } else {
        this.setState({
          jobDetailsList: updatedData,
          apiStatusJobs: apistatusConstant.success,
        })
      }
    } else {
      this.setState({apiStatusJobs: apistatusConstant.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({apiStatusProfile: apistatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileData = data.profile_details
      const updateData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileDetails: updateData,
        apiStatusProfile: apistatusConstant.success,
      })
    } else {
      this.setState({apiStatusProfile: apistatusConstant.failure})
    }
  }

  onClickChecked = event => {
    const {selectedEmploymentType} = this.state

    const userInput = event.target.value
    const existedEmployeItem = [...selectedEmploymentType]
    const isInclude = existedEmployeItem.includes(userInput)

    if (isInclude) {
      const findIndex = existedEmployeItem.findIndex(
        eachItem => eachItem === userInput,
      )
      const originalEmployeList = existedEmployeItem.splice(findIndex, 1)
      this.setState(
        {selectedEmploymentType: existedEmployeItem},
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentType: [
            ...prevState.selectedEmploymentType,
            userInput,
          ],
        }),
        this.getJobDetails,
      )
    }
  }

  onClickSalary = event => {
    this.setState({salaryType: event.target.value}, this.getJobDetails)
  }

  onChangesearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    this.getJobDetails()
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderJobSucessView = () => {
    const {salaryRangesList, employmentTypesList} = this.props

    const {profileDetails, selectedEmploymentType, jobDetailsList, salaryType} = this.state

    return (
      <>
        <JobDetails jobDetailsList={jobDetailsList} />
      </>
    )
  }

  renderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-title-text">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" onClick={this.onClickRetry} type=" button">
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="jobs"
      />
      <h1 className="no-jobs-title">No Jobs Found</h1>
      <p className="no-jobs-meassge">
        We could not find any jobs.Try other filters
      </p>
    </div>
  )

  renderJobProgressView = () => (
    <div className="jobs-inprogress-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderjobsDetails = () => {
    const {apiStatusJobs} = this.state

    switch (apiStatusJobs) {
      case apistatusConstant.success:
        return this.renderJobSucessView()
      case apistatusConstant.failure:
        return this.renderJobFailureView()
      case apistatusConstant.noJobs:
        return this.renderNoJobsView()
      case apistatusConstant.inProgress:
        return this.renderJobProgressView()

      default:
        return null
    }
  }

  successProfileView = () => {
    const {
      profileDetails,
      selectedEmploymentType,
      jobDetailsList,
      salaryType,
      apiStatusJobs,
    } = this.state

    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <p className="profile-name">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  failureProfileView = () => (
    <div className="profile-failure-container">
      <button className="retry-btn" onClick={this.onClickRetry} type=" button">
        Retry
      </button>
    </div>
  )
  profileProgressView = () => (
    <div className="profile-progress-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apistatusConstant.success:
        return this.successProfileView()
      case apistatusConstant.failure:
        return this.failureProfileView()
      case apistatusConstant.inProgress:
        return this.profileProgressView()
      default:
        return null
    }
  }

  render() {
    const {salaryRangesList, employmentTypesList} = this.props

    const {
      profileDetails,
      selectedEmploymentType,
      jobDetailsList,
      salaryType,
      apiStatusJobs,
      apiStatusProfile,
    } = this.state

    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-finds-container">
            <div className="profile-container">
              {this.renderProfileDetails()}

              <hr className="line-separator" />
              <div className="employment-contianer">
                <h1 className="employement-title">Type of Employment</h1>
                <ul className="employement-list-container">
                  {employmentTypesList.map(eachItem => (
                    <li
                      className="employment-item"
                      key={eachItem.employmentTypeId}
                    >
                      <input
                        type="checkbox"
                        id={`checkBox${eachItem.employmentTypeId}`}
                        onClick={this.onClickChecked}
                        value={eachItem.employmentTypeId}
                      />
                      <label
                        className="checkbox-label"
                        id={`checkBox${employmentTypesList.employmentTypeId}`}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="line-separator" />
              <div className="employment-contianer">
                <h1 className="employement-title">Salary Range</h1>
                <ul className="employement-list-container">
                  {salaryRangesList.map(eachItem => (
                    <li
                      className="employment-item"
                      key={eachItem.salaryRangeId}
                    >
                      <input
                        type="radio"
                        id={`radio${eachItem.salaryRangeId}`}
                        onClick={this.onClickSalary}
                        value={eachItem.salaryRangeId}
                        name="radio"
                      />
                      <label
                        className="checkbox-label"
                        id={`radio${employmentTypesList.salaryRangeId}`}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-details-container">
              <div className="search-container">
                <label htmlFor="searchInput" className="visually-hidden">
                  Search
                </label>
                <input
                  type="search"
                  id="searchInput"
                  className="search-Input"
                  placeholder="search"
                  onChange={this.onChangesearchInput}
                />

                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon"
                  onClick={this.onClickSearchInput}
                  aria-label="serach"
                >
                  <FiSearch color="white" size="16" />
                </button>
              </div>

              {this.renderjobsDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
