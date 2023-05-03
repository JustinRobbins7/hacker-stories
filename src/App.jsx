/* eslint react/prop-types: 0 */
import './App.css'
import React from 'react'

const initialStories = [
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

// Async Data
const getAsyncStories = () => (
  // Shorthand
  // Promise.resolve({ data: { stories: initialStories } })

  new Promise((resolve) => 
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  )
)


// Custom Hook
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState)

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

const App = () => {
  const [stories, setStories] = React.useState([]) 

  React.useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
    });
  }, []);
  

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React')

  const handleSearch = (event) => {
    console.log(event.target.value)
    // Set value
    setSearchTerm(event.target.value)
  }

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    )
    setStories(newStories)
  }

  const searchedStories = stories.filter(
    (story) => (story.title.toLowerCase().includes(searchTerm.toLowerCase() || story.author.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* Component previously known as Search */}
      {/* Can use split declaration and pass between value as children */}
      <InputWithLabel 
        id='search'
        type='text'
        value={searchTerm} 
        isFocused
        onInputChange={handleSearch} 
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr/>

      <List 
        searchTerm={searchTerm} 
        list={searchedStories} 
        onRemoveItem={handleRemoveStory}
      />

    </div>
  )}

// Component previously known as Search
// Can leverage child value
const InputWithLabel = ({id, type = 'text', value, isFocused, onInputChange, children}) => (
    <> 
      <label htmlFor={id}>{children}</label>
      {/* Remember to pass the function itself, not the return value (e.g. handleChange())*/}
      <input 
        id={id} 
        type={type} 
        value={value} 
        autoFocus={isFocused}
        onChange={onInputChange}/>
    </>
  );


const List = ({ list, onRemoveItem }) => (
    <ul>
        {list.map((item) => (
            <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        ))}
      </ul>
  );

const Item = ({ item, onRemoveItem }) => (
    <li>
      <span>
        <a href={item.url}>{item.title} </a>
      </span>
      <span>{item.author} </span>
      <span>{item.num_comments} </span>
      <span>{item.points} </span>
      {/* Bind arguments directly into handler callback to avoid declaration of a handler in Item with java .bind (onRemoveItem.bind(null, item)) or arrow function*/}
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
    </li>
  )


  

export default App
