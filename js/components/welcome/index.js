import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import Carousel from 'react-native-carousel';
import _ from "lodash";
import { replaceRoute } from '../../actions/route';
import styles from "./styles";
import { globalNav } from '../../AppNavigator';
import { Dashboard } from '../dashboard/';
import Global from '../../Global';

import { setDealList } from '../../actions/deals';
import { setDestinations } from '../../actions/destinations';
import { setTabBar } from '../../actions/tabBar';
import { setCategories } from '../../actions/categories';
import { setFbProfile } from '../../actions/user';

import { getLastMinutes } from '../../api/lastMinutes';
import { getSites } from '../../api/sites';
import { getDestinations } from '../../api/destinations';
import { getListCategories } from '../../api/categories';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, token: null, login_type: null };
  }
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  setDealList(deals) {
    this.props.setDealList(deals);
  }

  setDestinations(destinations) {
    this.props.setDestinations(destinations);
  }

  async goToWorld(world) {
      try {
          //SET DEALS BY WORLD
          global.world_type = world;
          let sitesJson = await getSites();
          let sites = await sitesJson.json();
          let site = _.find(sites.sites, { 'name': world });
          let dealsJson = await getLastMinutes(site.id);
          let deals = await dealsJson.json();
          this.setDealList(deals);

          //SET DESTINATIONS
          const apiToken = await AsyncStorage.getItem(Global.API_TOKEN);
          let options = {
              apiToken: apiToken,
              coordinates: {
                  longMin: "",
                  longMax: "",
                  latMin: "",
                  latMax: "",
              }
          }
          const destinationsJson = await getDestinations(options);
          let destinations = await destinationsJson.json();
          this.setDestinations(destinations);

          //SET FB USER PROFILE
          let name = await AsyncStorage.getItem(Global.FB_USER_NAME);
          let email = await AsyncStorage.getItem(Global.FB_USER_EMAIL);
          let fbUserId = await AsyncStorage.getItem(Global.FB_USER_ID);
          let fbToken = await AsyncStorage.getItem(Global.FB_TOKEN);
          let apiTokenExpiration = await AsyncStorage.getItem(Global.API_TOKEN_EXPIRATION);
          let image = await AsyncStorage.getItem(Global.FB_USER_IMAGE);
          this.props.setFbProfile({fbUserId: fbUserId, name: name, email: email, image: image, fbToken: fbToken, apiTokenExpiration: apiTokenExpiration});

          //SET CATEGORIES
          let categoriesJson = await getListCategories();
          let categories = await categoriesJson.json();
          this.props.setCategories(categories);

          //SET TAB BAR
          this.props.setTabBar('LastMinuteTabBar', 3);

          this.replaceRoute('dashboard');
      } catch(e) {
          console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
      }

  }

  render() {
    return (
        <Grid>
            <Col style={{flex:1}}>
                <Row style={{flex:4, backgroundColor:'#000000'}}>
                    <Col style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image style={{flex: 1, width: 15, height: 15}} resizeMode={Image.resizeMode.contain} source={require('../../../images/menu-options.png')}>
                            </Image>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{flex:20}}/>
                    <Col style={{flex:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                        <Image style={{flex: 1,
                                    width: 250,
                                    height: 50}} resizeMode={Image.resizeMode.contain} source={require('../../../images/Golfskiworld-logo.png')}>
                        </Image>
                    </Col>
                    <Col style={{flex:30}}/>
                </Row>
                <Row style={{flex:96}}>
                    <Carousel animate={false} delay={3000} indicatorOffset={110}>
                        <Image style={styles.container}  source={require('../../../images/swipe_golf.png')}>
                          <Grid>
                            <Col style={{ flex: 30 }}/>
                            <Col style={{ flex: 40 }}>
                              <Row style={{ flex: 20 }}/>
                              <Row style={{ flex: 20 }}>
                                <Button block small success style={styles.button} onPress={() => this.goToWorld('Golf')}>
                                  <Text style={styles.text}>Explore</Text>
                                </Button>
                              </Row>
                              <Row style={{ flex: 60 }}/>
                            </Col>
                            <Col style={{ flex: 30 }}/>
                          </Grid>
                         </Image>
                        <Image style={styles.container} resizeMode={Image.resizeMode.cover} source={require('../../../images/swipe_ski.png')}>
                          <Grid>
                            <Col style={{ flex: 30 }}/>
                            <Col style={{ flex: 40 }}>
                              <Row style={{ flex: 20 }}/>
                              <Row style={{ flex: 20 }}>
                                <Button block small success style={styles.button} onPress={() => this.goToWorld('Ski')}>
                                  <Text style={styles.text}>Explore</Text>
                                </Button>
                              </Row>
                              <Row style={{ flex: 60 }}/>
                            </Col>
                            <Col style={{ flex: 30 }}/>
                          </Grid>
                        </Image>
                        <Image style={styles.container} resizeMode={Image.resizeMode.cover} source={require('../../../images/swipe_horse.png')}>
                          <Grid>
                            <Col style={{ flex: 30 }}/>
                            <Col style={{ flex: 40 }}>
                              <Row style={{ flex: 20 }}/>
                              <Row style={{ flex: 20 }}>
                                <Button block small success style={styles.button} onPress={() => this.replaceRoute('welcome')}>
                                  <Text style={styles.text}>Explore</Text>
                                </Button>
                              </Row>
                              <Row style={{ flex: 60 }}/>
                            </Col>
                            <Col style={{ flex: 30 }}/>
                          </Grid>
                        </Image>
                        <Image style={styles.container} resizeMode={Image.resizeMode.cover} source={require('../../../images/swipe_yacht.png')}>
                          <Grid>
                            <Col style={{ flex: 30 }}/>
                            <Col style={{ flex: 40 }}>
                              <Row style={{ flex: 20 }}/>
                              <Row style={{ flex: 20 }}>
                                <Button block small success style={styles.button} onPress={() => this.replaceRoute('welcome')}>
                                  <Text style={styles.text}>Explore</Text>
                                </Button>
                              </Row>
                              <Row style={{ flex: 60 }}/>
                            </Col>
                            <Col style={{ flex: 30 }}/>
                          </Grid>
                        </Image>
                        <Image style={styles.container} resizeMode={Image.resizeMode.cover} source={require('../../../images/swipe_extraordinary_2.png')}>
                          <Grid>
                            <Col style={{ flex: 30 }}/>
                            <Col style={{ flex: 40 }}>
                              <Row style={{ flex: 20 }}/>
                              <Row style={{ flex: 20 }}>
                                <Button block small success style={styles.button} onPress={() => this.replaceRoute('welcome')}>
                                  <Text style={styles.text}>Explore</Text>
                                </Button>
                              </Row>
                              <Row style={{ flex: 60 }}/>
                            </Col>
                            <Col style={{ flex: 30 }}/>
                          </Grid>
                        </Image>
                    </Carousel>
                </Row>
            </Col>
        </Grid>
    )
  }
}


function bindAction(dispatch) {
    return {
        setFbProfile:(profile)=>dispatch(setFbProfile(profile)),
        setCategories: (categories) => dispatch(setCategories(categories)),
        setDealList: (deals) => dispatch(setDealList(deals)),
        setDestinations: (destinations) => dispatch(setDestinations(destinations)),
        setTabBar: (name, initTab) => dispatch(setTabBar(name, initTab)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        route: state.route,
        coordinates: state.coordinates
    }
}

export default connect(mapStateToProps, bindAction)(Welcome);
