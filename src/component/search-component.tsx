import { Box, FormControl, TextField, Button } from "@mui/material";
import React, { SetStateAction } from "react";

interface SearchComponentProps {
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (value: SetStateAction<string>) => void;
  handleSearch: () => Promise<void>;
}

const SearchComponent = (props: SearchComponentProps) => {
  const { isLoading, searchQuery, setSearchQuery, handleSearch } = props;

  // For better User experience if press Enter start the search!
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl
        sx={{
          width: "200px",
          marginBottom: 2,
          "@media (min-width: 768px)": {
            width: "300px",
          },
          "@media (min-width: 1240px)": {
            width: "400px",
          },
        }}
      >
        <TextField
          disabled={isLoading}
          label="Search Character"
          variant="standard"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            "& label": {
              color: "white",
            },
            input: {
              color: "white",
              borderBottom: "1px solid white",
            },
          }}
        />
      </FormControl>
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search character"}
      </Button>
    </Box>
  );
};

export default SearchComponent;
