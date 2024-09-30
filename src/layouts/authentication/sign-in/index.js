import { useState } from "react";
import { auth, provider, signInWithPopup } from "firebaseConfig"; // Firebase imports
import { PublicClientApplication } from "@azure/msal-browser"; // MSAL import

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Talent Flow React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "3ae01f09-efea-4dc9-9b8e-18200bbf7fde", // Replace with your client ID
    authority: "https://login.microsoftonline.com/73136b73-224c-40dc-8a8d-03e6ab8917d8", // Replace with your tenant ID or use "common" for multi-tenant
    redirectUri: "http://localhost:3000/auth/callback", // Your redirect URI
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Google sign-in function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In User: ", user);
      // Handle user sign-in (store user data, redirect, etc.)
    } catch (error) {
      console.error("Error during Google sign-in: ", error);
    }
  };

  // Microsoft sign-in function
  const handleMicrosoftSignIn = async () => {
    try {
      // Initialize MSAL before calling login
      await msalInstance.initialize();

      const loginResponse = await msalInstance.loginPopup({
        scopes: ["User.Read"], // Add any scopes you need here
      });
      console.log("Login successful!", loginResponse);
      // You can now handle login success (e.g., store tokens, redirect user, etc.)
    } catch (error) {
      console.error("Error during Microsoft sign-in:", error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <MDButton onClick={handleGoogleSignIn} color="inherit" variant="text">
                  <GoogleIcon color="inherit" />
                </MDButton>
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <MDButton onClick={handleMicrosoftSignIn} color="inherit" variant="text">
                  Sign in with Microsoft
                </MDButton>
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
