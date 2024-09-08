/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        {/* <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "S&P 500", fontWeight: "regular" }}
                count="5,304.72"
                percentage={{ color: "success", text: "+0.70%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Nasdaq" }}
                count="16,920.80"
                percentage={{ color: "success", text: "+1.10%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Crude Oil" }}
                count="$78.55"
                percentage={{ color: "error", text: "+1.07%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Gold" }}
                count="$2352.50"
                percentage={{ color: "success", text: "+0.77%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox> */}
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={7} xl={7}>
              <WelcomeMark />
            </Grid>
            {/* <Grid item xs={12} lg={4} xl={4}>
              <SatisfactionRate />
            </Grid> */}
            <Grid item xs={12} lg={5} xl={5}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        {/* <VuiBox mb={3}>
          // <Grid container spacing={3}>
          //   <Grid item xs={12} lg={6} xl={7}>
          //     <Card>
          //       <VuiBox sx={{ height: "100%" }}>
          //         <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
          //           Past Year to Date Performance
          //         </VuiTypography>
          //         <VuiBox display="flex" alignItems="center" mb="40px">
          //           <VuiTypography variant="button" color="success" fontWeight="bold">
          //             +5% more{" "}
          //             <VuiTypography variant="button" color="text" fontWeight="regular">
          //               since May 2023
          //             </VuiTypography>
          //           </VuiTypography>
          //         </VuiBox>
          //         <VuiBox sx={{ height: "310px" }}>
          //           <LineChart
          //             lineChartData={lineChartDataDashboard}
          //             lineChartOptions={lineChartOptionsDashboard}
          //           />
          //         </VuiBox>
          //       </VuiBox>
          //     </Card>
          //   </Grid>
          //   <Grid item xs={12} lg={6} xl={5}>
          //     <Card>
          //       <VuiBox>
          //         <VuiBox
          //           mb="24px"
          //           height="220px"
          //           sx={{
          //             background: linearGradient(
          //               cardContent.main,
          //               cardContent.state,
          //               cardContent.deg
          //             ),
          //             borderRadius: "20px",
          //           }}
          //         >
          //           <BarChart
          //             barChartData={barChartDataDashboard}
          //             barChartOptions={barChartOptionsDashboard}
          //           />
          //         </VuiBox>
          //         <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
          //           Earnings Average Gains
          //         </VuiTypography>
          //         <VuiBox display="flex" alignItems="center" mb="40px">
          //           <VuiTypography variant="button" color="success" fontWeight="bold">
          //             (+2.6%){" "}
          //             <VuiTypography variant="button" color="text" fontWeight="regular">
          //               than before earnings
          //             </VuiTypography>
          //           </VuiTypography>
          //         </VuiBox>
          //         <Grid container spacing="50px">
          //           <Grid item xs={6} md={3} lg={3}>
          //             <Stack
          //               direction="row"
          //               spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
          //               mb="6px"
          //             >
          //               <VuiBox
          //                 bgColor="info"
          //                 display="flex"
          //                 justifyContent="center"
          //                 alignItems="center"
          //                 sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
          //               >
          //                 <IoWallet color="#fff" size="12px" />
          //               </VuiBox>
          //               <VuiTypography color="text" variant="button" fontWeight="medium">
          //                 Gains
          //               </VuiTypography>
          //             </Stack>
          //             <VuiTypography color="success" variant="lg" fontWeight="bold" mb="8px">
          //               32 Stocks
          //             </VuiTypography>
          //             <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          //           </Grid>
          //           <Grid item xs={6} md={3} lg={3}>
          //             <Stack
          //               direction="row"
          //               spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
          //               mb="6px"
          //             >
          //               <VuiBox
          //                 bgColor="info"
          //                 display="flex"
          //                 justifyContent="center"
          //                 alignItems="center"
          //                 sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
          //               >
          //                 <IoIosRocket color="#fff" size="12px" />
          //               </VuiBox>
          //               <VuiTypography color="text" variant="button" fontWeight="medium">
          //                 Loss
          //               </VuiTypography>
          //             </Stack>
          //             <VuiTypography color="error" variant="lg" fontWeight="bold" mb="8px">
          //               24 Stocks
          //             </VuiTypography>
          //             <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          //           </Grid>
          //           <Grid item xs={6} md={3} lg={3}>
          //             <Stack
          //               direction="row"
          //               spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
          //               mb="6px"
          //             >
          //               <VuiBox
          //                 bgColor="info"
          //                 display="flex"
          //                 justifyContent="center"
          //                 alignItems="center"
          //                 sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
          //               >
          //                 <FaShoppingCart color="#fff" size="12px" />
          //               </VuiBox>
          //               <VuiTypography color="text" variant="button" fontWeight="medium">
          //                 Average Gaining
          //               </VuiTypography>
          //             </Stack>
          //             <VuiTypography color="success" variant="lg" fontWeight="bold" mb="8px">
          //               5.7%
          //             </VuiTypography>
          //             <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          //           </Grid>
          //           <Grid item xs={6} md={3} lg={3}>
          //             <Stack
          //               direction="row"
          //               spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
          //               mb="6px"
          //             >
          //               <VuiBox
          //                 bgColor="info"
          //                 display="flex"
          //                 justifyContent="center"
          //                 alignItems="center"
          //                 sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
          //               >
          //                 <IoBuild color="#fff" size="12px" />
          //               </VuiBox>
          //               <VuiTypography color="text" variant="button" fontWeight="medium">
          //                 Average Losing
          //               </VuiTypography>
          //             </Stack>
          //             <VuiTypography color="error" variant="lg" fontWeight="bold" mb="8px">
          //               -4.5%
          //             </VuiTypography>
          //             <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
          //           </Grid>
          //         </Grid>
          //       </VuiBox>
          //     </Card>
          //   </Grid>
          // </Grid>
        </VuiBox> */}
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
            <ProfileInfoCard
              title="US PMI Survey May"
              description="The US Purchasing Managers’ Index (PMI) survey for May is a critical macroeconomic event that measures the economic health of the manufacturing sector. Conducted by the Institute for Supply Management (ISM), the PMI survey assesses variables such as new orders, inventory levels, production, supplier deliveries, and employment. A PMI reading above 50 indicates expansion in the manufacturing sector, while a reading below 50 signals contraction. The survey results are highly anticipated by economists, investors, and policymakers, as they provide valuable insights into economic trends, business confidence, and potential future economic activity. The May PMI survey can influence financial markets, impact business decisions, and guide monetary policy adjustments by the Federal Reserve."
              info={{
                Country: "US",
                Period: "Monthly",
                "Official Data": "Yes",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
            />
          </Grid> */}
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
