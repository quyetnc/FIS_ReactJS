import React, { Component, lazy, Suspense } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
// import CircularIndeterminate from './component/Progress'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./view/Home";
import AppDetail from "./view/AppDetail";
import Product from "./view/Product";
import Dashboard from "./view/Dashboard";
import ListUser from "./view/ListUser";
import TodayCheckinout from "./view/TodayCheckinout";
import UploadBuild from "./view/UploadBuild";
import RegisterPage from "./view/RegisterPage";
import ElearningProduct from "./view/ElearningProduct";
import FPTeID from "./view/FPTeID";
import FPTeIDEximbank from "./view/FPTeIDEximBank";
import MedicalForm from "./view/MedicalForm";
import SuccessFormPage from "./view/SuccessFormPage";
import MedicalListReport from "./view/MedicalListReport";
import MedicalFormByUser from "./view/MedicalFormByUser";
import LoginPage from "./view/LoginPage";
import LoginPage1 from "./view/LoginPage1";
import TraceTogetherReport from "./view/TraceTogetherReport";
import TraceTogetherByUser from "./view/TraceTogetherByUser";
import TraceTogetherByUser2 from "./view/TraceTogetherByUser2";
import config from "./config";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import ListUserByCondition from "./view/ListUserByCondition";
import ListUserClaim from "./view/ListUserClaim";
import RegisterPageCenGroup from "./view/RegisterPageCenGroup";
import WHFReport from "./view/WFHReport";
import WFHReportGeneral from "./view/WFHReportGeneral";

class RouteClient extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      data: [],
      cookie: cookies.get("token"),
    };
  }

  componentDidMount = async () => {
    await this.getApplicationList();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.cookies !== this.props.cookies) {
      this.setState({
        cookie: this.props.cookies,
      });
    }
  }

  getApplicationList = async () => {
    await fetch(`${config.IPLOCAL}/api/getApplicationList`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.data.forEach((data) => {
          this.setState({
            data: [
              ...this.state.data,
              { _id: data._id, name: data.name, iconURL: data.iconURL },
            ],
          });
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const data = this.state.data;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/tdcmobileapp"
            render={() => {
              return <Home data={data} />;
            }}
          />
          {data.map((data, index) => (
            <Route
              key={index}
              path={`/tdcmobileapp/${data.name}/`}
              render={() => {
                return <AppDetail application={data} />;
              }}
            />
          ))}

          <Route
            path="/tdcmobileapp/upload_build"
            render={() => {
              return <UploadBuild data={data} />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/release"
            render={() => {
              return <Product />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/checkin_wfh_report"
            render={() => {
              return <WHFReport />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/dashboard"
            render={() => {
              return <Dashboard />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/listUser"
            render={() => {
              return <ListUser />;
            }}
          />
          <Route
            path="/tdcmobileapp/fis/listUserCheckinout"
            render={() => {
              return <TodayCheckinout />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/listUserByCondition"
            render={() => {
              return <ListUserByCondition />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/listClaim"
            render={() => {
              return <ListUserClaim />;
            }}
          />

          <Route
            path="/tdcmobileapp/fis/register"
            render={() => {
              return <RegisterPage />;
            }}
          />

          <Route
            path="/tdcmobileapp/cengroup/register"
            render={() => {
              return <RegisterPageCenGroup />;
            }}
          />

          <Route
            path="/elearning"
            render={() => {
              return <ElearningProduct />;
            }}
          />

          <Route
            path="/fpteid"
            render={() => {
              return <FPTeID />;
            }}
          />

          <Route
            path="/fpteid_poc_eximbank"
            render={() => {
              return <FPTeIDEximbank />;
            }}
          />

          <Route
            exact
            path="/medical_declaration_form"
            component={() => {
              if (this.props.cookies.get("login_token") !== undefined) {
                return <MedicalFormByUser />;
              } else {
                return <Redirect to="/medical_declaration_form/login" />;
              }
            }}
          />

          <Route
            exact
            path="/medical_declaration_form/login"
            component={() => {
              if (this.props.cookies.get("login_token") !== undefined) {
                return <Redirect to="/medical_declaration_form" />;
              } else {
                return <LoginPage1 />;
              }
            }}
          />

          <Route
            path="/tdcmobileapp/trace_together_report"
            render={() => {
              return <TraceTogetherReport />;
            }}
          />

          <Route
            path="/tdcmobileapp/trace_together_by_user/:phone"
            component={TraceTogetherByUser}
          />

          <Route
            path="/tdcmobileapp/trace_together_by_user_file/:phone"
            component={TraceTogetherByUser2}
          />

          <Route
            path="/tdcmobileapp/covid_medical_form/:username"
            component={MedicalForm}
          ></Route>
          <Route path="/tdcmobileapp/successpage" component={SuccessFormPage} />

          <Route
            path="/redirect_corona"
            render={() => {
              window.location.href = "https://corona.fis.vn/";
              return null;
            }}
          />

          <Route
            path="/medical_declaration_form/success"
            component={SuccessFormPage}
          />

          <Route
            path="/tdcmobileapp/fis/login"
            component={() => {
              if (this.props.cookies.get("token") !== undefined) {
                return <Redirect to="/tdcmobileapp/fis/medical_report" />;
              } else {
                return <LoginPage />;
              }
            }}
          />

          <Route
            path="/tdcmobileapp/fis/medical_report"
            component={() => {
              if (this.props.cookies.get("token") !== undefined) {
                console.log(this.state.cookie);
                return <MedicalListReport />;
              } else {
                return <Redirect to="/tdcmobileapp/fis/login" />;
              }
            }}
          />
          <Route
            path="/tdcmobileapp/fis/wfh_report"
            component={() => {
              return <WFHReportGeneral />;
              // if (this.props.cookies.get("token") !== undefined) {
              //   console.log(this.state.cookie);
              //   return <WFHReportGeneral />;
              // } else {
              //   return <Redirect to="/tdcmobileapp/fis/login" />;
              // }
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withCookies(RouteClient);
