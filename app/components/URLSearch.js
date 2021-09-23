import React, {useEffect, useState} from 'react';
import axios from 'axios'

const URLSearch = () =>{
  const [url, setUrl] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResultsTotal, setSearchResultsTotal] = useState(null)
  const [showTable, setTable] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [currentSubmission, setSubmission] = useState({})


  const handleChange = (origin) => (e) => {
    if(origin==='url'){
      setUrl(e.target.value)
    }
    else if(origin==='searchTerm'){
      setSearchTerm(e.target.value)
    }
  }

  const cleanup  = () => {
    if(isError){
      setError(false)
    }
    if(showTable){
      setTable(false)
    }
    if(searchResultsTotal){
      setSearchResultsTotal(null)
    }
    setLoading(true)
    setSubmission({ url: url.slice(), searchTerm: searchTerm.slice(), time: generateTime()})
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    cleanup()
    try{
      const {data: newResultTotal} = await axios.post('http://localhost:1337/api', {
      url: url,
      searchTerm: searchTerm
    })
    if(newResultTotal==='Error'){
      setLoading(false)
      setError(true)
    }
    else{
      setSearchResultsTotal(newResultTotal)
      setLoading(false)
      setTable(true)
    }
    } catch(err){
      conosole.log(err)
    }
  }

  const generateTime = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    return time
  }

  const displayTable = () =>{
    const term = currentSubmission.searchTerm
    const site = currentSubmission.url
    const time = currentSubmission.time
    return (
      <div className="centered">
       <table>
         <tbody>
        <tr>
          <th>Search Term</th>
          <th>Target URL</th>
          <th>Number of Instances</th>
          <th>Time of Search</th>
        </tr>
        <tr>
          <td>{term}</td>
          <td>{site}</td>
          <td>{searchResultsTotal}</td>
          <td>{time}</td>
        </tr>
        </tbody>
      </table>
      </div>
    )
  }

  

  return (
    <div>
    <h3 className="centered">Enter a URL and a search term below:</h3>
    <form onSubmit={handleSubmit} className="centered">
      <label> URL: </label>
      <input value = {url} onChange={handleChange('url')}></input>
      <label> Search term: </label>
      <input value = {searchTerm} onChange={handleChange('searchTerm')}></input>
      <button type="submit">Submit</button>
    </form>
    {isLoading ? <h3 className='centered'>Loading...</h3> : null}
    {isError ? <h3 className='centered'>Invalid URL</h3> : null}
    {showTable ? displayTable() : null}
    </div>
  )
}

export default URLSearch
