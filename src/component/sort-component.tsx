import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { SetStateAction } from "react";
import { IPeople, SortTypeOptions, sortOptions } from "../pages/api/types";

interface SortComponentProps {
  characters: IPeople[];
  sortOption: string | undefined;
  setSortOption: (value: SetStateAction<string>) => void;
  sortCharacters: (option: SortTypeOptions) => void;
}

const SortComponent = (props: SortComponentProps) => {
  const { characters, sortOption, setSortOption, sortCharacters } = props;

  const handleSortChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
    sortCharacters(event.target.value);
  };

  return (
    <Box padding={2}>
      <FormControl disabled={characters.length < 2} variant="standard">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          sx={{ backgroundColor: "white", width: "100px" }}
          displayEmpty
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
      </FormControl>
    </Box>
  );
};

export default SortComponent;
