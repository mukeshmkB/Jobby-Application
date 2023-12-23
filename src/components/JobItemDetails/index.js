import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarDataList: [],
    skillsList: [],
    companyLife: {},
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetailsItem()
  }

  getJobDetailsItem = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobAllDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const {jobAllDetails, similarJobs} = updatedData

      const updatedsimilarData = similarJobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const updatedJobsData = {
        id: jobAllDetails.id,
        companyLogoUrl: jobAllDetails.company_logo_url,
        companyWebsiteUrl: jobAllDetails.company_website_url,
        employmentType: jobAllDetails.employment_type,
        jobDescription: jobAllDetails.job_description,
        location: jobAllDetails.location,
        packagePerAnnum: jobAllDetails.package_per_annum,
        rating: jobAllDetails.rating,
        title: jobAllDetails.title,
        lifeAtCompany: jobAllDetails.life_at_company,
        skills: jobAllDetails.skills,
      }
      const {lifeAtCompany, skills} = updatedJobsData
      console.log(lifeAtCompany)
      const updatedSkillsData = skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      const updatedCompanyLife = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      this.setState({
        jobDetails: updatedJobsData,
        similarDataList: updatedsimilarData,
        skillsList: updatedSkillsData,
        companyLife: updatedCompanyLife,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetailsItem()
  }

  renderSuccessView = () => {
    const {jobDetails, similarDataList, skillsList, companyLife} = this.state
    const {description, imageUrl} = companyLife
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <Header />
        <div className="job-item-container">
          <div className="job-details-company-logo-container">
            <img
              src={companyLogoUrl}
              className="job-details-company-logo"
              alt="job details company logo"
            />
            <div className="job-details-role-container">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-container">
                <IoIosStar size="18" color="#fbbf24" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-LES-container">
            <div className="job-details-locate-employmet-container">
              <div className="job-details-icon-container">
                <MdLocationOn size="20" color="#ffffff" />
                <p className="job-details-location-text">{location}</p>
              </div>
              <div className="job-details-icon-container">
                <BsBriefcaseFill size="20" color="#ffffff" />
                <p className="job-details-employment-text">{employmentType}</p>
              </div>
            </div>
            <div className="job-details-icon-container">
              <p className="job-details-salary-text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line-horizontal" />
          <h1 className="job-details-description-title">Description</h1>
          <p className="job-details-description">{jobDescription}</p>
          <p className="skill-text">Skills</p>
          <ul className="skill-list-item-container">
            {skillsList.map(eachItem => (
              <SkillItem eachItem={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="skill-text">Life at Company</h1>
          <div className="company-life-container">
            <p className="company-description">{description}</p>
            <img
              src={imageUrl}
              className="company-image"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-job-container">
          <h1 className="similarjob-text">Similar Jobs</h1>
          <ul className="similar-job-item-list-container">
            {similarDataList.map(eachItem => (
              <SimilarJobItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="failure-image"
        />
        <h1 className="failure-title-text">Oops! Something Went Wrong</h1>
        <p className="failure-msg">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )

  renderProgressView = () => (
    <div className="progress-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()

      case apiStatusConstant.failure:
        return this.renderFailureView()

      case apiStatusConstant.inProgress:
        return this.renderProgressView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="job-details-item-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
