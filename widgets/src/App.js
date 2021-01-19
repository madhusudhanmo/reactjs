import React, { useState } from "react";
import Accordion from "./components/accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";

const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework"
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers"
  },
  {
    title: "How do use React?",
    content: "You use React by creating components"
  }
]

const options = [
  {
    label: 'The Color Red',
    value: 'Red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  }
]

export default () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div>
      <Header />
      <Route route='/'>
        <Accordion items={items} />
      </Route>
      <Route route='/list'>
        <Search />
      </Route>
      <Route route='/dropdown'>
        <Dropdown selected={selected} onSelectedChange={setSelected} options={options} />
      </Route>
      <Route route='/translate'>
        <Translate />
      </Route>
    </div>

  );
}
