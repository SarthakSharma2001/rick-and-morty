import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [characters, setCharacters] = useState([])
    const [query, setQuery] = useState("")
    const [nextPageUrl, setNextPageUrl] = useState("")
    const [prevPageUrl, setPrevPageUrl] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
                setCharacters(data.results)
                setPrevPageUrl(data.info.prev)
                setNextPageUrl(data.info.next)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [query])

    const handlePrevPage = async () => {
      try {
          const {data} = await axios.get(prevPageUrl)
          setCharacters(data.results)
          setPrevPageUrl(data.info.prev)
          setNextPageUrl(data.info.next)
      } catch (error) {
          console.error(error)
      }
    }
    const handleNextPage = async () => {
      try {
          const {data} = await axios.get(nextPageUrl)
          setCharacters(data.results)
          setPrevPageUrl(data.info.prev)
          setNextPageUrl(data.info.next)
      } catch (error) {
          console.error(error)
      }
    }

    return (
        <div className="App">
            <div className="search">
                <input type="text"
                       placeholder={"Search Character"}
                       className={"input"}
                       onChange={event => setQuery(event.target.value)}
                       value={query}
                />
            </div>
            <div className="results">
                {characters.map(character => (
                    <div>
                        <img src={character.image} alt={character.name}/>
                        {character.name}
                    </div>
                ))}
            </div>
            {prevPageUrl && (
                    <button className="pagination-button" onClick={handlePrevPage}>
                        Previous
                    </button>
                )}
                {nextPageUrl && (
                    <button className="pagination-button" onClick={handleNextPage}>
                        Next
                    </button>
                )}
        </div>
    );
}

export default App;
