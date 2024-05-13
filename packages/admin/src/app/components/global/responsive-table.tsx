import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Components from "src/app/components";

export const ResponsiveTable = ({
  titles,
  data,
  size = "medium",
  id,
  rowPerPage = 10,
  count,
  pageNo,
  setPageNo,
}: responsiveTable.Props & Pick<Mui.TableProps, "size">) => {
  const [page, setPage] = React.useState(1);
  const doc = new jsPDF();

  const downloadPDF = () => {
    doc.text(`${id} Report`, 15, 10);
    autoTable(doc, {
      html: `#${id?.toLowerCase()?.replaceAll(" ", "_")}`,
      theme: "striped",
    });
    doc.save(
      `${id?.toLowerCase()?.replaceAll(" ", "_")}_${new Date().getTime()}.pdf`
    );
  };
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (setPageNo) setPageNo(value);
    else setPage(value);
  };

  React.useEffect(() => {
    setPage(1);
  }, [data.length]);

  return (
    <Mui.Box sx={{ position: "relative", borderRadius: "inherit" }}>
      <Mui.TableContainer
        sx={{
          borderRadius: "inherit",
          display: { xs: "none", md: "block" },
          minHeight: 600,
          position: "relative",
        }}
      >
        <Mui.Table size={size} id={id?.toLowerCase()?.replaceAll(" ", "_")}>
          <Mui.TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : "background.default",
              borderColor: (theme) => theme.palette.grey[100],
            }}
          >
            {titles.map((title, index) => (
              <Mui.TableCell key={index}>
                <Mui.Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Mui.Typography noWrap variant="body2" color="text.secondary">
                    {title}
                  </Mui.Typography>
                  {index === titles.length - 1 && (
                    <Mui.IconButton
                      size="small"
                      onClick={downloadPDF}
                      sx={{
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.main}`,
                        bgcolor: "#fff",
                        my: -5,
                      }}
                    >
                      <MuiIcons.PictureAsPdf color="primary" />
                    </Mui.IconButton>
                  )}
                </Mui.Stack>
              </Mui.TableCell>
            ))}
          </Mui.TableRow>
          <Mui.TableBody>
            {data?.length ? (
              data
                ?.slice(
                  count ? 0 : rowPerPage * page - rowPerPage,
                  count ? undefined : rowPerPage * page
                )
                ?.map((values, index) => <TableData key={index} {...values} />)
            ) : (
              <Mui.TableRow>
                <Mui.TableCell colSpan={titles?.length}>
                  <Mui.Typography
                    variant="h5"
                    textAlign="center"
                    color="text.secondary"
                    sx={{ p: 5 }}
                  >
                    No Record Found
                  </Mui.Typography>
                </Mui.TableCell>
              </Mui.TableRow>
            )}
          </Mui.TableBody>
        </Mui.Table>
      </Mui.TableContainer>
      {data?.length ? (
        data
          ?.slice(
            count ? 0 : rowPerPage * page - rowPerPage,
            count ? undefined : rowPerPage * page
          )
          ?.map((values, index) => (
            <CardView key={index} titles={titles} data={values} />
          ))
      ) : (
        <Mui.Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={{
            display: { xs: "flex", md: "none" },
            p: 5,
          }}
        >
          No Record Found
        </Mui.Typography>
      )}
      <Mui.Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ m: 2 }}
      >
        <Mui.Typography variant="body1">
          Total: {count || data.length}
        </Mui.Typography>
        <Mui.Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={
            (count || data.length) <= rowPerPage
              ? 1
              : (count || data.length) % rowPerPage
              ? parseInt(((count || data.length) / rowPerPage).toString()) + 1
              : parseInt(((count || data.length) / rowPerPage).toString())
          }
          page={pageNo || page}
          onChange={handlePageChange}
        />
      </Mui.Stack>
    </Mui.Box>
  );
};

const TableData = ({ node, ...props }: responsiveTable.Data) => {
  const [open, close] = React.useState(false);
  return (
    <>
      <Mui.TableRow
        sx={{ borderColor: (theme) => theme.palette.grey[100] }}
        onClick={() => close(!open)}
      >
        {Object.entries(props).map(([key, value], index) => (
          <Mui.TableCell key={index}>
            <Mui.Typography noWrap variant="body2">
              {key === "date"
                ? Components.Global.timeFn(value as unknown as string)
                : value}
            </Mui.Typography>
          </Mui.TableCell>
        ))}
      </Mui.TableRow>
      {node && open && (
        <Mui.TableRow>
          <Mui.TableCell colSpan={Object.keys(props).length}>
            {node}
          </Mui.TableCell>
        </Mui.TableRow>
      )}
    </>
  );
};

const CardView = ({
  titles,
  data: { node, ...values },
}: responsiveTable.CardProps) => {
  const [open, close] = React.useState(false);
  return (
    <Mui.Card
      sx={{
        borderRadius: "inherit",
        display: { xs: "block", md: "none" },
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        // boxShadow: (theme) => {
        //   md: `0 0 5px ${theme.palette.grey[400]}`;
        // },
        my: 1,
      }}
    >
      <Mui.Grid
        component={Mui.CardContent}
        container
        spacing={2}
        sx={{
          display: { xs: "flex", md: "none" },
        }}
        onClick={() => close(!open)}
      >
        {Object.entries(values).map(([key, value], i, a) => (
          <Mui.Grid
            key={i}
            item
            xs={a.length % 2 && a.length === i + 1 ? 12 : 6}
          >
            {key === "date" ? (
              <Components.Global.StackLabel
                medium
                title={titles[i]}
                label={value}
                time
              />
            ) : key === "action" ? (
              value
            ) : key === "coin" ? (
              <Mui.Typography variant="body1" noWrap>
                {value}
              </Mui.Typography>
            ) : (
              <Components.Global.StackLabel
                medium
                title={titles[i]}
                label={value}
                node
              />
            )}
          </Mui.Grid>
        ))}
      </Mui.Grid>
      {node && open && node}
    </Mui.Card>
  );
};

export declare namespace responsiveTable {
  export interface Props {
    titles: string[];
    data: Data[];
    id?: string;
    rowPerPage?: number;
    count?: number;
    pageNo?: number;
    setPageNo?: (number: number) => void;
  }
  export interface CardProps {
    titles: string[];
    data: Data;
  }
  export interface Data {
    [key: string]: string | number | React.ReactNode;
  }
}
