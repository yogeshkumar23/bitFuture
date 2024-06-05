import * as Mui from "@mui/material";
import * as Assets from "src/assets";
import { useTranslation } from "react-i18next"; 

export const Header = () => {

  const {t} = useTranslation();

  return (
    <Mui.Paper
    component={Mui.Stack}
    spacing={3}
    sx={{
      height: { sm: 350 },
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url('${Assets.KycBg}')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      objectFit: "fill",
      borderRadius: 4,
      p: 4,
    }}
    alignItems="start"
  >
    <Mui.Box sx={{ p: { md: 2 } }} />
    <Mui.Container maxWidth="sm" component={Mui.Stack} spacing={2}>
      <Mui.Typography variant="h5" sx={{ color: "#000" }}>
         {t("completeKYCregistration")}
      </Mui.Typography>
      <Mui.Typography variant="body1" sx={{ color: "#000" }}>
        {t("enterTheRelevantKYCInformation")}
      </Mui.Typography>
    </Mui.Container>
  </Mui.Paper>
  )
}