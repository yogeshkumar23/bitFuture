import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";

export const Table = ({ titles, data, hide, height }: table.Props) => (
  <Mui.TableContainer
    sx={{ maxHeight: 450, minHeight: height ? 195 : undefined }}
  >
    <Mui.Table stickyHeader size="small">
      <Mui.TableHead sx={{ display: hide ? "none" : undefined }}>
        {titles.map((title, index) => (
          <Mui.TableCell key={index} sx={{ border: "none", px: 0.6 }}>
            <Mui.Typography noWrap variant="caption" color="text.secondary">
              {title}
            </Mui.Typography>
          </Mui.TableCell>
        ))}
      </Mui.TableHead>
      <Mui.TableBody>
        {data?.map((values, index) => (
          <TableData key={index} {...values} />
        ))}
      </Mui.TableBody>
    </Mui.Table>
  </Mui.TableContainer>
);

const TableData = (props: table.Data) => (
  <Mui.TableRow>
    {Object.entries(props)?.map(([key, value], index, a) => (
      <Mui.TableCell
        key={index}
        sx={{
          border: "none",
          px: 0.6,
          py: a.length > 3 ? 0.8 : 0.1,
          width: index ? undefined : 100,
        }}
      >
        <Mui.Typography noWrap variant="caption">
          {key === "date"
            ? Components.Global.timeFn(value as unknown as string)
            : value}
        </Mui.Typography>
      </Mui.TableCell>
    ))}
  </Mui.TableRow>
);

export declare namespace table {
  export interface Props {
    titles: string[];
    data: Data[];
    hide?: boolean;
    height?: boolean;
  }
  export interface Data {
    [key: string]: string | number | React.ReactNode;
  }
}
