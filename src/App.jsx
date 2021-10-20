import React, { useState, useEffect } from "react"

const App = () => {

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/films')
            .then(res => res.json())
            .then(allFilms => setFilms(allFilms))
    }, [])

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/people')
            .then(res => res.json())
            .then(people => {
                people.forEach(person => {
                    fetch(person.films[0])
                        .then(res => res.json())
                        .then(film => person.image = film.image)
                })

                setPeople(people)
            })
    }, []);

    const [films, setFilms] = useState([])
    const [filmsClicked, setFilmsClicked] = useState(false)

    const [people, setPeople] = useState([])
    const [peopleClicked, setPeopleClicked] = useState(false)

    const toggleFilmsButton = () => {
        setFilmsClicked(true)
    }

    const togglePeopleButton = () => {
        setPeopleClicked(true)
    }

    if (filmsClicked) {
        return (
            <main className="container">
                <section className="row justify-content-space-between mt-5">
                    {films.map(film => (
                        <div className="col-md-6" key={`film-card-${film.id}`}>
                            <div className="card shadow my-2">
                                <img src={film.image} alt="" />
                                <div className="card-body">
                                    <h4 className="card-title">{film.title}</h4>
                                    <h5 className="card-subtitle mb-2">{film.original_title}</h5>
                                    <p className="card-subtitle text-muted mt-2">{film.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        )
    } else if (peopleClicked) {
        return (
            <main className="container">
                <section className="row justify-content-space-between mt-5">
                    {people.map(person => (
                        <div className="col-md-6" key={`film-card-${person.id}`}>
                            <div className="card shadow my-2">
                                <img src={person.image} alt="" />
                                <div className="card-body">
                                    <h4 className="card-title">{person.name}</h4>
                                    <h5 className="card-subtitle">{person.age}</h5>
                                    <h6 className="card-text text-muted pt-2">{person.gender}</h6>
                                    <a href={person.films} target="_blank" rel="noreferrer" className="btn btn-info mr-2">FILMS</a>
                                    <a href={person.url} target="_blank" rel="noreferrer" className="btn btn-info mr-2">JSON</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        )
    }

    return (
        <div className="row justify-content-center mt-5">
            <button type="button" className="btn btn-outline-success m-1" onClick={toggleFilmsButton}>Load Films</button>
            <button type="button" className="btn btn-outline-success m-1" onClick={togglePeopleButton}>Load People</button>
        </div>
    )
}

export default App