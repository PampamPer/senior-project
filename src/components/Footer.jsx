import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../App.css";
import { Link, Stack } from "@mui/material";
import {
  BusinessSharp,
  CallRounded,
  EmailSharp,
  Language,
  PhoneAndroidRounded,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="footer">
      <Stack alignItems="center" spacing={32} m={48}>
        <Typography variant="h4" sx={{ color: "#84DDFF" }}>
          ช่องทางการติดต่อ
        </Typography>
        <Stack direction="row" spacing={48}>
          <Stack direction="column" spacing={12} maxWidth={450} minWidth={200}>
            <Typography variant="body2" sx={{ color: "#FFE76B" }}>
              ข้อมูลติดต่ออาจารย์ผู้ประสาน สาขาคณิตศาสตร์: <br/> Nattapon Sonpanow
              (อ.ดร.ณัฐพล สนพะเนาว์)
            </Typography>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <BusinessSharp />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Office
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "#A9C0C9" }}>
              Room 1408/3 Maha Wachirunnahit Building (อาคารมหาวชิรุณหิศ)
              Department of Mathematics and Computer Science Faculty of Science,
              Chulalongkorn University Phayathai Road, Pathumwan, Bangkok 10330,
              Thailand
            </Typography>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <CallRounded />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Tel: 02-218-5225
              </Typography>
            </Stack>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <EmailSharp />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                E-mail: Nattapon.So@chula.ac.th
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={12} maxWidth={450} minWidth={200}>
            <Typography variant="body2" sx={{ color: "#FFE76B" }}>
              ข้อมูลติดต่ออาจารย์ผู้ประสาน สาขาวิทยาการคอมพิวเตอร์: <br/> Chatchatwit
              Aporntewan (รศ.ดร. ชัชวิทย์ อาภรณ์เทวัญ)
            </Typography>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <BusinessSharp />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Office
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "#A9C0C9" }}>
              Room 1309/17 Maha Wachirunnahit Building (อาคารมหาวชิรุณหิศ)
              Department of Mathematics and Computer Science Faculty of Science,
              Chulalongkorn University Phayathai Road, Pathumwan, Bangkok 10330,
              Thailand
            </Typography>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <PhoneAndroidRounded />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Mobile: 081-920-1977{" "}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <CallRounded />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Tel: 02-218-5161
              </Typography>
            </Stack>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <EmailSharp />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                E-mail: chatchawit.a@chula.ac.th
              </Typography>
            </Stack>
            <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
              <Language />
              <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                Website:{" "}
                <Link
                  href="http://pioneer.netserv.chula.ac.th/~achatcha/"
                  underline="hover"
                  color="#0075FF"
                >
                  http://pioneer.netserv.chula.ac.th/~achatcha/
                </Link>
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={24} maxWidth={450} minWidth={200}>
            <Stack spacing={12}>
              <Typography variant="body2" sx={{ color: "#FFE76B" }}>
                ติดต่อเจ้าหน้าที่หลักสูตร สาขาคณิตศาสตร์: <br/> คุณวิภา พิมพาพันธ์:
              </Typography>
              <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
                <CallRounded />
                <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                  Tel: 02-218-5140
                </Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
                <EmailSharp />
                <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                  E-mail: wipa.p@chula.ac.th
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={12}>
              <Typography variant="body2" sx={{ color: "#FFE76B" }}>
                ติดต่อเจ้าหน้าที่หลักสูตร สาขาวิทยาการคอมพิวเตอร์:<br/> คุณนงลักษณ์
                อินทรชัย:
              </Typography>
              <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
                <CallRounded />
                <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                  Tel: 02-218-7106
                </Typography>
              </Stack>
              <Stack direction="row" spacing={8} sx={{ color: "#98DAFF" }}>
                <EmailSharp />
                <Typography variant="body2" sx={{ color: "#98DAFF" }}>
                  E-mail: nonglak_1225@hotmail.com
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
