import React, { Component } from "react";
import Header from "../component/Header";
import DashboardItem from "../component/DashboardItem";
import { Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import config from "../config";
import PieChart from "../component/chartTypes/PieChart";
import LineChart from "../component/chartTypes/LineChart";
import PieChartReport from "../component/chartTypes/PieChartReport";
import api, { apiCall } from "../utils/api";
import { chartColors } from "../assets/assetsForChart/colorForChart";
import ItemReport from "../component/ItemReport";
class WFHReportGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalUser: 0,
      todayCheckin: 0,
      todayCheckout: 0,
      totalClaim: 0,
      dataFull: [],
      report10day: [],
      dataTable10day: [],
      errors: "",
      wfhByDayChart: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
      vpfisByDayChart: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
      onsiteByDayChart: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
      fis_onsiteByDayChart: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
          },
        ],
      },
      generalChart: {
        labels: ["WFH", "VP FIS", "K.Hàng", "VP FIS + KH", "Kh Checkin"],
        datasets: [
          {
            data: [10, 20, 30, 30, 10],
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
          },
        ],
      },
      arrValueFIS: [
        {
          id: 1,
          value: 1444,
          ratio: 20,
        },
        {
          id: 2,
          value: 120,
          ratio: 20,
        },
        {
          id: 3,
          value: 1231,
          ratio: 20,
        },
        {
          id: 4,
          value: 11,
          ratio: 20,
        },
      ],
      dataFullToday: [],
    };
  }

  async componentDidMount() {
    // await this.getTotalUser()
    // await this.getTodayCheckin()
    // await this.getTodayCheckout()
    // await this.getUserByDepartment()
    await this.getDashboardDataWFH10days();
    await this.getDashboardDataWFHToday();

    // await this.getTotalClaim();
  }

  convertTime = (time) => {
    if (time === null) {
      return "";
    }
    let day = time.getUTCDate();
    if (day < 10) {
      day = "0" + day;
    }

    let month = time.getUTCMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let year = time.getUTCFullYear();

    let result = `${day}-${month}-${year}`;
    return result;
  };
  getNameRowTable10days = (val) => {
    switch (val) {
      case 1:
        return {
          id: "WFH",
          label: "WFH",
        };
        break;
      case 2:
        return {
          id: "COMPANY",
          label: "VĂN PHÒNG FIS",
        };

        break;
      case 3:
        return {
          id: "ONSITE",
          label: "KHÁCH HÀNG",
        };

        break;
      case 4:
        return {
          id: "COMPANY_ONSITE",
          label: "VĂN PHÒNG FIS VÀ KHÁCH HÀNG",
        };

        break;
      default:
        break;
    }
  };
  getDashboardDataWFH10days = async () => {
    await fetch(`${config.IPLOCAL}/api/report/get_report_wfh_10days`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let label = [];
        let chartData = [];
        let arrTable10days = [];
        for (let i = 1; i <= 4; i++) {
          let arrValue = [];
          let type = this.getNameRowTable10days(i).id;

          for (const e of data.data) {
            switch (type) {
              case "WFH":
                arrValue.push(e.WFH);
                break;
              case "COMPANY":
                arrValue.push(e.COMPANY);
                break;
              case "ONSITE":
                arrValue.push(e.ONSITE);
                break;
              case "COMPANY_ONSITE":
                arrValue.push(e.ONSITE + e.COMPANY);
                break;
              default:
                break;
            }
          }

          arrTable10days.push({
            id: i,
            label: this.getNameRowTable10days(i).label,
            value: arrValue,
          });
        }

        let wfhInLabel = [];
        let wfhinData = [];
        for (const wfh of data.data) {
          wfhInLabel.push(wfh.Time.slice(5, 10));
          wfhinData.push(wfh.WFH);
        }

        let vpfisInLabel = [];
        let vpfisinData = [];
        for (const vpFis of data.data) {
          vpfisInLabel.push(vpFis.Time.slice(5, 10));
          vpfisinData.push(vpFis.COMPANY);
        }

        let onsiteInLabel = [];
        let onsiteinData = [];
        for (const onsite of data.data) {
          onsiteInLabel.push(onsite.Time.slice(5, 10));
          onsiteinData.push(onsite.ONSITE);
        }

        let fis_onsiteInLabel = [];
        let fis_onsiteinData = [];
        for (const fis_onsite of data.data) {
          fis_onsiteInLabel.push(fis_onsite.Time.slice(5, 10));
          fis_onsiteinData.push(fis_onsite.ONSITE + fis_onsite.COMPANY);
        }

        this.setState({
          dataFull: data.data,
          report10day: arrTable10days,
          wfhByDayChart: {
            labels: wfhInLabel.reverse(),
            datasets: [
              {
                label: "Total WFH",
                data: wfhinData.reverse(),
                fill: false,
                borderColor: "#548235", 
                borderJoinStyle: "miter",
                borderCapStyle: "butt",
                type: "line",
                lineTension: 0.1,
              },
            ],
          },
          vpfisByDayChart: {
            labels: vpfisInLabel.reverse(),
            datasets: [
              {
                label: "Total VP FIS",
                data: vpfisinData.reverse(),
                fill: false,
                borderColor: "#ef7d31",
                borderJoinStyle: "miter",
                borderCapStyle: "butt",
                type: "line",
                lineTension: 0.1,
              },
            ],
          },
          onsiteByDayChart: {
            labels: onsiteInLabel.reverse(),
            datasets: [
              {
                label: "Total Onsite",
                data: onsiteinData.reverse(),
                fill: false,
                borderColor: "#203f76",
                borderJoinStyle: "miter",
                borderCapStyle: "butt",
                type: "line",
                lineTension: 0.1,
              },
            ],
          },
          fis_onsiteByDayChart: {
            labels: fis_onsiteInLabel.reverse(),
            datasets: [
              {
                label: "Total VP FIS + Onsite",
                data: fis_onsiteinData.reverse(),
                fill: false,
                borderColor: "#3a3838",
                borderJoinStyle: "miter",
                borderCapStyle: "butt",
                type: "line",
                lineTension: 0.1,
              },
            ],
          },
        });
      })
      .catch((err) => console.log(err));
  };
  getDashboardDataWFHToday = async () => {
    await fetch(`${config.IPLOCAL}/api/report/get_report_wfh_today`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let totalUser = 0;
        let totalWFH = 0;
        let totalOnsite = 0;
        let totalCompany = 0;
        for (const e of data.data) {
          totalUser += e.total;
          totalWFH += e.WFH;
          totalOnsite += e.ONSITE;
          totalCompany += e.COMPANY;
        }

        let ratioWFH = ((totalWFH / totalUser) * 100).toFixed(1);
        let ratioCompany = ((totalCompany / totalUser) * 100).toFixed(1);
        let ratioOnsite = ((totalOnsite / totalUser) * 100).toFixed(1);
        let ratioCompany_Onsite = (
          ((totalOnsite + totalCompany) / totalUser) *
          100
        ).toFixed(1);
        let ratioNoCheckin = (
          ((totalUser - totalWFH - totalOnsite - totalCompany) / totalUser) *
          100
        ).toFixed(1);
        let arrRsFIS = [];
        for (let int = 1; int <= 4; int++) {
          switch (int) {
            case 1:
              arrRsFIS.push({
                id: int,
                value: totalWFH,
                ratio: ratioWFH,
              });
              break;
            case 2:
              arrRsFIS.push({
                id: int,
                value: totalCompany,
                ratio: ratioCompany,
              });

              break;
            case 3:
              arrRsFIS.push({
                id: int,
                value: totalOnsite,
                ratio: ratioOnsite,
              });

              break;
            case 4:
              arrRsFIS.push({
                id: int,
                value: totalOnsite + totalCompany,
                ratio: ratioCompany_Onsite,
              });

              break;
            default:
              break;
          }
        }
        let valueChart = {
          labels: ["WFH", "VP FIS", "K.Hàng", "VP FIS + KH", "Kh Checkin"],
          datasets: [
            {
              data: [
                ratioWFH,
                ratioCompany,
                ratioOnsite,
                ratioCompany_Onsite,
                ratioNoCheckin,
              ],
              backgroundColor: chartColors,
              hoverBackgroundColor: chartColors,
            },
          ],
        };
        this.setState({
          arrValueFIS: arrRsFIS,
          generalChart: valueChart,
          dataFullToday: data.data,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const {
      totalUser,
      todayCheckin,
      todayCheckout,
      userByDepartment,
      totalClaim,
      arrValueFIS,
    } = this.state;

    return (
      <Container>
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col>
            <a
              href="/tdcmobileapp/fis/dashboard"
              style={{ textDecoration: "none" }}
            >
              <h1 style={{ color: "#f07933" }}>Dashboard FIS Insight App</h1>
            </a>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <Col>
            <h1 style={{ color: "#765755" }}>BÁO CÁO TÍNH HÌNH WFH</h1>
          </Col>
        </Row>
        {this.state.dataFull.length > 0 && (
          <Row className="table">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Loại hình làm việc</th>
                    {this.state.report10day.map((e) => {
                      return <th>{e.label}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataFull.length > 0 ? (
                    this.state.dataFull.map((item, i) => (
                      <tr key={i}>
                        <td>{item.Time.slice(0, 10)}</td>
                        <td>{item.WFH}</td>
                        <td>{item.COMPANY}</td>
                        <td>{item.ONSITE}</td>
                        <td>{item.ONSITE + item.COMPANY}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">
                        {this.state.errors !== ""
                          ? this.state.errors
                          : "No data here or server is error"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}

        {/* <Row>
          {itemList.map((item) => (
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              style={{ marginBottom: "20px" }}
            >
              <DashboardItem
                href={item.href}
                item={item.item}
                title={item.title}
                content={item.content}
              />
            </Col>
          ))}
        </Row> */}

        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginTop: "40px" }}
          >
            <LineChart
              title="Số người WFH"
              chartData={this.state.wfhByDayChart}
              legendPosition="bottom"
            />
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '40px' }}>
            <LineChart title='Tổng số checkout theo ngày' chartData={this.state.checkoutByDayChart} legendPosition="bottom" />
          </Col> */}
        </Row>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginTop: "40px" }}
          >
            <LineChart
              title="Số người làm việc tại VP FIS"
              chartData={this.state.vpfisByDayChart}
              legendPosition="bottom"
            />
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '40px' }}>
            <LineChart title='Tổng số checkout theo ngày' chartData={this.state.checkoutByDayChart} legendPosition="bottom" />
          </Col> */}
        </Row>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginTop: "40px" }}
          >
            <LineChart
              title="Số người làm việc tại khách hàng"
              chartData={this.state.onsiteByDayChart}
              legendPosition="bottom"
            />
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginTop: '40px' }}>
            <LineChart title='Tổng số checkout theo ngày' chartData={this.state.checkoutByDayChart} legendPosition="bottom" />
          </Col> */}
        </Row>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginTop: "40px" }}
          >
            <LineChart
              title="Số người làm việc tại VP FIS và KH"
              chartData={this.state.fis_onsiteByDayChart}
              legendPosition="bottom"
            />
          </Col>
        </Row>

        <div className="item__left">
          <Row style={{ flex: 9, justifyContent: "space-between" }}>
            <ItemReport
              title="WFH"
              value={arrValueFIS[0].value}
              ratio={arrValueFIS[0].ratio}
              color="#548235"
            />
            <ItemReport
              title="VĂN PHÒNG FIS"
              value={arrValueFIS[1].value}
              ratio={arrValueFIS[1].ratio}
              color="#ef7d31"
            />
            <ItemReport
              title="KHÁCH HÀNG"
              value={arrValueFIS[2].value}
              ratio={arrValueFIS[2].ratio}
              color="#203f76"
            />
            <ItemReport
              title="VĂN PHÒNG FIS VÀ KHÁCH HÀNG"
              value={arrValueFIS[3].value}
              ratio={arrValueFIS[3].ratio}
              color="#3a3838"
            />
          </Row>
        </div>
        <PieChartReport
          title="BÁO CÁO TÌNH HÌNH WORK FROM HOME"
          displayLegend={false}
          chartData={this.state.generalChart}
        />

        {this.state.dataFullToday.length > 0 && (
          <Row className="table">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Chi nhánh</th>
                    <th>Đơn vị</th>
                    <th>WFH</th>
                    <th>Văn phòng FIS</th>
                    <th>Khách hàng</th>
                    <th>Văn phòng FIS và KH</th>
                    <th>Tỉ lệ WFH</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dataFullToday.length > 0 ? (
                    this.state.dataFullToday.map((item, i) => (
                      <tr key={i}>
                        <td>{item.agency == null ? "N/A" : item.agency}</td>
                        <td>{item._id == null ? "N/A" : item._id}</td>
                        <td>{item.WFH}</td>
                        <td>{item.COMPANY}</td>
                        <td>{item.ONSITE}</td>
                        <td>{item.ONSITE + item.COMPANY}</td>
                        <td>{((item.WFH / item.total) * 100).toFixed(1)}%</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">
                        {this.state.errors !== ""
                          ? this.state.errors
                          : "No data here or server is error"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default WFHReportGeneral;

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
