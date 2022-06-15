import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { KeyboardEvent } from 'react';
import { apiGetFilteredProducts } from '../../remote/e-commerce-api/productService';
import { Button, darken, lighten } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';



export default function SearchBar(props: any) {

  let searchParam = "";

  const onProductSearch = props.onProductSearch;

  async function getFilteredRequest() {
    const response = await apiGetFilteredProducts(searchParam);
    onProductSearch(response.payload);
  }

  async function onIconSearch(event: React.MouseEvent) {
    console.log("test");
    await getFilteredRequest();
  }

  async function onSearch(event: KeyboardEvent) {
    if (event.key === "Enter") {
      await getFilteredRequest();
    }
  }

  const onInputChanged = (event: any) => {
    searchParam = event.target.value;
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,

    '&:hover': {
      backgroundColor:
        sessionStorage.getItem('colorMode') === 'lightMode'
          ? darken(theme.palette.background.default, 0.05)
          : lighten(theme.palette.background.default, 0.05),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex'
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const SearchButton = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: theme.spacing(0, 1),
    borderWidth: "1px",
    borderLeftStyle: "solid",
    borderColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
  }));

  return (<>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onKeyUp={onSearch}
        onChange={onInputChanged}
      />
      <SearchButton onClick={onIconSearch}>
        <p>Search</p>
      </SearchButton>
    </Search>
  </>)
}