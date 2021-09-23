import React, {useEffect, useState} from 'react';
import axios from 'axios'

const URLSearch = () =>{
  const [url, setUrl] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResultsTotal, setSearchResultsTotal] = useState(null)
  const [showTable, setTable] = useState(false)


  const handleChange = (origin) => (e) => {
    if(origin==='url'){
      setUrl(e.target.value)
    }
    else if(origin==='searchTerm'){
      setSearchTerm(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    console.log('submitted!!!')
    e.preventDefault()
    if(searchResultsTotal){
      setSearchResultsTotal(null)
    }
    const {data: newResultTotal} = await axios.post('http://localhost:1337/api', {
      url: url,
      searchTerm: searchTerm
    })
    setSearchResultsTotal(newResultTotal)
    setTable(true)
    //const {data: currentSearchResult} = await axios.get('http://localhost:1337/api')
    
  }

  const generateTime = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    return time
  }

  const displayTable = () =>{
    console.log('displayed!!!!!')
    let term = searchTerm.slice()
    let site = url.slice()
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
          <td>{generateTime()}</td>
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
    {showTable ? displayTable() : null}
    </div>
  )
}

export default URLSearch
