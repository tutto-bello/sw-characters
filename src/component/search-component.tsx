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
          sx={{
            "& label": {
              color: "white",
            },
            input: {
              color: "#ffffff",
              borderBottom: "1px solid #ffffff",
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
        Search character
      </Button>
    </Box>
  );
};

export default SearchComponent;
