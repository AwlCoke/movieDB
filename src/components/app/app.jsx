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
import { ContextProvider } from '../context';
import withStorage from '../hoc';

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
  }

  getSessionId() {
    const { loadItem } = this.props;
    const sessionId = loadItem('sessionId');
    if (sessionId) {
      this.setState({
        sessionId,
        loading: false,
      });
    } else this.startSession();
  }

  startSession = async () => {
    const { service } = this.state;
    await service.startGuestSession().then((res) => {
      const { saveItem } = this.props;
      saveItem('sessionId', res.guest_session_id);
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
    });
  };

  // eslint-disable-next-line react/sort-comp
  handlerSearch = debounce(this.onSearch.bind(this), 500);

  getTotalResults = (totalResults) => {
    this.setState({ totalResults });
  };

  changePage = (pageNumber) => {
    this.setState({
      loading: true,
      currentPage: pageNumber,
    });
  };

  render() {
    const { loading, genresList, keyWord, currentPage, totalResults, pageSize, tab, sessionId } = this.state;

    if (!loading) {
      window.scrollTo({ top: 0 });
    }

    return (
      <ContextProvider value={genresList}>
        <ErrorBoundry>
          <Layout className="content-wrapper" style={{ backgroundColor: 'white' }}>
            <PageHeader title="" className="content-header">
              <Tabs size="large" onChange={this.onTabChange}>
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
    );
  }
}

export default withStorage(App);
