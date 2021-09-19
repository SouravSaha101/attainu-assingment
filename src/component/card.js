import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Select,
  MenuItem,
} from "@mui/material";

export default function ProfileCard({
  data,
  editData,
  deleteData,
  uniqueCountryData,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(data);

  const saveHandler = () => {
    setIsEdit(false);
    editData(userData);
  };
  const deleteHandler = () => {
    deleteData(userData["Id"]);
  };
  const inputHandler = (e) => {
    let id = e.target.id ? e.target.id : "Country";
    let value =
      id === "Date of birth"
        ? new Date(e.target.value).toISOString()
        : e.target.value;
    setUserData({ ...userData, [id]: value });
  };
  const styleObj = { height: "2rem;" };
  return (
    <Card sx={{ width: 275, height: 270, position: "relative" }}>
      {!isEdit ? (
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 2.5 }}>
            {data["Full Name"]}
          </Typography>
          <Typography sx={{ mb: 2.5 }} color="text.secondary">
            {data["Email"]}
          </Typography>
          <Typography variant="span" sx={{ mb: 2.5 }}>
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              label="DOB:"
              value={data["Date of birth"].split("T")[0]}
              disabled
              sx={{ mb: 4.3 }}
            />
            <br />
            {data["Country"]}
          </Typography>
        </CardContent>
      ) : (
        <CardContent>
          <TextField
            label="Name:"
            variant="standard"
            id="Full Name"
            value={userData["Full Name"]}
            sx={{ marginBottom: "12px" }}
            onChange={inputHandler}
          />
          <TextField
            label="Email: :"
            variant="standard"
            id="Email"
            value={userData["Email"]}
            sx={{ marginBottom: "12px" }}
            onChange={inputHandler}
          />
          <br />
          <Typography variant="span">
            <TextField
              id="Date of birth"
              variant="standard"
              type="date"
              label="DOB:"
              value={userData["Date of birth"].split("T")[0]}
              sx={{ marginBottom: "12px" }}
              onChange={inputHandler}
            />
            <br />
            <Select
              labelId="Country"
              id="Country"
              value={userData["Country"]}
              onChange={inputHandler}
              sx={styleObj}
              placeholder="Select Country"
              label="Select Country"
            >
              {uniqueCountryData &&
                uniqueCountryData.map((country, index) => (
                  <MenuItem key={index} id="Country" value={country}>
                    {country}
                  </MenuItem>
                ))}
            </Select>
          </Typography>
        </CardContent>
      )}

      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        {!isEdit ? (
          <Button size="small" onClick={(e) => setIsEdit(true)}>
            Edit
          </Button>
        ) : (
          <Button size="small" onClick={saveHandler}>
            Save
          </Button>
        )}
        <Button size="small" onClick={deleteHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
