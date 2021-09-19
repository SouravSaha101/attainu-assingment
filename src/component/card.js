import * as React from "react";
import {
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";

export default function ProfileCard({ name, email, dob, country }) {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <TextField
          id="standard-basic"
          label="Name:"
          variant="standard"
          value={name}
        />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2">
          <TextField
            id="standard-basic"
            variant="standard"
            type="date"
            label="DOB:"
            value={dob.split("T")[0]}
            disabled
          />
          <br />
          {country}
        </Typography>
      </CardContent>
      <CardActions>
        {/* todo */}
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
