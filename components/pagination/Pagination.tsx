import { FC, useEffect, useState } from 'react';
import Select from '../select/Select';
import { getPagesCut, range } from './utils';

type PaginationProps = {
	currentPage: number;
	total: number;
	onPageSelect: (page: number) => void;
	setPageSize: (page: number) => void;
	itemsPerPage: number;
  nextPage: () => void;
  previousPage: () => void;
}

const MAX_PAGE_SIZE = 10;

export const Pagination = ({ currentPage, total, onPageSelect, itemsPerPage, nextPage, previousPage, setPageSize }: PaginationProps) => {
  const [pagesList, setPagesList] = useState<number[]>([]);
  const listOfPages = Math.ceil(total / itemsPerPage);


  useEffect(() => {
    const pagesCut = getPagesCut({
      total: listOfPages,
      pagesCutCount: MAX_PAGE_SIZE,
      currentPage: currentPage,
    });
    const pages = range(pagesCut.start, pagesCut.end);
    setPagesList(pages);
  }, [currentPage, listOfPages]);

  const handleClickPage = (pageNumber: number) => {
	  onPageSelect(pageNumber - 1);
  };

  const handleNext = () => {
	  nextPage();
  };

  const handlePrevious = () => {
	  previousPage();
  };
  

	return (
		<div className="flex flex-row items-center justify-between gap-2 pl-2 pr-2">

      <div className='flex flex-row items-center gap-2'>
          <Select value={itemsPerPage} 
                onChange={ (value) => setPageSize(Number(value)) } 
                options={[5, 10, 15, 20, 25, 50, 100]} 
                disabledOption={'Select items per page'} 
          />
          <div>of {total} items</div>
      </div>
      


			<div className="flex flex-row gap-1">
        <button className="btn btn-circle btn-sm" disabled={currentPage === 1} onClick={() => handlePrevious()}>«</button>

				{pagesList.map((i) => (
					<button
            key={i}
						className={`btn btn-circle btn-sm ${(i) === currentPage && 'btn-primary'}`}
						onClick={() => handleClickPage(i)}
					>
						{i}
					</button>
				))}
				
        <button className="btn btn-circle btn-sm" disabled={currentPage === listOfPages} onClick={() => handleNext()}>»</button>  
			</div>
		</div>
	);
};
