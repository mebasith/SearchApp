import React, {useEffect, useState} from 'react';
import axios from 'axios'

const URLSearch = () =>{
  const [url, setUrl] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


  const handleChange = (origin) => (e) => {
    if(origin==='url'){
      setUrl(e.target.value)
    }
    else if(origin==='searchTerm'){
      setSearchTerm(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const test = await axios.post('http://localhost:1337/api', {
      url: url,
      searchTerm: searchTerm
    })
    console.log(test)
    //const {data: currentSearchResult} = await axios.get('http://localhost:1337/api')
    
  }

  return (
    <div>
    <h3>Enter a URL and a search term below:</h3>
    <form onSubmit={handleSubmit}>
      <label> URL: </label>
      <input value = {url} onChange={handleChange('url')}></input>
      <label> Search term: </label>
      <input value = {searchTerm} onChange={handleChange('searchTerm')}></input>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default URLSearch
