import { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeader from '../components/CustomHeader';
import { ROUTE_NAME } from './routeNames';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Settings from '../pages/Settings';
import MainLayout from '../components/MainLayout';
import UserView from '../pages/UserView';
import UserList from '../pages/UserList';
import CrmDashboard from '../pages/CrmDashboard';
import PatientView from '../pages/PatientView';
import PatientList from '../pages/PatientList';
import VisitList from '../pages/VisitList';
import PartnerView from '../pages/PartnerView';
import PartnerList from '../pages/PartnerList';
import AgentView from '../pages/AgentView';
import AgentList from '../pages/AgentList';
import TaskList from '../pages/TaskList';
import TaskView from '../pages/TaskView';
import PaymentList from '../pages/PaymentList';
import Directories from '../pages/Directories/Directories';
import VisitTypesDirectory from '../pages/Directories/VisitTypes';
import VisitStatusesDirectory from '../pages/Directories/VisitStatuses';
import TaskStatusesDirectory from '../pages/Directories/TaskStatuses';
import CommonPrioritiesDirectory from '../pages/Directories/CommonPriorities';
import RelationDegreesDirectory from '../pages/Directories/RelationDegrees';
import ClinicsDirectory from '../pages/Directories/Clinics';
import VisitPlasesDirectory from '../pages/Directories/VisitPlases';
import PatientTagsDirectory from '../pages/Directories/PatientTags';
import PatientsSourcesDirectory from '../pages/Directories/PatientsSources';
import OperationTypesDirectory from '../pages/Directories/OperationTypes';
import DiagnosesDirectory from '../pages/Directories/Diagnoses';
import BodyLocationsDirectory from '../pages/Directories/BodyLocations';
import CitiesDirectory from '../pages/Directories/Cities';
import MKB10Directory from '../pages/Directories/MKB10';

import './styles.scss';
import { getIsAuthenticated, setToken } from '../redux-slices/AuthSlice';
import PaymentAdd from "../pages/PaymentView/PaymentAdd";
import PaymentUpdate from "../pages/PaymentView/PaymentUpdate";

const { Content } = Layout;

const Navigator: FC = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      dispatch(setToken(userToken));
    }
  }, [dispatch]);

  const isAuthenticated = useSelector(getIsAuthenticated);

  console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Layout className="wrapper">
        <CustomHeader />

        <Layout className="auth-layout">
          <Content className="auth-layout-background">
            {/*{!isAuthenticated && <Redirect to={ROUTE_NAME.LOGIN} />}*/}
            {/*{isAuthenticated && <Redirect to={ROUTE_NAME.HOME} />}*/}

            <Switch>
              {isAuthenticated ? (

                <MainLayout>
                  <Route path={ROUTE_NAME.HOME} component={Home} exact={true} />
                  <Route path={ROUTE_NAME.SETTINGS} component={Settings} exact={true} />

                  <Route path={ROUTE_NAME.USER} component={UserView} exact={true} />
                  <Route path={ROUTE_NAME.USERS} component={UserList} exact={true} />

                  <Route path={ROUTE_NAME.CRM_DASHBOARD} component={CrmDashboard} exact={true} />

                  <Route path={ROUTE_NAME.TASK} component={TaskView} exact={true} />
                  <Route path={ROUTE_NAME.TASKS} component={TaskList} exact={true} />
                  <Route path={ROUTE_NAME.PATIENT} component={PatientView} exact={true} />
                  <Route path={ROUTE_NAME.PATIENTS} component={PatientList} exact={true} />
                  {/* <Route path={ROUTE_NAME.VISIT} component={VisitView} exact={true} /> */}
                  <Route path={ROUTE_NAME.VISITS} component={VisitList} exact={true} />
                  <Route path={ROUTE_NAME.PARTNER} component={PartnerView} exact={true} />
                  <Route path={ROUTE_NAME.PARTNERS} component={PartnerList} exact={true} />
                  <Route path={ROUTE_NAME.AGENT} component={AgentView} exact={true} />
                  <Route path={ROUTE_NAME.AGENTS} component={AgentList} exact={true} />
                  <Route path={ROUTE_NAME.PAYMENTS} component={PaymentList} exact={true} />
                  <Route path={ROUTE_NAME.PAYMENT_NEW} component={PaymentAdd} exact={true} />
                  <Route path={ROUTE_NAME.PAYMENT_UPDATE} component={PaymentUpdate} exact={true} />

                  <Route
                    path={ROUTE_NAME.BODY_LOCATIONS}
                    component={BodyLocationsDirectory}
                    exact={true}
                  />
                  <Route path={ROUTE_NAME.CITIES} component={CitiesDirectory} exact={true} />
                  <Route
                    path={ROUTE_NAME.OPERATION_TYPES}
                    component={OperationTypesDirectory}
                    exact={true}
                  />
                  <Route path={ROUTE_NAME.DIAGNOSES} component={DiagnosesDirectory} exact={true} />
                  <Route
                    path={ROUTE_NAME.PATIENTS_SOURSES}
                    component={PatientsSourcesDirectory}
                    exact={true}
                  />
                  <Route
                    path={ROUTE_NAME.PATIENT_TAGS}
                    component={PatientTagsDirectory}
                    exact={true}
                  />
                  <Route
                    path={ROUTE_NAME.VISIT_PLACES}
                    component={VisitPlasesDirectory}
                    exact={true}
                  />
                  <Route path={ROUTE_NAME.CLINICS} component={ClinicsDirectory} exact={true} />
                  <Route
                    path={ROUTE_NAME.COMMON_PRIORITIES}
                    component={CommonPrioritiesDirectory}
                    exact={true}
                  />
                  <Route
                    path={ROUTE_NAME.RELATION_DEGREES}
                    component={RelationDegreesDirectory}
                    exact={true}
                  />
                  <Route
                    path={ROUTE_NAME.VISIT_STATUSES}
                    component={VisitStatusesDirectory}
                    exact={true}
                  />
                  <Route
                    path={ROUTE_NAME.TASK_STATUSES}
                    component={TaskStatusesDirectory}
                    exact={true}
                  />
                  <Route path={ROUTE_NAME.MKB10} component={MKB10Directory} exact={true} />
                  <Route
                    path={ROUTE_NAME.VISIT_TYPES}
                    component={VisitTypesDirectory}
                    exact={true}
                  />
                  <Route path={ROUTE_NAME.DIRECTORIES} component={Directories} exact={true} />

                  {/*
                    // TODO

                   
                   
                   
                    {path: RouteNames.BODY_LOCATIONS, component: BodyLocations, exact: true, title: "Локализации"},
                    {path: RouteNames.MKB10, component: Mkb10, exact: true, title: "МКБ-10"},
                    {path: RouteNames.CITIES, component: Cities, exact: true, title: "Города"},
                    
                    
                    {path: RouteNames.PAYMENT, component: PaymentView, exact: true, title: "Оплата", menu: false},
                  */}
                </MainLayout>
              ) : (
                <>
                  <Route path={ROUTE_NAME.HOME} component={Login} exact={true} />
                  {/*<Route path={ROUTE_NAME.LOGIN} component={Login} exact={true} />*/}
                  <Route path={ROUTE_NAME.REGISTER} component={Register} exact={true} />
                </>
              )}
              <Route path={ROUTE_NAME.ERROR404} component={Error404} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Navigator;
