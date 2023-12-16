/* eslint-disable react/prop-types */
import { Button, HStack, Image } from '@chakra-ui/react';
import chevronleft from "../../assets/Chevronleft.svg"
import chevronright from "../../assets/chevronright.svg"

const Pagination = ({ currentPage, totalPages, setCurrentPage}) => {
    const handlePageClick = (page) => {
        setCurrentPage(page);
    }
    const renderPaginationButtons = () => {

    const displayedPages = [];
    displayedPages.push(
        <Button
          key="prev"
          colorScheme="none"
          isDisabled={currentPage === 1}
          onClick={() => {handlePageClick(currentPage - 1)}}
        >
          <Image src={chevronleft} alt="prev" />
        </Button>
      );
  
      // Always display the first two pages
      if (currentPage > 2) {
        displayedPages.push(
          <Button
            key={1}
            colorScheme="none"
            color="#444444"
            fontSize="0.875rem"
            fontWeight="400"            
            onClick={() => handlePageClick(1)}
          >
            1
          </Button>
        );
      }
      if (currentPage > 3) {
        displayedPages.push(<Button 
          key="ellipsis1" 
          isDisabled
          colorScheme="none"
          color="#444444"
          fontSize="0.875rem"
          fontWeight="400"
          >
            ...
            </Button>);
      }
  
      // Display the page before the current page
      if (currentPage > 1) {
        displayedPages.push(
          <Button
            key={currentPage - 1}
            colorScheme="none"
            color="#444444"
            fontSize="0.875rem"
            fontWeight="400"
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
          colorScheme="none"
          color="#444444"
          fontSize="0.875rem"
          fontWeight="400"
          background="#F6F6F6"
          borderRadius="100vh"
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
            colorScheme="none"
            color="#444444"
            fontSize="0.875rem"
            fontWeight="400"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        );
      }
  
      if (currentPage < totalPages - 2) {
        displayedPages.push(<Button 
          key="ellipsis2" 
          isDisabled
          colorScheme="none"
          color="#444444"
          fontSize="0.875rem"
          fontWeight="400"
          >
            ...
          </Button>);
      }
  
      // Display the last two pages
      if (currentPage < totalPages - 1) {
        displayedPages.push(
          <Button
            key={totalPages}
            colorScheme="none"
            color="#444444"
            fontSize="0.875rem"
            fontWeight="400"
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
          colorScheme="none"
          isDisabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
            <Image src={chevronright} alt="next" />
        </Button>
      );
  
      return displayedPages;
  };

  return <HStack spacing={2} fontFamily="Inter">{renderPaginationButtons()}</HStack>;
};

export default Pagination;