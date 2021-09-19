import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputLabel, Select, MenuItem, TextField } from "@mui/material";

export default function Filter({ countryData }) {
  const [selectedDate, handleDateChange] = useState("");
  const [country, selectCountry] = useState("");
  const [selectname, setName] = useState("");
  const handleClick = () => {
    console.log("Serch");
  };

  const styleObj = { minWidth: 220, marginRight: "1rem", marginBottom: "1rem" };
  return (
    <>
        <InputLabel id="coutry_select">Select Country</InputLabel>
        <Select
          labelId="coutry_select"
          id="coutry_select"
          value={country}
          
          onChange={(e) => selectCountry(e.target.value)}
          sx={styleObj}
        >
          {countryData &&
            countryData.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
        </Select>
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        sx={styleObj}
      />
      <TextField
        label="Full Name"
        value={selectname}
        onChange={(e) => setName(e.target.value)}
        sx={{ minWidth: 300, marginRight: "1rem", marginBottom: "1rem" }}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ height: "3.8em" }}
      >
        Search
      </Button>
    </>
  );
}
