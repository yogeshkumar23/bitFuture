import * as Mui from "@mui/material";
import * as React from "react";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const TicketHistory = ({ tickets }: { tickets: tickets[] }) => {
  const [filter, setFilter] = React.useState<"all" | "pending" | "closed">(
    "all"
  );
  const [wallet, setWallet] = React.useState(false);
  const handleChange = (e: Mui.SelectChangeEvent) =>
    setFilter(e.target.value as "all" | "pending" | "closed");

  const handleWalletFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWallet(event.target.checked);
  };

  return (
    <Components.Global.Container
      direction="column"
      justifyContent="start"
      spacing={2}
    >
      <Mui.Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Mui.Typography variant="h6" sx={{ fontWeight: 1000 }}>
          Ticket History
          <Mui.Typography variant="caption">
            (
            {
              tickets?.filter((ticket) =>
                filter === "all" ? true : ticket.status === filter
              )?.length
            }
            )
          </Mui.Typography>
        </Mui.Typography>
        <Mui.Select
          size="small"
          value={filter}
          onChange={handleChange}
          sx={{ width: 150 }}
        >
          <Mui.MenuItem value="all">All Status</Mui.MenuItem>
          <Mui.MenuItem value="closed">Closed</Mui.MenuItem>
          <Mui.MenuItem value="pending">Pending</Mui.MenuItem>
        </Mui.Select>
      </Mui.Stack>
      <Mui.FormControlLabel
        control={<Mui.Checkbox name="metamask" onChange={handleWalletFilter} />}
        label="Metamask wallet change"
      />
      <Mui.Stack
        spacing={2}
        sx={{ width: "100%", height: "80vh", overflow: "auto" }}
      >
        {tickets?.filter((ticket) =>
          filter === "all" ? true : ticket.status === filter
        )?.length ? (
          tickets
            ?.filter((ticket) =>
              filter === "all" ? true : ticket.status === filter
            )
            ?.filter((ticket) => (wallet ? ticket.metamask : true))
            ?.sort((a, b) =>
              a.createdTime < b.createdTime
                ? 1
                : b.createdTime < a.createdTime
                ? -1
                : 0
            )
            ?.map((ticket, index) => (
              <Pages.Ticket.Views.Ticket key={index} {...ticket} />
            ))
        ) : (
          <Mui.Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ p: 5 }}
          >
            No Tickets Found
          </Mui.Typography>
        )}
      </Mui.Stack>
    </Components.Global.Container>
  );
};
