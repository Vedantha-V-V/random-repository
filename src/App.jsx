import React,{ useState } from 'react'
import { languages } from './constants'
import { up, down } from './assets'
import Default from './components/Default'
import Loading from './components/Loading'
import Card from './components/Card'
import Error from './components/Error'
import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showError, setShowError] = useState(false)
  const [language, setLanguage] = useState("")
  const [repositoryData, setRepositoryData] = useState()
  const [repositories, setRepositories] = useState()

  function toggleLanguage(e){
    const lang = e.target.innerText
    setLanguage(lang)
    setShowDropdown(!showDropdown)
    findRepository(lang)
  }

  function toggleDropdown(){
    setShowDropdown(!showDropdown)
  }

  function generateRandomRepository(){
    if(showDropdown){
      setShowDropdown(!showDropdown)
    }
    const randomIndex = Math.floor(Math.random()*repositories.length)
    const newRepository = repositories[randomIndex]
    setRepositoryData(newRepository)
  }


  const findRepository = async (lang)=>{
    if(showError){
      setShowError(false)
    }
    setIsLoading(true)
    try{
      const url = `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc`
      const response = await fetch(url).then((data)=>{
        return data.json()
      })
      setIsLoading(false)
      setRepositories(response.items)
      setRepositoryData(response.items[0])
    }catch(e){
      console.log(e)
      setIsLoading(false)
      setShowError(true)
    }
  }
  return (<div className="container">
    <div className="header">
      <img src='./github.svg' alt='Github'/>
      <p>GitHub Repository Finder</p>
    </div>
    <div className='search'>
      <span>{language?language:'Select a Language'}</span>
      <img src={showDropdown?up:down} onClick={toggleDropdown} width={20} height={20}/>
    </div>
    {showDropdown?
      <div className='dropdown'>
        <div className="dropdown-content">
          {languages.map((lang)=>{
          return <span className='language' onClick={toggleLanguage}>{lang.value}</span>
        })}
        </div>
      </div>:<></>}
      {isLoading?<Loading/>:showError?
      <>
        <Error/>
        <button className="retry" onClick={findRepository}>Click to retry</button>
      </>:
      repositoryData?
      <>
        <Card data={repositoryData}/>
        <button className="refresh" onClick={generateRandomRepository}>Refresh</button>
      </>:<Default/>}

  </div>
  )
}

export default App