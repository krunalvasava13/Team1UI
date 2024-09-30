import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PowerBIDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Power BI Dashboard
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <iframe
                  title="Sample"
                  width="1000"
                  height="541.25"
                  src="https://app.powerbi.com/reportEmbed?reportId=50bf9368-fcf5-469a-82de-5c9f4375b249&autoAuth=true&ctid=73136b73-224c-40dc-8a8d-03e6ab8917d8"
                  frameBorder="0"
                  allowFullScreen="true"
                ></iframe>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PowerBIDashboard;
