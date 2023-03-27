import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://6403439c302b5d671c4ad1d6.mockapi.io/photo_collection?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            key={`_${index}`}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
