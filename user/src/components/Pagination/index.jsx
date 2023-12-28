import { Button, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import next from '../../assets/Products/next.svg'
import prev from '../../assets/Products/previous.svg'

const Pagination = ({ currentPage, totalPages, onChange }) => {
    const handlePageClick = (page) => {
        onChange(page)
    }
    const renderPaginationButtons = () => {
        // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        const displayedPages = []
        // if (currentPage !== 1)
        displayedPages.push(
            <Button
                key="prev"
                colorScheme="blue"
                isDisabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                <Image src={prev} alt="prev" />
            </Button>
        )

        // Always display the first two pages
        if (currentPage > 2) {
            displayedPages.push(
                <Button
                    key={1}
                    as={Link}
                    colorScheme="gray"
                    onClick={() => handlePageClick(1)}
                >
                    1
                </Button>
            )
        }
        if (currentPage > 3) {
            displayedPages.push(
                <Button key="ellipsis1" isDisabled>
                    ...
                </Button>
            )
        }

        // Display the page before the current page
        if (currentPage > 1) {
            displayedPages.push(
                <Button
                    key={currentPage - 1}
                    as={Link}
                    colorScheme="gray"
                    onClick={() => handlePageClick(currentPage - 1)}
                >
                    {currentPage - 1}
                </Button>
            )
        }

        // Display the current page

        displayedPages.push(
            <Button
                key={currentPage}
                as={Link}
                colorScheme="blue"
                onClick={() => handlePageClick(currentPage)}
            >
                {currentPage}
            </Button>
        )

        // Display the page after the current page
        if (currentPage < totalPages) {
            displayedPages.push(
                <Button
                    key={currentPage + 1}
                    as={Link}
                    colorScheme="gray"
                    onClick={() => handlePageClick(currentPage + 1)}
                >
                    {currentPage + 1}
                </Button>
            )
        }

        if (currentPage < totalPages - 2) {
            displayedPages.push(
                <Button key="ellipsis2" isDisabled>
                    ...
                </Button>
            )
        }

        // Display the last two pages
        if (currentPage < totalPages - 1) {
            displayedPages.push(
                <Button
                    key={totalPages}
                    as={Link}
                    colorScheme="gray"
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </Button>
            )
        }

        // Display the next button
        // if (currentPage !== totalPages)
        displayedPages.push(
            <Button
                key="next"
                colorScheme="blue"
                isDisabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                <Image src={next} alt="next" />
            </Button>
        )

        return displayedPages
    }

    return <HStack spacing={2}>{renderPaginationButtons()}</HStack>
}

export default Pagination
