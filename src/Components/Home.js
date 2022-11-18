import { useState, useRef } from "react";

const Home = () => {
  const [column, setcolumn] = useState([]);
  const [titlearr, settitlearr] = useState([]);
  const [change, setchange] = useState("");
  const inputRef = useRef();
  const headingRef = useRef();
  const [heading, setheading] = useState({
    title: "",
    isInput: true,
  });

  const addNewCol = () => {
    settitlearr([]);
    const note = {
      id: Date.now(),
    };
    column.push(note);
    setcolumn([...column]);
    setheading({
      title: "",
      isInput: true,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    const title = change;
    titlearr.push(title);
    settitlearr([...titlearr]);
    inputRef.current.value = "";
    const actualTitle = titlearr;
    column[e.target.id] = {
      ...column[e.target.id],
      titles: actualTitle,
    };
  };
  const handleHeading = (e) => {
    e.preventDefault();
    const heading = headingRef.current.value;
    const isInput = false;
    setheading({
      title: heading,
      isInput: isInput,
    });
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
                  {heading.isInput ? (
                    <form onSubmit={handleHeading}>
                      <input
                        type="text"
                        placeholder="Add List Name"
                        ref={headingRef}
                      />
                    </form>
                  ) : (
                    <h2>{heading.title}</h2>
                  )}
                  {column[idx]?.titles?.map((curr, idx) => {
                    return (
                      <div className="tasks" key={idx}>
                        <input type="checkbox" />
                        <label className="title">{curr}</label>
                      </div>
                    );
                  })}
                  <form onSubmit={handleSubmit} id={idx}>
                    <input
                      type="text"
                      placeholder="Add Task"
                      id={idx}
                      onChange={(e) => setchange(e.target.value)}
                      // onBlur={() => settitlearr([])}
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
