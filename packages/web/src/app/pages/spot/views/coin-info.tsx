// import * as Mui from "@mui/material";
// import React from "react";
// import * as Router from "react-router-dom";
// import * as Components from "src/app/components";
// import * as Constants from "src/constants";
// import * as Hooks from "src/app/hooks";

// export const CoinInfo = ({
//   coin,
//   filteredCoins,
//   nativeCurrency,
//   nativePrice,
// }: {
//   coin: Hooks.Main.UseCoin.coin;
//   filteredCoins: Hooks.Main.UseCoin.coin[];
//   nativeCurrency: string;
//   nativePrice: number;
// }) => (
//   <Components.Global.Container alignItems="center">
//     <Mui.Grid container spacing={2} alignItems="center">
//       <Mui.Grid item xs>
//         <Mui.Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           spacing={2}
//         >
//           <Mui.Stack direction="row" alignItems="center">
//             <Mui.Avatar
//               src={`${import.meta.env.VITE_API_ENCRYPTION}://${
//                 import.meta.env.VITE_API_IP
//               }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
//               sx={{ height: 35, width: 35 }}
//             />
//             <CoinSearchFieldClass coin={coin} filteredCoins={filteredCoins} />
//           </Mui.Stack>
//           <Mui.Stack spacing={1}>
//             <Mui.Typography
//               noWrap
//               color="primary"
//               variant="body1"
//               fontWeight="bold"
//             >
//               <Components.Global.Format
//                 number={coin.current_price}
//                 type="number"
//               />
//             </Mui.Typography>
//             <Mui.Typography
//               noWrap
//               color="primary"
//               variant="caption"
//               fontWeight="bold"
//             >
//               <Components.Global.Format
//                 number={(coin.current_price || 0) * nativePrice}
//                 type={nativeCurrency}
//               />
//             </Mui.Typography>
//           </Mui.Stack>
//         </Mui.Stack>
//       </Mui.Grid>
//       <Mui.Grid item xs sx={{ display: { xs: "none", md: "block" } }}>
//         <Mui.Box flexGrow={1} />
//       </Mui.Grid>
//       <Mui.Grid item xs>
//         <Mui.Stack
//           direction="row"
//           spacing={5}
//           sx={{ justifyContent: { xs: "space-between", md: "flex-start" } }}
//         >
//           <Components.Global.StackLabel
//             title="24h Change"
//             label={
//               <Components.Global.Format
//                 type="coin"
//                 number={coin?.price24hChange}
//                 coin="%"
//                 negative
//               />
//             }
//             labelColor={(coin?.price24hChange || 0) > 0 ? "success" : "error"}
//             node
//             valBold
//           />
//           <Components.Global.StackLabel
//             title="24h High"
//             label={
//               <Components.Global.Format
//                 type="number"
//                 number={coin?.price24hHigh}
//               />
//             }
//             valBold
//             node
//           />
//           <Components.Global.StackLabel
//             title="24h Low"
//             label={
//               <Components.Global.Format
//                 type="number"
//                 number={coin?.price24hLow}
//               />
//             }
//             valBold
//             node
//           />
//         </Mui.Stack>
//       </Mui.Grid>
//       <Mui.Grid item xs>
//         <Mui.Stack
//           direction="row"
//           spacing={5}
//           sx={{ justifyContent: { xs: "space-between", md: "flex-start" } }}
//         >
//           <Components.Global.StackLabel
//             title={`24h Volume(${coin?.coin})`}
//             label={
//               <Components.Global.Format
//                 type="number"
//                 number={coin?.volumeCoin}
//               />
//             }
//             valBold
//             node
//           />
//           <Components.Global.StackLabel
//             title={`24h Volume(${coin?.currency})`}
//             label={
//               <Components.Global.Format
//                 type="number"
//                 number={coin?.volumeAmount}
//               />
//             }
//             valBold
//             node
//           />
//         </Mui.Stack>
//       </Mui.Grid>
//     </Mui.Grid>
//   </Components.Global.Container>
// );

// const CoinSearchField = React.memo(
//   ({
//     coin,
//     filteredCoins,
//   }: {
//     coin: Partial<Hooks.Main.UseCoin.coin>;
//     filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
//   }) => {
//     const navigate = Router.useNavigate();
//     return (
//       <Mui.Autocomplete
//         size="small"
//         disableClearable
//         value={coin}
//         autoHighlight
//         options={filteredCoins}
//         getOptionLabel={(option) => `${option.coinId}`}
//         onChange={(_, newValue) =>
//           navigate(
//             `${Constants.API_CONFIG.base}spot/${newValue.coinId?.replace(
//               "/",
//               "_"
//             )}`
//           )
//         }
//         renderOption={(props, option) => (
//           <Mui.Stack
//             component="li"
//             {...(props as any)}
//             direction="row"
//             alignItems="center"
//             spacing={2}
//             sx={{
//               textDecoration: "none",
//               color: "text.primary",
//               p: 0.5,
//             }}
//           >
//             <Mui.Avatar
//               src={`${import.meta.env.VITE_API_ENCRYPTION}://${
//                 import.meta.env.VITE_API_IP
//               }${import.meta.env.VITE_ASSETS_PATH}${option.coinLogo}`}
//               sx={{ height: 30, width: 30 }}
//             />
//             <Mui.Typography variant="body2">{option.coinId}</Mui.Typography>
//           </Mui.Stack>
//         )}
//         renderInput={(params) => (
//           <Mui.TextField
//             {...params}
//             sx={{ width: 160 }}
//             placeholder="COIN/PAIR"
//           />
//         )}
//         PaperComponent={(props) => (
//           <Mui.Paper
//             elevation={1}
//             {...props}
//             sx={{ bgcolor: "background.default" }}
//           />
//         )}
//         sx={{
//           "& fieldset": {
//             border: "none",
//           },
//         }}
//       />
//     );
//   }
// );

// class CoinSearchFieldClass extends React.Component<{
//   coin: Partial<Hooks.Main.UseCoin.coin>;
//   filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
// }> {
//   shouldComponentUpdate(nextProps: {
//     coin: Partial<Hooks.Main.UseCoin.coin>;
//     filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
//   }) {
//     if (
//       nextProps.filteredCoins.length === this.props.filteredCoins.length &&
//       nextProps.coin.coinId === this.props.coin.coinId
//     ) {
//       return false;
//     } else return true;
//   }

//   render() {
//     return <CoinSearchField {...this.props} />;
//   }
// }

import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";

export const CoinInfo = ({
  coin,
  filteredCoins,
  nativeCurrency,
  nativePrice,
}: {
  coin: Hooks.Main.UseCoin.coin;
  filteredCoins: Hooks.Main.UseCoin.coin[];
  nativeCurrency: string;
  nativePrice: number;
}) => (
  <Components.Global.Container alignItems="center">
    <Mui.Grid container spacing={2} alignItems="center">
      <Mui.Grid item xs>
        <Mui.Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Mui.Stack direction="row" alignItems="center">
            <Mui.Avatar
              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                import.meta.env.VITE_API_IP
              }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
              sx={{ height: 35, width: 35 }}
            />
            <CoinSearchFieldClass coin={coin} filteredCoins={filteredCoins} />
          </Mui.Stack>
          <Mui.Stack spacing={1}>
            <Mui.Typography
              noWrap
              color="primary"
              variant="body1"
              fontWeight="bold"
            >
              <Components.Global.Format
                number={coin.current_price}
                type="number"
              />
            </Mui.Typography>
            <Mui.Typography
              noWrap
              color="primary"
              variant="caption"
              fontWeight="bold"
            >
              <Components.Global.Format
                number={(coin.current_price || 0) * nativePrice}
                type={nativeCurrency}
              />
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Grid>
      <Mui.Grid item xs sx={{ display: { xs: "none", md: "block" } }}>
        <Mui.Box flexGrow={1} />
      </Mui.Grid>
      <Mui.Grid item xs>
        <Mui.Stack
          direction="row"
          spacing={5}
          sx={{ justifyContent: { xs: "space-between", md: "flex-start" } }}
        >
          <Components.Global.StackLabel
            title="24h Change"
            label={
              <Components.Global.Format
                type="coin"
                number={coin?.price24hChange}
                coin="%"
                negative
              />
            }
            labelColor={(coin?.price24hChange || 0) > 0 ? "success" : "error"}
            node
            valBold
          />
          <Components.Global.StackLabel
            title="24h High"
            label={
              <Components.Global.Format
                type="number"
                number={coin?.price24hHigh}
              />
            }
            valBold
            node
          />
          <Components.Global.StackLabel
            title="24h Low"
            label={
              <Components.Global.Format
                type="number"
                number={coin?.price24hLow}
              />
            }
            valBold
            node
          />
        </Mui.Stack>
      </Mui.Grid>
      <Mui.Grid item xs>
        <Mui.Stack
          direction="row"
          spacing={5}
          sx={{ justifyContent: { xs: "space-between", md: "flex-start" } }}
        >
          <Components.Global.StackLabel
            title={`24h Volume(${coin?.coin})`}
            label={
              <Components.Global.Format
                type="number"
                number={coin?.volumeCoin}
              />
            }
            valBold
            node
          />
          <Components.Global.StackLabel
            title={`24h Volume(${coin?.currency})`}
            label={
              <Components.Global.Format
                type="number"
                number={coin?.volumeAmount}
              />
            }
            valBold
            node
          />
        </Mui.Stack>
      </Mui.Grid>
    </Mui.Grid>
  </Components.Global.Container>
);

const CoinSearchField = React.memo(
  ({
    coin,
    filteredCoins,
  }: {
    coin: Partial<Hooks.Main.UseCoin.coin>;
    filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
  }) => {
    const navigate = Router.useNavigate();
    return (
      <Mui.Autocomplete
        size="small"
        disableClearable
        value={coin}
        autoHighlight
        options={filteredCoins}
        getOptionLabel={(option) => `${option.coinId}`}
        onChange={(_, newValue) =>
          navigate(
            `${Constants.API_CONFIG.base}spot/${newValue.coinId?.replace(
              "/",
              "_"
            )}`
          )
        }
        renderOption={(props, option) => (
          <Mui.Stack
            component="li"
            {...(props as any)}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              textDecoration: "none",
              color: "text.primary",
              p: 0.5,
            }}
          >
            <Mui.Avatar
              src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                import.meta.env.VITE_API_IP
              }${import.meta.env.VITE_ASSETS_PATH}${option.coinLogo}`}
              sx={{ height: 30, width: 30 }}
            />
            <Mui.Typography variant="body2">{option.coinId}</Mui.Typography>
          </Mui.Stack>
        )}
        renderInput={(params) => (
          <Mui.TextField
            {...params}
            sx={{ width: 160 }}
            placeholder="COIN/PAIR"
          />
        )}
        PaperComponent={(props) => (
          <Mui.Paper
            elevation={1}
            {...props}
            sx={{ bgcolor: "background.default" }}
          />
        )}
        sx={{
          "& fieldset": {
            border: "none",
          },
        }}
      />
    );
  }
);

class CoinSearchFieldClass extends React.Component<{
  coin: Partial<Hooks.Main.UseCoin.coin>;
  filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
}> {
  shouldComponentUpdate(nextProps: {
    coin: Partial<Hooks.Main.UseCoin.coin>;
    filteredCoins: Partial<Hooks.Main.UseCoin.coin>[];
  }) {
    if (
      nextProps.filteredCoins.length === this.props.filteredCoins.length &&
      nextProps.coin.coinId === this.props.coin.coinId
    ) {
      return false;
    } else return true;
  }

  render() {
    return <CoinSearchField {...this.props} />;
  }
}
