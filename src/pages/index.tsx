import React, { useEffect, useState } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import CardComponent from "../component/card-component";
import LayoutComponent from "../component/layout/layout-component";
import LoaderComponent from "../component/loader-component";
import SortComponent from "../component/sort-component";
import SearchComponent from "../component/search-component";
import {
  fetchNextPage,
  fetchData,
  searchCharacters,
} from "../characters-service";
import { FetchDataType, IPeople, SortTypeOptions } from "../types";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [characters, setCharacters] = useState<IPeople[]>([]);
  // newSortedCharacters needed for sort Male and Female set, BUT it not a good scenario, the api don't handle gender search
  const [newSortedCharacters, setSortedCharacters] = useState<IPeople[]>([]);
  const [count, setCount] = useState<number>();
  const [nextUrl, setNextUrl] = useState<string>();
  const [sortOption, setSortOption] = useState<SortTypeOptions>("");
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const updateStates = (data: FetchDataType) => {
    setCharacters(data.results);
    setSortedCharacters(data.results);
    setCount(data.count);
    setNextUrl(data.next);
  };

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((data) => {
        if (data) {
          updateStates(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const sortCharacters = (option: SortTypeOptions) => {
    let newSortedCharacters: IPeople[] = [...characters];

    if (option === "A-Z") {
      newSortedCharacters = newSortedCharacters.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (option === "Z-A") {
      newSortedCharacters = newSortedCharacters.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (option === "Male") {
      newSortedCharacters = characters.filter(
        (character) => character.gender === "male"
      );
    } else if (option === "Female") {
      newSortedCharacters = characters.filter(
        (character) => character.gender === "female"
      );
    }
    setVisibleCount(Math.min(newSortedCharacters.length, count!));
    setSortedCharacters(newSortedCharacters);
  };

  const handleSearch = async () => {
    setLoading(true);
    setSortOption("");
    if (searchQuery.trim() === "") {
      fetchData().then((data) => {
        if (data) {
          setVisibleCount(Math.min(data.results.length, 5));
          updateStates(data);
          setLoading(false);
        }
      });
    }

    try {
      searchCharacters(searchQuery).then((data) => {
        if (data) {
          setVisibleCount(Math.min(data.results.length, 5));
          updateStates(data);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("Error searching data:", error);
    }
  };

  const handleLoadMore = () => {
    setSortOption("");
    if (count) {
      setVisibleCount((prevVisibleCount) =>
        Math.min(prevVisibleCount + 5, count)
      );

      if (count > 10 && nextUrl && visibleCount % 10 == 0) {
        setMoreLoading(true);
        fetchNextPage(nextUrl).then((data) => {
          if (data) {
            setCharacters((prevCharacters) => [
              ...prevCharacters,
              ...data.results,
            ]);
            setSortedCharacters((prevCharacters) => [
              ...prevCharacters,
              ...data.results,
            ]);
            setCount(data.count);
            setNextUrl(data.next);
            setVisibleCount((prevVisibleCount) =>
              Math.min(prevVisibleCount, count)
            );
            setMoreLoading(false);
          }
        });
      }
    }
  };

  return (
    <LayoutComponent>
      <SearchComponent
        isLoading={isLoading || isMoreLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {isLoading && (
        <Box paddingLeft={2}>
          <Skeleton height={64} width={240} />
        </Box>
      )}

      {count! > 0 && !isLoading && (
        <Typography color="white" variant="h6" padding={2}>
          {`Showing ${visibleCount} result of ${
            // api does not handle gender search, so we do no know the count of sort
            sortOption === "Male" || sortOption === "Female"
              ? "Unknown quantity"
              : count
          }`}
        </Typography>
      )}

      {count === 0 && !isLoading && (
        <Typography color="white" variant="h6" padding={2}>
          Showing 0 result of 0
        </Typography>
      )}

      <SortComponent
        isLoading={isLoading || isMoreLoading}
        characters={characters}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortCharacters={sortCharacters}
      />

      {isLoading && <LoaderComponent />}

      {!isLoading && count! > 0 && (
        <>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {newSortedCharacters.slice(0, visibleCount).map((character, i) => (
              <CardComponent
                key={character.name}
                character={character}
                index={i}
              />
            ))}
          </Box>
          {isMoreLoading && <LoaderComponent />}
        </>
      )}

      {!isLoading && count! === 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          height={240}
          alignItems="center"
        >
          <Typography variant="h6">No Results Match Your Search!</Typography>
        </Box>
      )}

      {visibleCount < count! && (
        <Box padding={2} paddingX={4}>
          <Button
            onClick={handleLoadMore}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            disabled={isLoading || isMoreLoading}
          >
            Load More
          </Button>
        </Box>
      )}
    </LayoutComponent>
  );
}
