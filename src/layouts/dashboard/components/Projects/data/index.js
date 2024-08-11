// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "Event", align: "left" },
      { name: "Time", align: "left" },
      { name: "Period", align: "center" },
      { name: "Forecast", align: "center" },
      { name: "Previous", align: "center" },
    ],

    rows: [
      ,
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            S&P Case-Shiller home price index (20 cities)
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 28, 9:00 AM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Mar
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            7.3%
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              7.3%
            </VuiTypography>
          </VuiBox>
        ),
      },
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Minneapolis Fed President Neel Kashkari speaks
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 28, 9:55 AM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              
            </VuiTypography>
          </VuiBox>
        ),
      },
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Consumer confidence
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 28, 10:00 AM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            May
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            96.0
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              97.0
            </VuiTypography>
          </VuiBox>
        ),
      },
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Fed Gov. Lisa Cook and San Francisco Fed President Mary Daly speak
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 28, 1:00 PM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              
            </VuiTypography>
          </VuiBox>
        ),
      },
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              New York Fed President John Williams speaks
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 29, 1:45 AM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              
            </VuiTypography>
          </VuiBox>
        ),
      },
      {
        Event: (
          <VuiBox display="flex" alignItems="center">
            <AdobeXD size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Fed Beige Book
            </VuiTypography>
          </VuiBox>
        ),
        Time: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Tue, May 28, 12:55 AM
          </VuiTypography>
        ),
        Period: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Forecast: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            
          </VuiTypography>
        ),
        Previous: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              
            </VuiTypography>
          </VuiBox>
        ),
      },

    ],
  };
}
