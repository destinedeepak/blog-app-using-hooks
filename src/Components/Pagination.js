import React from 'react';

export default function Pagination(props) {
  let { articlePerPage, articlesCount, handlePagination, activePageIndex } =
    props;
  if (articlesCount===0) return '';
  let numberOfPagesArr = new Array(
    Math.ceil(articlesCount / articlePerPage)
  ).fill('');
  return (
    <section className="pt-12 pb-28">
      <button
        className="border w-9 h-10 inline-block text-center leading-10"
        onClick={() => {
          handlePagination(activePageIndex === 0 ? 0 : activePageIndex - 1);
        }}
      >
        <i className="fas fa-backward"></i>
      </button>
      {numberOfPagesArr.map((ele, index) => (
        <span
          key={index}
          className={`border w-9 h-10 inline-block text-center leading-10 cursor-pointer ${
            activePageIndex === index ? 'bg-primary' : ''
          }`}
          onClick={() => {
            handlePagination(index);
          }}
        >
          {index + 1}
        </span>
      ))}
      <button
        className="border w-9 h-10 inline-block text-center leading-10"
        onClick={() => {
          handlePagination(
            activePageIndex === numberOfPagesArr.length - 1
              ? numberOfPagesArr.length - 1
              : activePageIndex + 1
          );
        }}
      >
        <i className="fas fa-forward"></i>
      </button>
    </section>
  );
}
