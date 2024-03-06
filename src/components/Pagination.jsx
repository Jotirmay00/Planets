import React from 'react';

const Pagination = ({ handleNextPage, handlePrevPage, currentPage, nextPage, prevPage }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      {prevPage && (
        <button onClick={handlePrevPage} className="text-slate-300 hover:underline focus:outline-none text-base">
          Previous Page
        </button>
      )}
      <div className="flex-grow text-center">
        <span className="text-sm font-semibold mr-2 text-white">Page {currentPage}</span>
      </div>
      {nextPage && (
        <button onClick={handleNextPage} className="text-slate-300 hover:underline focus:outline-none text-base ">
          Next Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
