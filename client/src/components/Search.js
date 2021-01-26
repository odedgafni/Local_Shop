import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchProducts, setProducts } from '../redux/actions/productActions'

const Search = () => {

  const dispatch = useDispatch();

  const searchResults = useSelector(state => state.searchProducts);
  const { results } = searchResults;

  const [searchInput, setSearchInput] = useState("")
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (searchInput.length > 0) {
      setShowSuggestions(true)
    }
    dispatch(searchProducts(searchInput))
  }, [searchInput, dispatch])

  const handleSearch = (results) => {
    dispatch(setProducts(results))
    setShowSuggestions(false)
    setSearchInput("")
    setActiveSuggestion(-1)
  }

  const onKeyDown = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
      if (results[activeSuggestion]) {
        dispatch(setProducts([results[activeSuggestion]]))
        setShowSuggestions(false)
        setSearchInput("")
        setActiveSuggestion(-1)
      } else {
        dispatch(setProducts(results))
        setShowSuggestions(false)
        setSearchInput("")
        setActiveSuggestion(-1)
      }
    } else if (e.keyCode === 40) {
      setShowSuggestions(true)
      setActiveSuggestion(activeSuggestion + 1)
    } else if (e.keyCode === 38) {
      setActiveSuggestion(activeSuggestion - 1)
    }
  }

  const suggestionList = (
    <div className="list-group col-xs-8 col-lg-6 p-0">
      {results && showSuggestions && results.length > 0 ?
        results.map((product, index) => {
          let className;
          if (index === activeSuggestion) {
            className = 'suggestion-active';
          }
          return (
            <button key={product._id} type="button" className={`list-group-item list-group-item-action ${className}`}
              onClick={() => handleSearch([product])}>{product.name}</button>
          )
        })
        :
        <div className="list-group-item list-group-item-action">
          <em>No suggestions available.</em>
        </div>
      }
    </div>
  )

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="input-group col-xs-8 col-lg-6 mt-3">
          <input className="form-control shadow-sm" type="text" placeholder="Search..."
            value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={onKeyDown} />
          <button className="btn btn-primary py-0"
            onClick={() => handleSearch(results)}>Submit</button>
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        {showSuggestions &&
          suggestionList}
      </div>
    </div>
  )
}

export default Search
