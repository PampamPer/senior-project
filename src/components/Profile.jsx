import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Profile() {
  const [data, setData] = useState();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username")
  const pic = localStorage.getItem("pic")

  useEffect(() => {
    axios
      .get(
        `/personalinfo/${role}`,
        // "/proposalinfo/student?semesterid=1",
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      // .get('/proposaltimelines?semesterid=1')
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
    <div>
      <NavBar />
      {console.log("this is data", data)}
      {console.log(typeof(data))}
      <Footer />
    </div>
  );
}
