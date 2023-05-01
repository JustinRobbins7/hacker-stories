/* eslint react/prop-types: 0 */
import './App.css'
import React from 'react'



const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('');

  const stories = [
    {
      title: 'React',
      url: 'https://react.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ]

  const handleSearch = (event) => {
    console.log(event.target.value)
    // Set value
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <hr/>

      <List searchTerm={searchTerm} list={stories} />
    </div>
  )}

// Prop destructuring
const Search = ({onSearch, searchTerm}) => (
    <div>
      <label htmlFor="search">Search: </label>
      {/* Remember to pass the function itself, not the return value (e.g. handleChange())*/}
      <input id="search" type="text" onChange={onSearch}/>

      <p>Searching for <b>{searchTerm}</b></p>
    </div>
  );

const List = ({searchTerm, list}) => (
    <ul>
        {list
        .filter(
          (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase())
          ) // Object ID is extracted via rest operator (is rest since its on left side of func declaration)
          .map(({objectID, ...filteredItem}) => (
            // Item is sent spread arguments
            <Item key={objectID} {...filteredItem} />
          )
        )}
      </ul>
  );

// Props were spread
const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title} </a>
    </span>
    <span>{author} </span>
    <span>{num_comments} </span>
    <span>{points} </span>
  </li>
)

export default App
