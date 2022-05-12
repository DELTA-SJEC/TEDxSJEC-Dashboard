import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/dashboard/app">
      <Box
        component="img"
        src="https://register.tedxsjec.in/favicon/apple-touch-icon.png"
        sx={{ width: 40, height: 40, ...sx }}
      />
    </RouterLink>
  );
}
