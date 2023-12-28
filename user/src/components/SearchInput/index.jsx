import {
    Input,
    InputGroup,
    InputLeftElement,
    Image
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import search from '../../assets/Search.svg'
import debounce from '../../utils/debounceFunc';

const SearchInput = ({setSearchValue,searchValue,setCurrentPage}) => {
    const [ unsubmittedSearch, setUnsubmittedSearch ] = useState('');
    const handleSearchChange= async (e) => {
        setUnsubmittedSearch(e.target.value);
        setCurrentPage(1);
    }
    const debounceSetSearchValue = useMemo(() => debounce(setSearchValue,500),[])
    useEffect(() => {
        debounceSetSearchValue(unsubmittedSearch);
    },[unsubmittedSearch])
    useEffect(() => {
        setUnsubmittedSearch(searchValue);
    },[searchValue])
    return (
        <InputGroup w="400px">
            <InputLeftElement>
                <Image src={search} alt="search" onClick={() => {
                    setUnsubmittedSearch('');
                }}/>
            </InputLeftElement>
            <Input 
            border="1px solid rgba(68, 68, 68, 0.4)"
            borderRadius="20px"
            placeholder="Search..."
            value={unsubmittedSearch}  
            onChange={handleSearchChange}
            type="search"
            />
        </InputGroup>
    )
}

export default SearchInput;