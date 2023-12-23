import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickJob = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container-sm">
        <div className="home-content-container-sm">
          <h1 className="job-title">Find The Job that Fits Your Life</h1>
          <p className="job-description">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your ablities and potential.
          </p>
          <button className="job-button" onClick={onClickJob} type=" button">
            Find Jobs
          </button>
        </div>
      </div>
      <div className="home-container-lg">
        <div className="home-content-container-lg">
          <h1 className="job-title-home">Find The Job that Fits Your Life</h1>
          <p className="job-description">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your ablities and potential.
          </p>
          <button className="job-button" onClick={onClickJob} type=" button">
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
