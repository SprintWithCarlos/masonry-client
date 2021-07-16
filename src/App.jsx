import { useContext, useState, useEffect } from "react";
import { Context } from "./context/Context";
import { Masonry } from "./components/masonry/Masonry";
import { Topbar } from "./components/topbar/Topbar";
import { Bouncing } from "./components/atoms/bouncing-three-dots-animation/Bouncing";
import "./app.css";
const host = process.env.REACT_APP_HOST || "http://localhost:5001/api/";
function App() {
  const [search, setSearch] = useState("");
  const { dispatch, isFetching, posts, error } = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "START_FETCHING" });
        const res = await fetch(host + "posts");
        if (!res.ok) {
          throw Error({ type: "initial load", message: res.statusText });
        }
        const data = await res.json();
        dispatch({ type: "FETCHING_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCHING_ERROR",
          payload: { type: "initial load", message: err.message },
        });
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      {isFetching && (
        <div className="fetchingData">
          <Bouncing
            dimensions={{ size: 20, height: 50, width: 100 }}
            color={"#3DB46D"}
            backgroundColor={"transparent"}
          />
          <p>Fetching Data...</p>
        </div>
      )}

      {error.type === "initial load" && (
        <div className="fetchingData">
          <p>
            🚫Something went wrong. Reload and wait some minutes if problem
            persist.
          </p>
        </div>
      )}
      {posts && (
        <>
          <Topbar setSearch={setSearch} />
          <main>
            <Masonry search={search} />
          </main>
          <footer>
            <p>
              created by{" "}
              <a
                href="https://sprintwithcarlos.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                Sprint With Carlos
              </a>
            </p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
