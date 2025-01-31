import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses,
} from "@mui/material";

// assets
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
function MenuSideBarCallout() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedFirstName = Cookies.get("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);
  const theme = useTheme();
  const CardStyle = styled(Card)(({ theme }) => ({
    background: "#c0dced",
    marginBottom: "22px",
    overflow: "hidden",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "157px",
      height: "157px",
      background: "#498dd6",
      borderRadius: "50%",
      top: "-105px",
      right: "-96px",
    },
  }));
  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  color: theme.palette.primary.main,
                  border: "none",
                  borderColor: theme.palette.primary.main,
                  background: "#fff",
                  marginRight: "12px",
                }}
              >
                <TableChartOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography variant="subtitle1" sx={{ color: "grey" }}>
                  Welcome
                </Typography>
              }
              secondary={
                <Typography variant="caption"> {firstName}</Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </CardStyle>
  );
}

export default MenuSideBarCallout;
