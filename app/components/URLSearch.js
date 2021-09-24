import React, {useState} from 'react';
import axios from 'axios'

const URLSearch = () =>{
  const [url, setUrl] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResultsTotal, setSearchResultsTotal] = useState(null)
  const [showTable, setTable] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [currentSubmission, setSubmission] = useState({})

  //this function updates the input boxes as the user types in the UI for the form
  const handleChange = (origin) => (e) => {
    if(origin==='url'){
      setUrl(e.target.value)
    }
    else if(origin==='searchTerm'){
      setSearchTerm(e.target.value)
    }
  }

  //this function will cleanup state between searches
  const stateCleanup  = () => {
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
    //hold the submission in a separate piece of state, so that the table doesn't update with any further updates to the form inputs
    setSubmission({ url: url.slice(), searchTerm: searchTerm.slice(), time: generateTime()})
  }

  //this function does the work of making the post request for the user as soon as the user hits submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    stateCleanup()
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
      console.log(err)
    }
  }

  //this function generates the time of the scrape, to be shown in the table
  const generateTime = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    return time
  }

  //this function generates the table based on 
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
      <label> URL </label>
      <input value = {url} onChange={handleChange('url')}></input>
      <label> Search term: </label>
      <input value = {searchTerm} onChange={handleChange('searchTerm')}></input>
      <button type="submit">Submit</button>
    </form>
    <h4 className="centered">Please include full URL address</h4>
    {isLoading ? <h3 className='centered'>Loading...</h3> : null}
    {isError ? <h3 className='centered'>Invalid URL</h3> : null}
    {showTable ? displayTable() : null}
    </div>
  )
}

export default URLSearch
