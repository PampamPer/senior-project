import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function FAQ() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get("/faqs")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(res.data);
        } else {
          setData([]);
          console.log("dont get data");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  return (
    <div className="content">
      <NavBar />
      {/* <List>
      {data.map((obj) => (
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={obj.question} />
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
        ))}
      </List> */}
      <Stack sx={{ mx: 32, mb:24}}>
        <Stack alignItems="center" sx={{my:24}}>
          <Typography variant="h4">
            คำถามที่พบบ่อย
          </Typography>
        </Stack>
        {data.map((obj) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{px:12}}>
              {obj.question}
            </AccordionSummary>
            <Divider variant="middle"/>
            <AccordionDetails sx={{m:12, whiteSpace:"pre-wrap", lineHeight:1.8, wordBreak:"break-word"}}>{obj.answer}</AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      <Footer />
    </div>
  );
}
