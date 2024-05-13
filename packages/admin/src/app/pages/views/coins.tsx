import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const CoinFloat = ({ sx, src }: Mui.CardMediaProps) => (
  <Mui.CardMedia
    component="img"
    src={src}
    sx={{
      position: "absolute",
      height: 50,
      width: 50,
      animation: "mymove 9s infinite",
      opacity: ".4",
      background: "#0a2e7d",
      borderRadius: "50%",
      ...sx,
    }}
  />
);

export const Coins = ({
  coin,
  coinName,
  balance,
  amountType,
  amount,
  onOrder,
}: coinBox.Props) => (
  <Mui.Stack
    direction="row"
    justifyContent="space-around"
    alignItems="center"
    spacing={2}
    component={Mui.Paper}
    sx={{
      p: 1,
      width: 200,
      borderRadius: 2,
      bgcolor: (theme) =>
        theme.palette.mode === "dark" ? undefined : Mui.colors.grey[100],
    }}
  >
    <Mui.Stack alignItems="center" spacing={1}>
      <Mui.Stack direction="row" alignItems="center" spacing={1}>
        <Mui.Avatar
          src={`${import.meta.env.VITE_API_ENCRYPTION}://${
            import.meta.env.VITE_API_IP
          }${import.meta.env.VITE_ASSETS_PATH}${coin}`}
          sx={{ height: 30, width: 30 }}
        />

        <Mui.Typography variant="body2">{coinName}</Mui.Typography>
      </Mui.Stack>

      <Mui.Typography variant="caption" noWrap>
        <Components.Global.Format type={amountType} number={amount} />
      </Mui.Typography>
    </Mui.Stack>
    <Mui.Stack spacing={1}>
      <Mui.Typography sx={{ fontWeight: 800 }}>
        <Components.Global.Format type="number" number={balance} />
      </Mui.Typography>
      {onOrder && (
        <Mui.Typography variant="caption">
          On Order : <Components.Global.Format type="number" number={onOrder} />
        </Mui.Typography>
      )}
    </Mui.Stack>
  </Mui.Stack>
);

export declare namespace coinBox {
  export interface Props {
    coin: string;
    coinName: string;
    balance: number;
    amountType: string;
    amount: number;
    onOrder?: number;
  }
}
