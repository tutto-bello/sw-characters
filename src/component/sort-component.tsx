import { Box, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { SetStateAction } from "react";
import { IPeople, SortTypeOptions, sortOptions } from "../types";

interface SortComponentProps {
  isLoading: boolean;
  characters: IPeople[];
  sortOption: string | undefined;
  setSortOption: (value: SetStateAction<string>) => void;
  sortCharacters: (option: SortTypeOptions) => void;
}

const SortComponent = (props: SortComponentProps) => {
  const { isLoading, sortOption, setSortOption, sortCharacters } = props;

  const handleSortChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    sortCharacters(event.target.value);
  };

  return (
    <Box padding={2}>
      <Select
        value={sortOption}
        onChange={handleSortChange}
        sx={{ width: "100px" }}
        displayEmpty
        label="Sort by"
        variant="standard"
        placeholder="Sort by"
        disabled={isLoading}
      >
        <MenuItem value="" disabled>
          Sort by
        </MenuItem>
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SortComponent;
