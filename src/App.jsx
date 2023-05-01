/* eslint react/prop-types: 0 */
import './App.css'



const App = () => {
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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search/>

      <hr/>

      <List list={stories}/>
    </div>
  )}


const Search = () => {
  const handleChange = (event) => {
    // Synthetic event
    console.log(event)
    // Value of target (here: input HTML element)
    console.log(event.target.value)
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      {/* Remember to pass the function itself, not the return value (e.g. handleChange())*/}
      <input id="search" type="text" onChange={handleChange}/>
    </div>
  );
}

const List = (props) => (
    <ul>
        {props.list.map((item) => (
            <Item key={item.objectID} item={item} />
          )
        )}
      </ul>
  );

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title} </a>
    </span>
    <span>{props.item.author} </span>
    <span>{props.item.num_comments} </span>
    <span>{props.item.points} </span>
  </li>
)

export default App
