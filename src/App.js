import "./App.css";
import React, { useState, useEffect } from "react";
import ProfileCard from "./component/card";
import {
  Divider,
  Typography,
  Container,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [uniqueCountryData, setUniqueCountryData] = useState([]);
  const [chunkData, setChunkData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [country, selectCountry] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleClick = () => {
    setLoading(true);
    let filterData = masterData.filter((el) =>
      el["Full Name"].toLowerCase().includes(searchName.toLowerCase())
    );
    setPaginationOnChange(filterData);
    setLoading(false);
  };

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/users");
      const data = res.data;
      const countryData = data.map((user) => user.Country);
      const uniqueCountryData = [...new Set(countryData)];

      setUniqueCountryData(uniqueCountryData);
      setLoading(false);
      setUsers(data);
      setMasterData(data);
      setTotalPages(Math.ceil(data.length / 12));
      setChunkData(data.slice(0, 12));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const paginationHandler = (e, page) => {
    setCurrentPage(page);
    let data = users.slice((page - 1) * 12, page * 12);
    setChunkData(data);
  };

  const styleObj = { minWidth: 220, marginRight: "1rem", marginBottom: "1rem" };
  const countrySelectHandler = (e) => {
    selectCountry(e.target.value);
    let filterData = masterData.filter(
      (el) => el["Country"] === e.target.value
    );
    setPaginationOnChange(filterData);
  };

  function setPaginationOnChange(filterData) {
    setUsers(filterData);

    let totalPage = Math.ceil(filterData.length / 12);

    setTotalPages(totalPage);
    let data;
    if (currentPage > totalPage) {
      data = filterData.slice(0, 12);
      setCurrentPage(1);
    } else {
      data = filterData.slice((currentPage - 1) * 12, currentPage * 12);
    }
    setChunkData(data);
  }
  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom component="div">
          User Data
        </Typography>
        <section>
          {/* <InputLabel id="coutry_select_label" htmlFor="coutry_select">Select Country</InputLabel> */}
          <Select
            labelId="coutry_select_label"
            id="coutry_select"
            value={country}
            onChange={countrySelectHandler}
            sx={styleObj}
            placeholder="Select Country"
            label="Select Country"
          >
            {uniqueCountryData &&
              uniqueCountryData.map((country, index) => (
                <MenuItem key={index} value={country}>
                  {country}
                </MenuItem>
              ))}
          </Select>
          <TextField
            label="Search By Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{ minWidth: 300, marginRight: "1rem", marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ height: "3.8em" }}
          >
            Search
          </Button>
        </section>

        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        {loading && (
          <Box sx={{ width: "100%" }}>
            <CircularProgress />
          </Box>
        )}
        {chunkData.length ? (
          <>
            <div className="grid_style">
              {chunkData.map((el) => (
                <ProfileCard
                  key={el.Id}
                  name={el["Full Name"]}
                  email={el["Email"]}
                  dob={el["Date of birth"]}
                  country={el["Country"]}
                />
              ))}
            </div>
            <Stack spacing={5} className="pagination_style">
              <Pagination
                page={currentPage}
                variant="outlined"
                shape="rounded"
                count={totalPages}
                onChange={paginationHandler}
              />
            </Stack>
          </>
        ) : (
          <Typography variant="h6" gutterBottom component="div">
            {loading ? "Loading..." : "No Results Found"}
          </Typography>
        )}
      </Container>
    </>
  );
}

export default App;
