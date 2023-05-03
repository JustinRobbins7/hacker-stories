/* eslint react/prop-types: 0 */
import './App.css'
import React from 'react'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

// Story reducer
const storiesReducer = (state, action) => {
  switch(action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      }
    default:
      throw new Error();
  }
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState)

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search', '')

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false },
  ) 

  React.useEffect(() => {
    if (!searchTerm) { return }

    dispatchStories({type: 'STORIES_FETCH_INIT'})

    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        })
    }).catch(() =>
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    );
  }, [searchTerm]); 
  

  const handleSearch = (event) => {
    console.log(event.target.value)
    // Set value
    setSearchTerm(event.target.value)
  }

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    })
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

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

      {stories.isError && <p> Something went wrong...</p>}

      {/* Ternary operator rendering */}
      {stories.isLoading ? (
            <p>Loading...</p>
          ) : ( 
            <List 
              list={stories.data} 
              onRemoveItem={handleRemoveStory} 
            /> 
          )
        }
      

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
