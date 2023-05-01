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

// Prop destructuring
const List = ({searchTerm, list}) => (
    <ul>
        {list
        .filter(
          (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((filteredItem) => (
            <Item key={filteredItem.objectID} item={filteredItem} />
          )
        )}
      </ul>
  );

// Prop destructuring
const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title} </a>
    </span>
    <span>{item.author} </span>
    <span>{item.num_comments} </span>
    <span>{item.points} </span>
  </li>
)

export default App
