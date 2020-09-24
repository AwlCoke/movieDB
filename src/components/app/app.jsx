import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import './app.css';
import { Col, Layout, PageHeader, Row, Tabs } from 'antd';
import MoviesList from '../movies-list';
import Header from '../header';
import PaginationBox from '../pagination-box';
import ErrorBoundry from '../error-boundry';
import MovieDbService from '../../services/movie-db-service';
import { ContextProvider } from '../context';

const { TabPane } = Tabs;

export default class App extends Component {
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
    if (sessionStorage.getItem('sessionId')) {
      this.state.sessionId = sessionStorage.getItem('sessionId');
    } else this.startSession();
  }

  startSession = async () => {
    const { service } = this.state;
    await service.startGuestSession().then((res) => {
      this.setState(
        {
          sessionId: res.guest_session_id,
        },
        () => {
          const { sessionId } = this.state;
          sessionStorage.setItem('sessionId', sessionId);
        }
      );
    });
  };

  getGenres = async () => {
    const { service } = this.state;
    await service.getAllGenres().then((res) => {
      this.setState({
        genresList: res,
        loading: false,
      });
    });
  };

  onTabChange = (key) => {
    this.setState({
      tab: key,
      currentPage: 1,
      keyWord: '',
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
      currentPage: pageNumber,
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { loading, genresList, keyWord, currentPage, totalResults, pageSize, tab, sessionId } = this.state;

    const title = keyWord ? `Results for "${keyWord.toUpperCase()}"` : 'Top 200 Rated Movies';

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
              <>
                <Row gutter={[16, 32]} justify="center">
                  <Col span={16} style={{ padding: 0 }}>
                    <Header onSearch={this.handlerSearch} />
                  </Col>
                </Row>

                <h1 style={{ textAlign: 'center', color: 'darkgray', marginBottom: 20 }}>{title}</h1>
              </>
            )}

            <MoviesList
              tab={tab}
              keyWord={keyWord}
              currentPage={currentPage}
              sessionId={sessionId}
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
