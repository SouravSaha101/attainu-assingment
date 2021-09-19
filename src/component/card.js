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

const dateFormatter = (date) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateAr = date.split("-");
  let day = `${dateAr[2].trim()}${nth(dateAr[2])}`;
  let month = monthList[+dateAr[1]-1];
  let year = dateAr[0];
  let finalDate = day + " " + month + " " + year;
  return finalDate;
};
const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
function ProfileCard({ data, editData, deleteData, uniqueCountryData }) {
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
              label="DOB:"
              value={dateFormatter(data["Date of birth"].split("T")[0])}
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
export default React.memo(ProfileCard);
