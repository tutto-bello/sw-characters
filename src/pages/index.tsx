import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CardComponent from "../component/card-component";
import LayoutComponent from "../component/layout/layout-component";
import LoaderComponent from "../component/loader-component";
import SortComponent from "../component/sort-component";
import SearchComponent from "../component/search-component";
import { fetchData, searchCharacters } from "./api/characters-service";
import { IPeople, SortTypeOptions } from "./api/types";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IPeople[]>([]);
  const [sortedCharacters, setSortedCharacters] = useState<IPeople[]>([]);
  const [sortOption, setSortOption] = useState<SortTypeOptions>("");
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((data) => {
        if (data) {
          setCharacters(data.results);
          setSortedCharacters(data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const sortCharacters = (option: SortTypeOptions) => {
    let sortedCharacters: IPeople[] = [...characters];

    if (option === "A-Z") {
      sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "Z-A") {
      sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "Male") {
      sortedCharacters = characters.filter(
        (character) => character.gender === "male"
      );
    } else if (option === "Female") {
      sortedCharacters = characters.filter(
        (character) => character.gender === "female"
      );
    }
    setVisibleCount(sortedCharacters.length > 4 ? 4 : sortedCharacters.length);
    setSortedCharacters(sortedCharacters);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (searchQuery.trim() === "") {
      fetchData().then((data) => {
        if (data) {
          setVisibleCount(data.results.length > 4 ? 4 : data.results.length);
          setCharacters(data.results);
          setSortedCharacters(data.results);
          setLoading(false);
        }
      });
    }

    try {
      searchCharacters(searchQuery).then((data) => {
        if (data) {
          setVisibleCount(data.results.length > 4 ? 4 : data.results.length);
          setCharacters(data.results);
          setSortedCharacters(data.results);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("Error searching data:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prevVisibleCount) =>
      Math.min(prevVisibleCount + 4, sortedCharacters.length)
    );
  };

  return (
    <LayoutComponent>
      <SearchComponent
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Typography color="white" variant="h6" padding={2}>
        {`Showing ${visibleCount} result of ${sortedCharacters.length}`}
      </Typography>
      <SortComponent
        characters={characters}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortCharacters={sortCharacters}
      />
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {sortedCharacters.slice(0, visibleCount).map((character, i) => (
            <CardComponent
              key={character.name}
              character={character}
              index={i}
            />
          ))}
        </Box>
      )}
      {visibleCount < sortedCharacters.length && (
        <Box padding={2}>
          <Button
            onClick={handleLoadMore}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            disabled={isLoading}
          >
            Load More
          </Button>
        </Box>
      )}
    </LayoutComponent>
  );
}
