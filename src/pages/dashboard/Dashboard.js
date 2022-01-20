import React, { useState } from "react";
import {
  Grid,
  Typography
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";

const PieChartDataClasses = [
  { name: "IT", value: 4, color: "primary" },
  { name: "Bussiness", value: 6, color: "secondary" },

];

const PieChartDataStudents = [
  { name: "IT", value: 4, color: "primary" },
  { name: "Bussiness", value: 6, color: "secondary" },

];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();


  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Students"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography variant="h1" noWrap>
                10
              </Typography>
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Active
                </Typography>
                <Typography size="md">10</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Inactive
                </Typography>
                <Typography size="md">0</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  New Students
                </Typography>
                <Typography size="md">10</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Total Teachers"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography variant="h1" noWrap>
                2
              </Typography>
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
            </div>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Active
                </Typography>
                <Typography size="md">2</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Inactive
                </Typography>
                <Typography size="md">0</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  New Teachers
                </Typography>
                <Typography size="md">2</Typography>
              </Grid>
            </Grid>        
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="New Students"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartDataStudents}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartDataStudents.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartDataStudents.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="New Classes" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartDataClasses}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartDataClasses.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartDataClasses.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={6}>
          <Widget
            title="List of Students absent 25%"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table />
          </Widget>
        </Grid>

        <Grid item xs={6}>
          <Widget
            title="List of Top Students"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

