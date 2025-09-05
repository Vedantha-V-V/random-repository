import { pointer } from '../assets'
import { colorCodes } from '../constants'
import './Card.css'

const Card = ({data}) => {
  return (
    <div className="card">
      <div className="heading">
        <span>{data.name}</span>
        <a href={data.homepage} target='_blank'><img src={pointer} alt="pointer" width={20} height={20}/></a>
      </div>
      <div className="content">
        <span>{data.description.substring(0,100)}..</span>
      </div>
      <div className="footer">
        <div className="language-tag">
          <div className="color" style={{backgroundColor:colorCodes[data.language]?colorCodes[data.language]:"white"}}>&nbsp;</div>
          <span>{data.language}</span>
        </div>
        <div className='footer-tags'>
          <img src='src/assets/star.svg' width={20} height={20}/>
          <span>{data.stargazers_count}</span>
        </div>
        <div className='footer-tags'>
          <img src='src/assets/fork.svg' width={20} height={20}/>
          <span>{data.forks}</span>
        </div>
        <div className='footer-tags'>
          <img src='src/assets/error.svg' width={20} height={20}/>
          <span>{data.open_issues_count}</span>
        </div>
      </div>
    </div>
  )
}

export default Card