import React from 'react';

import './SortPages.css'

const SortPages = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <select
        id="sort"
        name="sort"
        onChange={props.handleSorted}
        value={props.sort}
      >
        <option value="oldestToNewest">Oldest to Newest</option>
        <option value="newestToOldest">Newest to Oldest</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};

export default SortPages;
