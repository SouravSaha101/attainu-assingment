import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";

const initalData = {
  "Full Name": "",
  Country: "",
  Id: "",
  "Date of birth": "",
  Email: "",
  "Created at": "",
};

export default function ProfileCard({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(data);

  const saveHandler = () => {
    setIsEdit(false);
  };
  return (
    <Card sx={{ width: 275, height: 270, position: "relative" }}>
      {!isEdit ? (
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 2.5 }}>
            {data["Full Name"]}
          </Typography>
          <Typography sx={{ mb: 2.5 }} color="text.secondary" >
            {data["Email"]}
          </Typography>
          <Typography variant="span" sx={{ mb: 2.5 }}  >
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
          />
          <TextField
            label="Email: :"
            variant="standard"
            id="Email"
            value={userData["Email"]}
            sx={{ marginBottom: "12px" }}
          />
          <br />
          <Typography variant="sopan">
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              label="DOB:"
              value={userData["Date of birth"].split("T")[0]}
              sx={{ marginBottom: "12px" }}
            />
            <br />
            {userData["Country"]}
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
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
