import * as Mui from "@mui/material";
import * as Compoenents from "src/app/components";

export const Coins = ({
  coin,
  coinName,
  balance,
  amountType,
  amount,
}: coinBox.Props) => (
  <Mui.Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing={2}
    component={Mui.Paper}
    sx={{
      p: 1,
      px: 2,
      width: 200,
      borderRadius: 2,
      bgcolor: (theme) =>
        theme.palette.mode === "dark" ? undefined : Mui.colors.grey[100],
    }}
  >
    <Mui.Stack spacing={1}>
      <Mui.Stack direction="row" spacing={1}>
        <Mui.Avatar
          src={`${import.meta.env.VITE_API_ENCRYPTION}://${
            import.meta.env.VITE_API_IP
          }${import.meta.env.VITE_ASSETS_PATH}${coin}`}
          sx={{ height: 30, width: 30 }}
        />

        <Mui.Typography variant="body2">{coinName}</Mui.Typography>
      </Mui.Stack>

      <Mui.Typography variant="caption" noWrap>
        {/* <Compoenents.Global.Format
          type={amountType}
          number={balance * amount}
        /> */}
        {/* {" / "} */}
        <Compoenents.Global.Format type={amountType} number={amount} />
      </Mui.Typography>
    </Mui.Stack>
    <Mui.Typography sx={{ fontWeight: 800 }}>
      <Compoenents.Global.Format type="number" number={balance} />
    </Mui.Typography>
  </Mui.Stack>
);

export declare namespace coinBox {
  export interface Props {
    coin: string;
    coinName: string;
    balance: number;
    amountType: any;
    amount: number;
  }
}
