import React from 'react';

import './SortPages.css';

const SortPages = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }} id="SortPages">
      <h4>SORT:</h4>
      <form id="sort">
        <label
          htmlFor="oldestToNewest"
          className={props.sort === 'oldestToNewest' ? 'sort-selected' : null}
        >
          Oldest
        </label>
        <input
          id="oldestToNewest"
          type="radio"
          value="oldestToNewest"
          checked={props.sort === 'oldestToNewest'}
          onChange={props.handleSorted}
        />
        <label
          htmlFor="newestToOldest"
          className={props.sort === 'newestToOldest' ? 'sort-selected' : null}
        >
          Newest
        </label>
        <input
          id="newestToOldest"
          type="radio"
          value="newestToOldest"
          checked={props.sort === 'newestToOldest'}
          onChange={props.handleSorted}
        />
        <label
          htmlFor="alphabetical"
          className={props.sort === 'alphabetical' ? 'sort-selected' : null}
        >
          Alphabetical
        </label>
        <input
          id="alphabetical"
          type="radio"
          value="alphabetical"
          checked={props.sort === 'alphabetical'}
          onChange={props.handleSorted}
        />
      </form>
      {/* <select */}
      {/*   id="sort" */}
      {/*   name="sort" */}
      {/*   onChange={props.handleSorted} */}
      {/*   value={props.sort} */}
      {/* > */}
      {/*   <option value="oldestToNewest">Oldest to Newest</option> */}
      {/*   <option value="newestToOldest">Newest to Oldest</option> */}
      {/*   <option value="alphabetical">Alphabetical</option> */}
      {/* </select> */}
    </div>
  );
};

export default SortPages;
