import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './app.css';
import { Col, Layout, PageHeader, Row, Tabs } from 'antd';
import MoviesList from '../movies-list';
import Header from '../header';
import PaginationBox from '../pagination-box';
import ErrorBoundry from '../error-boundry';
import MovieDbService from '../../services/movie-db-service';
import { ContextProvider, ServiceContextProvider } from '../context';
import { withStorage } from '../hoc';

const { TabPane } = Tabs;

class App extends Component {
  static defaultProps = {
    loadItem: () => {},
    saveItem: () => {},
  };

  static propTypes = {
    loadItem: PropTypes.func,
    saveItem: PropTypes.func,
  };

  state = {
    loading: true,
    genresList: [],
    service: new MovieDbService(),
    sessionId: '',
    keyWord: '',
    currentPage: 1,
    totalResults: 200,
    pageSize: 20,
    tab: 'search',
  };

  componentDidMount() {
    this.getGenres();
    this.getSessionId();
    this.setState({
      loading: false,
    });
  }

  getSessionId = async () => {
    const { loadItem } = this.props;
    const sessionId = loadItem('sessionId');
    if (sessionId) {
      this.setState({
        sessionId,
      });
    } else {
      await this.startSession();
      this.getSessionId();
    }
  };

  startSession = async () => {
    const { service } = this.state;
    await service.startGuestSession().then((res) => {
      const { saveItem, loadItem } = this.props;
      saveItem('sessionId', res.guest_session_id);
      this.setState({
        sessionId: loadItem('sessionId'),
      });
    });
  };

  getGenres = async () => {
    const { service } = this.state;
    await service.getAllGenres().then((res) => {
      this.setState({
        genresList: res,
      });
    });
  };

  onTabChange = (key) => {
    this.setState({
      tab: key,
      currentPage: 1,
      keyWord: '',
      loading: true,
    });
  };

  onSearch = (value) => {
    this.setState({
      keyWord: value,
      currentPage: 1,
      loading: true,
    });
  };

  // eslint-disable-next-line react/sort-comp
  handlerSearch = debounce(this.onSearch.bind(this), 500);

  getTotalResults = (totalResults) => {
    this.setState({ totalResults, loading: false });
  };

  changePage = (pageNumber) => {
    this.setState({
      loading: true,
      currentPage: pageNumber,
    });
  };

  render() {
    const { service, loading, genresList, keyWord, currentPage, totalResults, pageSize, tab, sessionId } = this.state;

    if (!loading) {
      window.scrollTo({ top: 0 });
    }

    return (
      <ServiceContextProvider value={service}>
        <ContextProvider value={genresList}>
          <ErrorBoundry>
            <Layout className="content-wrapper" style={{ backgroundColor: 'white' }}>
              <PageHeader title="" className="content-header">
                <Tabs
                  size="large"
                  defaultActiveKey="search"
                  onChange={this.onTabChange}
                  tabBarExtraContent={{ left: <div style={{ width: 32, visibility: 'hidden' }} /> }}
                >
                  <TabPane tab="Search" key="search" />
                  <TabPane tab="Rated" key="rated" />
                </Tabs>
              </PageHeader>

              {tab === 'search' && (
                <Row gutter={[16, 32]} justify="center">
                  <Col span={16} style={{ padding: 0 }}>
                    <Header onSearch={this.handlerSearch} />
                  </Col>
                </Row>
              )}

              <MoviesList
                tab={tab}
                keyWord={keyWord}
                currentPage={currentPage}
                sessionId={sessionId}
                loading={loading}
                getTotalResults={this.getTotalResults}
              />

              <PaginationBox
                currentPage={currentPage}
                totalResults={totalResults}
                pageSize={pageSize}
                changePage={this.changePage}
                loading={loading}
              />
            </Layout>
          </ErrorBoundry>
        </ContextProvider>
      </ServiceContextProvider>
    );
  }
}

export default withStorage(App);
