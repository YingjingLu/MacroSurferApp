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

export default function data(eventList) {
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

  const rows = [];
  for (const event of eventList) {
    rows.push({
      Event: (
        <VuiBox display="flex" alignItems="center">
          <AdobeXD size="20px" />
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            {event.event}
          </VuiTypography>
        </VuiBox>
      ),
      Time: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          {new Date(event.event_date).toLocaleString()} {/* Example date formatting */}
        </VuiTypography>
      ),
      Period: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
           {event.period || "Monthly"}  // todo: API data may be missing period, do we still need that?
        </VuiTypography>
      ),
      Forecast: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
            {event.estimate || "N/A"}
        </VuiTypography>
      ),
      Previous: (
        <VuiBox width="8rem" textAlign="left">
          <VuiTypography color="white" variant="button" fontWeight="bold">
            {event.previous || "N/A"}
          </VuiTypography>
        </VuiBox>
      ),
        Changes: (
          <VuiBox width="8rem" textAlign="left">
          <VuiTypography color="white" variant="button" fontWeight="bold">
            {event.change_percentage || "N/A"}
          </VuiTypography>
        </VuiBox>
        ),
        Unit: (
          <VuiBox width="8rem" textAlign="left">
          <VuiTypography color="white" variant="button" fontWeight="bold">
            {event.unit || "N/A"}
          </VuiTypography>
        </VuiBox>
        )
    });
   }

  return {
    columns: [
        {name: "Event", align: "left"},
        {name: "Time", align: "left"},
        {name: "Period", align: "center"},
        {name: "Forecast", align: "center"},
        {name: "Previous", align: "center"},
        {name: "Changes", align: "center"},
        {name: "Unit", align: "center"}
    ],
    rows,
    };
}
