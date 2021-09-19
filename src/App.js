import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./component/filter";
import ProfileCard from "./component/card";
import {
  Divider,
  Typography,
  Container,
  Box,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);
  const [something, setSomething] = useState([]);
  const [users, setUsers] = useState([]);
  const [uniqueCountryData, setUniqueCountryData] = useState([]);
  const [chunkData, setChunkData] = useState([]);
  

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
      setSomething(data);
      setTotalPages(Math.ceil(data.length / 12))
      setChunkData(data.slice(0, 12));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom component="div">
          User Data
        </Typography>
        <Filter countryData={uniqueCountryData} />
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
