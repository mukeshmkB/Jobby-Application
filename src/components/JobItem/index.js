import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
    jobDescription,
  } = eachItem

  return (
    <Link className="job-item-link" to={`/jobs/${id}`}>
      <li className="job-list-item-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="job-role-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <IoIosStar size="18" color="#fbbf24" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="LES-container">
          <div className="locate-employmet-container">
            <div className="icon-container">
              <MdLocationOn size="20" color="#ffffff" />
              <p className="location-text">{location}</p>
            </div>
            <div className="icon-container">
              <BsBriefcaseFill size="20" color="#ffffff" />
              <p className="employment-text">{employmentType}</p>
            </div>
          </div>
          <div className="icon-container">
            <p className="salary-text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line-horizontal" />
        <h1 className="description-title">Description</h1>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
