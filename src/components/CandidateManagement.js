// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

// Talent Flow React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Button, IconButton } from "@mui/material";
import MDInput from "./MDInput";
import { Edit, Delete } from "@mui/icons-material"; // Icons for edit and delete
import apiService from "Services/apiServices";
import PropTypes from "prop-types";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("applied");
  const [editingCandidate, setEditingCandidate] = useState(null); // Track if editing a candidate

  // Fetch candidates from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await apiService.get("/api/candidates");
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };
    fetchCandidates();
  }, []);

  // Handle form submission for adding/updating candidates
  // Handle form submission for adding/updating candidates
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create newCandidate object with candidateId for editing
    const newCandidate = {
      candidateId: editingCandidate ? editingCandidate.candidateId : undefined,
      name,
      email,
      status,
    };

    if (editingCandidate) {
      // Update candidate
      try {
        await apiService.put(`/api/candidates/${editingCandidate.candidateId}`, newCandidate);
        const updatedCandidates = candidates.map((candidate) =>
          candidate.candidateId === editingCandidate.candidateId
            ? { ...candidate, ...newCandidate }
            : candidate
        );
        setCandidates(updatedCandidates);
        setEditingCandidate(null); // Reset editing state
      } catch (error) {
        console.error("Failed to update candidate", error);
      }
    } else {
      // Add new candidate
      try {
        const data = await apiService.post("/api/candidates", newCandidate);
        setCandidates([...candidates, data]);
      } catch (error) {
        console.error("Failed to add candidate", error);
      }
    }

    // Reset form fields
    setName("");
    setEmail("");
    setStatus("applied");
  };

  // Handle editing a candidate
  const handleEdit = (candidate) => {
    setName(candidate.name);
    setEmail(candidate.email);
    setStatus(candidate.status);
    setEditingCandidate(candidate); // Set the candidate to be edited
  };

  // Handle deleting a candidate with confirmation
  const handleDelete = async (candidateId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");

    if (confirmDelete) {
      try {
        await apiService.delete(`/api/candidates/${candidateId}`);
        const filteredCandidates = candidates.filter(
          (candidate) => candidate.candidateId !== candidateId
        );
        setCandidates(filteredCandidates);
      } catch (error) {
        console.error("Failed to delete candidate", error);
      }
    }
  };

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
                  Candidate Management
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                {/* Form for adding/editing candidates */}
                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                  <MDBox display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
                    {/* <MDInput
                      label="CandidateId"
                      variant="outlined"
                      fullWidth
                      //value={candidateId}
                      //onChange={(e) => setName(e.target.value)}
                    /> */}
                    <MDInput
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <MDInput
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDInput
                      label="Status"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      variant="outlined"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="hired">Hired</option>
                    </MDInput>
                    <Button variant="contained" color="primary" type="submit">
                      {editingCandidate ? "Update Candidate" : "Add Candidate"}
                    </Button>
                  </MDBox>
                </form>

                {/* Table to display candidates */}
                <DataTable
                  table={{
                    columns: [
                      { Header: "ID", accessor: "candidateId" }, // Add Candidate ID column
                      { Header: "Name", accessor: "name" },
                      { Header: "Email", accessor: "email" },
                      { Header: "Status", accessor: "status" },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        Cell: ({ row }) => (
                          <MDBox>
                            <IconButton onClick={() => handleEdit(row.original)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.original.candidateId)}>
                              <Delete color="error" />
                            </IconButton>
                          </MDBox>
                        ),
                      },
                    ],
                    rows: candidates.map((candidate) => ({
                      candidateId: candidate.candidateId, // Ensure `candidateId` is included in the row data
                      name: candidate.name,
                      email: candidate.email,
                      status: candidate.status,
                      actions: null, // This is for action buttons
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

// Define prop types for the component
CandidateManagement.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      candidateId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  editingCandidate: PropTypes.shape({
    candidateId: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
  }),
  row: PropTypes.shape({
    original: PropTypes.shape({
      candidateId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  }),
};

export default CandidateManagement;
