import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [search, setSearch] = useState("I am batman");

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero" />
          <h1>
            Zahmetsizce Keyif Alacağınız{" "}
            <span className="text-gradient">Filmleri</span> Bulun
          </h1>
          <Search searchTerm={search} setSearchTerm={setSearch} />
        </header>
      </div>
    </div>
  );
}

export default App;
