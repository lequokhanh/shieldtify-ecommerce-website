import { Button, HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import next from "../../assets/Products/next.svg"
import prev from "../../assets/Products/previous.svg"

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
    const handlePageClick = (page) => {
        const { search, pathname } = window.location;
        const queryParams = new URLSearchParams(search);
        queryParams.set('page', page);
        if(page==0){
            queryParams.set('page', 1);
        }
        if(page==totalPages+1){
            queryParams.set('page', totalPages);
        }
        const newSearch = queryParams.toString();
        window.location.href = `${pathname}?${newSearch}`;
    }
    const renderPaginationButtons = () => {
    // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const displayedPages = [];
    displayedPages.push(
        <Button
          key="prev"
          as={Link}
          to={`${baseUrl}/${currentPage - 1}`}
          colorScheme="blue"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <Image src={prev} alt="prev" />
        </Button>
      );
  
      // Always display the first two pages
      if (currentPage > 2) {
        displayedPages.push(
          <Button
            key={1}
            as={Link}
            to={`${baseUrl}/1`}
            colorScheme="gray"
            onClick={() => handlePageClick(1)}
          >
            1
          </Button>
        );
      }
      if (currentPage > 3) {
        displayedPages.push(<Button key="ellipsis1" isDisabled>...</Button>);
      }
  
      // Display the page before the current page
      if (currentPage > 1) {
        displayedPages.push(
          <Button
            key={currentPage - 1}
            as={Link}
            to={`${baseUrl}/${currentPage - 1}`}
            colorScheme="gray"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {currentPage - 1}
          </Button>
        );
      }
  
      // Display the current page
      displayedPages.push(
        <Button
          key={currentPage}
          as={Link}
          to={`${baseUrl}/${currentPage}`}
          colorScheme="blue"
          onClick={() => handlePageClick(currentPage)}
        >
          {currentPage}
        </Button>
      );
  
      // Display the page after the current page
      if (currentPage < totalPages) {
        displayedPages.push(
          <Button
            key={currentPage + 1}
            as={Link}
            to={`${baseUrl}/${currentPage + 1}`}
            colorScheme="gray"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        );
      }
  
      if (currentPage < totalPages - 2) {
        displayedPages.push(<Button key="ellipsis2" isDisabled>...</Button>);
      }
  
      // Display the last two pages
      if (currentPage < totalPages - 1) {
        displayedPages.push(
          <Button
            key={totalPages}
            as={Link}
            to={`${baseUrl}/${totalPages}`}
            colorScheme="gray"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
  
      // Display the next button
      displayedPages.push(
        <Button
          key="next"
          as={Link}
          to={`${baseUrl}/${currentPage + 1}`}
          colorScheme="blue"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
            <Image src={next} alt="next" />
        </Button>
      );
  
      return displayedPages;
  };

  return <HStack spacing={2}>{renderPaginationButtons()}</HStack>;
};

export default Pagination;