interface PagesCut {
  total: number;
  pagesCutCount: number;
  currentPage: number;
}

export const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, i) => i + start);

export const getPagesCut = ({
  total,
  pagesCutCount,
  currentPage,
}: PagesCut) => {
  let start = 1;
  let end = pagesCutCount;
  
  if (total <= pagesCutCount) {
    start = 1;
    end = total;
  } else if (currentPage <= 6) {
    start = 1;
    end = pagesCutCount;
  } else if (currentPage + 4 >= total) {
    start = total - 9;
    end = total;
  } else {
    start = currentPage - 5;
    end = currentPage + 4;
  }
  return { start, end };
};
