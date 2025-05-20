import React, { useState, useEffect } from "react";
import "./App.css";
import YearDollarChart from "./components/YearDollarChart";
import MineDollarChart from "./components/MineDollarChart";

function App() {
  const [toggle, setToggle] = useState(false);
  const [yourGold, setYourGold] = useState(null);
  const [buyinPrice, setBuyinPrice] = useState(null);
  const [saves, setSaves] = useState(
    localStorage.getItem("gold-app-saves") != null
      ? JSON.parse(localStorage.getItem("gold-app-saves"))
      : {
          usergold: [],
          usersaves: [],
        }
  );

  const add = () => {
    if (
      window.confirm(
        `Date: ${data.updatedAt.replaceAll("-", "/").slice(0, 10)} - Price: ${(
          data.price / 31.1035
        ).toFixed(2)} - Save to your data?`
      )
    ) {
      setSaves((prev) => ({
        ...prev,
        usersaves: [
          ...prev.usersaves,
          {
            name: data.name,
            price: (data.price / 31.1035).toFixed(2),
            date: data.updatedAt.replaceAll("-", "/").slice(0, 10),
          },
        ],
      }));
    }
  };
  const del = (e) => {
    if (window.confirm("Do you want to delete this gold date?")) {
      const nex = saves.usersaves;
      nex.splice(e.target.id, 1);
      setSaves((prev) => ({
        ...prev,
        usersaves: nex,
      }));
    }
  };
  const clear = () => {
    if (saves.usersaves.length == 0) {
      alert("Empty");
    }
    if (
      saves.usersaves.length > 0 &&
      window.confirm("Delete all your gold dates?")
    ) {
      setSaves((prev) => ({
        ...prev,
        usersaves: [],
      }));
    }
  };

  const addGold = () => {
    setSaves((prev) => ({
      ...prev,
      usergold: [
        ...prev.usergold,
        {
          yg: yourGold,
          bp: buyinPrice,
        },
      ],
    }));
    setYourGold(null);
    setBuyinPrice(null);
  };

  const delGold = (e) => {
    if (window.confirm("Do you want to delete this gold buy data?")) {
      const nex = saves.usergold;
      nex.splice(e.target.id, 1);
      setSaves((prev) => ({
        ...prev,
        usergold: nex,
      }));
    }
  };
  //save to local storagewhen changing saves
  useEffect(() => {
    localStorage.setItem("gold-app-saves", JSON.stringify(saves));
  }, [saves]);
  //if saves is empty remove saves from local storage
  window.addEventListener("beforeunload", function (e) {
    if (saves.usergold == [] && saves.usersaves == []) {
      localStorage.removeItem("gold-app-saves");
    }
    e.preventDefault();
  });

  const goldhistory = [
    { year: 1976, price: 5.4 },
    { year: 1977, price: 6.6 },
    { year: 1978, price: 8.4 },
    { year: 1979, price: 15.8 },
    { year: 1980, price: 21.2 },
    { year: 1981, price: 16.3 },
    { year: 1982, price: 14.8 },
    { year: 1983, price: 13.5 },
    { year: 1984, price: 11.3 },
    { year: 1985, price: 11.8 },
    { year: 1986, price: 13.3 },
    { year: 1987, price: 14.9 },
    { year: 1988, price: 14.0 },
    { year: 1989, price: 14.9 },
    { year: 1990, price: 15.3 },
    { year: 1991, price: 13.6 },
    { year: 1992, price: 12.9 },
    { year: 1993, price: 12.8 },
    { year: 1994, price: 12.0 },
    { year: 1995, price: 11.9 },
    { year: 1996, price: 12.6 },
    { year: 1997, price: 11.2 },
    { year: 1998, price: 9.6 },
    { year: 1999, price: 9.0 },
    { year: 2000, price: 9.1 },
    { year: 2001, price: 9.3 },
    { year: 2002, price: 10.4 },
    { year: 2003, price: 12.5 },
    { year: 2004, price: 13.6 },
    { year: 2005, price: 14.4 },
    { year: 2006, price: 18.8 },
    { year: 2007, price: 20.7 },
    { year: 2008, price: 25.4 },
    { year: 2009, price: 30.7 },
    { year: 2010, price: 40.2 },
    { year: 2011, price: 50.5 },
    { year: 2012, price: 54.3 },
    { year: 2013, price: 45.5 },
    { year: 2014, price: 41.2 },
    { year: 2015, price: 36.5 },
    { year: 2016, price: 41.0 },
    { year: 2017, price: 42.5 },
    { year: 2018, price: 41.0 },
    { year: 2019, price: 45.0 },
    { year: 2020, price: 59.0 },
    { year: 2021, price: 57.0 },
    { year: 2022, price: 61.5 },
    { year: 2023, price: 63.0 },
    { year: 2024, price: 68.0 },
  ];
  // fetch
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.gold-api.com/price/XAU")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //
  return (
    <div className="app">
      <div className="menu">
        <h3>{data.name} 💰</h3>
        <p>{(data.price / 31.1035).toFixed(2)} $/1 gr.</p>
        <p>{data.updatedAt.replaceAll("-", "/").slice(0, 10)}</p>
        {!toggle ? (
          <button onClick={() => add()}>📥</button>
        ) : (
          <button>⛔</button>
        )}
        {!toggle ? (
          <button onClick={() => clear()}>🗑️</button>
        ) : (
          <button>⛔</button>
        )}
        <button onClick={() => (!toggle ? setToggle(true) : setToggle(false))}>
          ✍
        </button>

        <div className="menu-your-stats">
          <p>Your gold: </p>
          <p>
            {saves.usergold.length > 0 &&
              saves.usergold.reduce((sum, item) => sum + Number(item.yg), 0)}
          </p>
          <p>gr.</p>
        </div>
        <div className="menu-your-stats">
          <p>Buying price: </p>
          <p>
            {saves.usergold.length > 0 &&
              saves.usergold.reduce(
                (sum, item) => sum + Number(item.bp),
                0
              )}{" "}
          </p>
          <p>$</p>
        </div>
        <div className="menu-your-stats">
          <p>Value now: </p>
          <p>
            {saves.usergold.length > 0 &&
              (
                saves.usergold.reduce((sum, item) => sum + Number(item.yg), 0) *
                (data.price / 31.1035)
              ).toFixed(2)}{" "}
          </p>
          <p> $</p>
        </div>
      </div>
      {toggle && (
        <div className="yourgold">
          <div className="yourgold-controls">
            {" "}
            <div>
              <input
                type="number"
                onChange={(e) => setYourGold(e.target.value)}
                value={yourGold}
              />{" "}
              grams
            </div>
            <div>
              <input
                type="number"
                onChange={(e) => setBuyinPrice(e.target.value)}
                value={buyinPrice}
              />{" "}
              dollars
            </div>
            <button onClick={() => addGold()}>Add</button>
            <button onClick={() => setToggle(false)}>Cancel</button>
          </div>
          <div className="yourgold-list">
            {saves.usergold.length > 0 &&
              saves.usergold.map((save, i) => (
                <div className="yourgold-list-element" key={i}>
                  <p>
                    {save.yg} gr. - {save.bp} $
                  </p>
                  <button
                    className="del-btn"
                    onClick={(e) => delGold(e)}
                    id={i}
                  >
                    ❌
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      {!toggle && (
        <div className="mine">
          <div className="mine-years">
            {saves &&
              saves.usersaves.map((save, i) => (
                <div className="mine-year" key={i}>
                  {save.date}: {save.price}${" "}
                  <button onClick={(e) => del(e)} id={i} className="del-btn">
                    ❌
                  </button>
                </div>
              ))}
          </div>
          <div className="mine-graph">
            <MineDollarChart saves={saves.usersaves} />
          </div>
        </div>
      )}
      {!toggle && (
        <div className="history">
          <div className="history-years">
            {goldhistory &&
              goldhistory.map((gold, i) => (
                <div className="history-year" key={i}>
                  {gold.year}: {gold.price}$
                </div>
              ))}
          </div>
          <div className="history-graph">
            <YearDollarChart goldhistory={goldhistory} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
