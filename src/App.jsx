import { useContext, useState } from 'react';
import { Context } from './context/Context';
import { Masonry } from './components/masonry/Masonry';
import { Topbar } from './components/topbar/Topbar';

function App() {
// const {user} = useContext(Context)
  const [search, setSearch] = useState('')
  return (
    <div className="App">
      <Topbar setSearch={setSearch }/>
      <Masonry search={search}/>
      

    </div>
  );

}

export default App;
