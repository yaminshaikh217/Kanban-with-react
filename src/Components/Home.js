import { useState, useRef } from "react";

const Home = () => {
  const [column, setcolumn] = useState([]);
  const [titlearr, settitlearr] = useState([]);
  const [change, setchange] = useState("");
  const inputRef = useRef();
  const addNewCol = () => {
    settitlearr([]);
    const note = {
      id: Date.now(),
    };
    column.push(note);
    setcolumn([...column]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!change) return
    const title = change;
    titlearr.push(title);
    settitlearr([...titlearr]);
    inputRef.current.value = "";
    setchange('')
    const actualTitle = titlearr;
    column[e.target.id] = {
      ...column[e.target.id],
      titles: actualTitle,
    };
  };
  return (
    <>
      <section className="grid-layout">
        <div className="add-note" onClick={addNewCol}>
          Add Column
        </div>
        {column.length > 0
          ? column?.map((curr, idx) => {
              return (
                <div className="box" key={idx} id={idx}>
                  <h2>TODO</h2>
                  {column[idx]?.titles?.map((curr, idx) => {
                    return (
                      <div className="tasks" key={idx}>
                        <p className="title">{curr}</p>
                      </div>
                    );
                  })}
                  <form onSubmit={handleSubmit} id={idx}>
                    <input
                      type="text"
                      placeholder="Add Task"
                      id={idx}
                      onChange={(e) => setchange(e.target.value)}
                      onBlur={() => settitlearr([])}
                      ref={inputRef}
                    />
                  </form>
                </div>
              );
            })
          : ""}
      </section>
    </>
  );
};

export default Home;
