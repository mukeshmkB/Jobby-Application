import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {eachItem} = props
  const {
    id,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    companyLogoUrl,
  } = eachItem

  return (
    <li className="similar-job-item-container">
      <div className="similar-company-logo-container">
        <img
          src={companyLogoUrl}
          className="similar-company-logo"
          alt="similar job company logo"
        />
        <div className="job-role-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <IoIosStar size="18" color="#fbbf24" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-title">Description</h1>
      <p className="similar-jobDescription">{jobDescription}</p>
      <div className="similar-LES-container">
        <div className="locate-employmet-container">
          <div className="similar-icon-container">
            <MdLocationOn size="20" color="#ffffff" />
            <p className="similar-location-text">{location}</p>
          </div>
          <div className="similar-icon-container">
            <BsBriefcaseFill size="20" color="#ffffff" />
            <p className="similar-employment-text">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
