import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../App.css";

export default function Footer() {
  return (
    <div className="footer">
      <Typography variant="h3">Footer</Typography>
      <Typography variant="h4" color="#ADD8E6">This is Footer</Typography>
      <Typography variant="body1" color="#fff">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
        laboriosam necessitatibus, possimus quas officia id dolores natus,
        reprehenderit fugiat pariatur esse! Animi nam recusandae, voluptatum
        iusto dignissimos libero perspiciatis quidem.
      </Typography>
    </div>
  );
}
