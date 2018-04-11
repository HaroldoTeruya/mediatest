/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Slider,
    Image,
    findNodeHandle,
    AppState,
    DeviceEventEmitter,
    InteractionManager
} from 'react-native';

import { AudioManager, DirectoryManager, AudioOutputRoute, DeviceManager, CallManager, ProximityState, BlurView } from 'react-native-media';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
let url = "./image.png"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

    constructor(props) {
      super(props);

      // console.log(BlurView);

      this.timeChange = this.timeChange.bind(this);
      this.addBLur = this.addBLur.bind(this);
      this.handleCallManager = this.handleCallManager.bind(this);

      this.state = {
          time: 0,
          imageData: "",
          viewRef: null,
      };
    }

    async componentDidMount() {
        //======================================================
        // can use just in the refactor
        // DeviceEventEmitter.addListener(AudioManager.Events.onTimeChanged, (currentTime) => {
        //     console.log("current time " + currentTime);
        // });

        // AudioManager.setAudioFinishedCallback(null);

        // DeviceEventEmitter.addListener(AudioManager.Events.onAudioFinished, (currentTime) => {
        //     alert("finished!");
        // });
        //=====================================================

        DeviceManager.setOnSilentSwitchStateChanged((enable) => {
            alert("status silent switch: " + enable);
        });

        // DeviceManager.setWiredHeadsetPluggedCallback(null);
        DeviceManager.setWiredHeadsetPluggedCallback((plugged) => {
            alert("WiredheadSet is: " + plugged);
        });

        DeviceManager.setProximityChangedCallback(async (state) => {
            console.log("ProximityChangedCallback: " + state);
            switch (state) {
                case ProximityState.NEAR:
                    console.log("current state near");
                    break;
                case ProximityState.FAR:
                    console.log("current state far");
                    break;
                case ProximityState.ONBACKGROUND:
                    console.log("current state background");
                    break;
                case ProximityState.ONACTIVE:
                    console.log("current state active");
                    await this.handleCallManager();
                    break;
                default:
            }
        });

        let granted = await CallManager.requestAuthorization();
        if ( granted ) {
            console.log("User notification request authorization: " + granted);
            console.log("Get the device token: " + await CallManager.requestDeviceToken());
            // console.log("Call status: " + await CallManager.requestCallStatus());
            // console.log("Call data: " + await CallManager.getCallData());
        }
    }

    async handleCallManager(): void {
        // this is crashing everything when opening
        let granted = await CallManager.requestAuthorization();
        if ( granted ) {
            console.log("Call status: " + await CallManager.requestCallStatus());
            console.log("Call data: " + await CallManager.getCallData());
        }

        // DeviceEventEmitter.addListener(CallManager.Event.ON_INCOMING_CALL, (data) => {
        //     alert(CallManager.Event.ON_INCOMING_CALL);
        //     console.log(CallManager.Event.ON_INCOMING_CALL + " " + data);
        // });
        // DeviceEventEmitter.addListener(CallManager.Event.ON_LOST_CALL, (data) => {
        //     alert(CallManager.Event.ON_LOST_CALL);
        //     console.log(CallManager.Event.ON_LOST_CALL + " " + data);
        // });
    }

    async load(path : string) : boolean {
        let sucess = await AudioManager.load(path);
        console.log("load: " + sucess);
        alert(sucess);
        return sucess;
    }

    async play() {
        let sucess = await AudioManager.play(false, 40681);
        console.log("play: " + sucess);
        alert(sucess);
    }

    async pause() {
        let sucess = await AudioManager.pause();
        console.log("pause: " + sucess);
        alert(sucess);
    }

    async resume() {
        let sucess = await AudioManager.resume();
        console.log("resume: " + sucess);
        alert(sucess);
    }

    async stop() {
        let sucess = await AudioManager.stop();
        console.log("stop: " + sucess);
        alert(sucess);
    }

    async loadAndPlay(path : string) {
        let sucess = await AudioManager.loadAndPlay(path, AudioManager.AudioOutputRoute.EAR_SPEAKER, false, 40681);
        console.log("load and play: " + sucess);
        alert(sucess);
    }

    async setTimeInterval () {
        let sucess = await AudioManager.setTimeInterval(2000);
        console.log("Time Interval: " + sucess);
        alert(sucess);
    }

    async getVolume() {
        let sucess = await DeviceManager.getVolume();
        console.log("Current volume: " + sucess);
        alert(sucess);
    }

    async setVolume() {
        let sucess = await DeviceManager.setVolume(1);
        console.log("Volume seted to: " + sucess);
        alert(sucess);
    }

    timeChange(time : int) {
        this.setState({time});
        AudioManager.seekTo(time*1000);
    }

    async enviorment() {
        console.log("Paths: " + await DirectoryManager.getDocumentDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getImageDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getMainBundleDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getCacheDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getLibraryDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getAudioDirectoryPath());
        console.log("Paths: " + await DirectoryManager.getDownloadDirectoryPath());
    }

    async mute() {
        console.log("Muted: " + await DeviceManager.mute(true));
    }

    async toEarSpeaker() {
        console.log("TO SPEAKER: " + await AudioManager.setAudioOutputRoute(1));
    }

    async toDefaultSpeaker() {
        console.log("TO SPEAKER: " + await AudioManager.setAudioOutputRoute(0));
    }

    async idleTestTrue() {
        // set true to turn on the sleep mode
        let sucess = await DeviceManager.setIdleTimerEnable(true);
        console.log(true + " idle enable: " + sucess);
        alert(sucess);
    }

    async idleTestFalse() {
        // set false to turn off the sleep mode
        let sucess = await DeviceManager.setIdleTimerEnable(false);
        console.log(false + " idle enable: " + sucess);
        alert(sucess);
    }

    async turnOnAproximity() {
        let sucess = await DeviceManager.setProximityEnable(true)
        console.log(true + " proximity enable: " + sucess);
        alert(sucess);
    }

    async turnOffAproximity() {
        let sucess = await DeviceManager.setProximityEnable(false);
        console.log(false + " proximity enable: " + sucess);
        alert(sucess);
    }

    async getCurrentAudioName() {
        let sucess = await AudioManager.getCurrentAudioName(true);
        console.log("Current name: " + sucess);
        alert("Current name: " + sucess);
    }

    async addBLur() {
        let sucess = await DeviceManager.addBLur();
        console.log("Add blur: " + sucess);

        let base64Image = 'data:image/png;base64,' + sucess;
        this.setState({
            imageData: base64Image,
        });
        alert("Add blur: " + sucess);
    }

    //==========================================================================
    // FOR TEST

    async loadTest() {

        if ( Platform.OS === 'ios' ) {
            await this.load("file:///" + await DirectoryManager.getMainBundleDirectoryPath() + "/Lindsey%20Stirling%20-%20Prism.mp3");
        } else {
            await this.load("/storage/emulated/0/Download/Lindsey Stirling - Prism.mp3");
            // await this.load("/storage/emulated/0/Samsung/Music/Over_the_horizon.mp3");
        }
    }

    async loadAndPlayTest() {

        console.log("loadAndPlayTest: ");
        if ( Platform.OS === 'ios' ) {
            await this.loadAndPlay("file:///" + await DirectoryManager.getMainBundleDirectoryPath() + "/Lindsey%20Stirling%20-%20Prism.mp3");
        } else {
            await this.loadAndPlay("/storage/emulated/0/Download/Lindsey Stirling - Prism.mp3");
            // await this.loadAndPlay("/storage/emulated/0/Samsung/Music/Over_the_horizon.mp3");
        }
        console.log("Duration: " + AudioManager.getDuration());
    }

    async duration() {
        alert(await AudioManager.getDuration());
    }

    viewLoaded() {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          this.setState({ viewRef: findNodeHandle(this.refs.backgroundBlur) });
        }, 500);
      });
    }

    //==========================================================================

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.container}>

                    <View style={{flexDirection:'row'}}>

                        <Button
                            // style={styles.button}
                            onPress={() => this.loadTest()}
                            title="LOAD"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.play()}
                            title="PLAY"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.loadAndPlayTest()}
                            title="LOAD_PLAY"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.getCurrentAudioName()}
                            title="NAME"
                            color="#841584"/>
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Button
                            style={styles.button}
                            onPress={this.pause}
                            title="PAUSE"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={this.resume}
                            title="RESUME"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={this.stop}
                            title="STOP"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={this.duration}
                            title="DURATION"
                            color="#841584"/>
                    </View>

                    <View style={{alignSelf:'stretch'}}>
                      <Text style={styles.text}>{String(this.state.time)}</Text>
                      <Slider
                        step={1}
                        maximumValue={100}
                        onValueChange={this.timeChange}
                        value={this.state.time}
                      />
                    </View>

                    <Button
                        style={styles.button}
                        onPress={this.setTimeInterval}
                        title="SET TIME INTERVAL"
                        color="#841584"/>

                    <View style={{flexDirection:'row'}}>
                        <Button
                            style={styles.button}
                            onPress={this.getVolume}
                            title="GET VOLUME"
                            color="#841584"/>
                        <Button
                            style={styles.button}
                            onPress={this.setVolume}
                            title="SET VOLUME"
                            color="#841584"/>
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Button
                            style={styles.button}
                            onPress={() => this.idleTestTrue()}
                            title="TRUE IDLE"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.idleTestFalse()}
                            title="FALSE IDLE"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.turnOnAproximity()}
                            title="ON AP"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={() => this.turnOffAproximity()}
                            title="OFF AP"
                            color="#841584"/>

                    </View>

                    <Button
                        style={styles.button}
                        onPress={this.enviorment}
                        title="CAMINHO DE AMBIENTES"
                        color="#841584"/>

                    <View style={{flexDirection:'row'}}>

                        <Button
                            style={styles.button}
                            onPress={this.mute}
                            title="MUTE"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={this.addBLur}
                            title="ADD BLUR"
                            color="#841584"/>

                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Button
                            style={styles.button}
                            onPress={this.toEarSpeaker}
                            title="TO EAR"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={this.toDefaultSpeaker}
                            title="TO DEFAULT"
                            color="#841584"/>

                        <Button
                            style={styles.button}
                            onPress={async () => {
                              const has = await DeviceManager.isWiredHeadsetPlugged();
                              alert("HAS WIREDHEAD: " + has);
                            }}
                            title="HAS WIREDHEAD"
                            color="#841584"/>

                    </View>

                    <Button
                        style={styles.button}
                        onPress={async () => {

                            /* (ipAddress) Use "http://10.0.2.2:3000" to test locally in the Android Emulator.
                            * (serverChannel) Use "chat message" to receive message from server. The server project is in the /Users/Teruya/Documents/sockeio-development/sender/
                            * (mainBundlePackageName) Use "com.mediatest" to use in the mediatest project.
                            */
                            if ( Platform.OS === "ios" ) {
                                // var response = await CallManager.registerPushKit();
                                // alert(response);
                            } else {
                                // var response = await CallManager.connectSocketIO("http://10.0.2.2:3000", "com.mediatest", "chat message");
                                // switch (response) {
                                //         case CallManager.Response.INPUT_ERROR:
                                //             alert("Some input is corrupted or missing");
                                //             break;
                                //         case CallManager.Response.BRIDGE_ACCESS_ERROR:
                                //             alert("Bridge is destroyed or bad instantiation");
                                //             break;
                                //         case CallManager.Response.UNKNOWN_ERROR:
                                //             alert("No ideia, but got a error");
                                //             break;
                                //         case CallManager.Response.SERVICE_STARTED:
                                //             alert("Service started with success, NOT known if the connection was a success");
                                //             break;
                                //     default:
                                // }
                            }
                        }}
                        title="CALL"
                        color="#841584"/>

                </View>

                {/* <Image
                    style={styles.overlay}
                    ref={'backgroundBlur'}
                    onLoadEnd={this.viewLoaded.bind(this)}
                    source={require("./image.png")} /> */}

                {/* {this.renderBlurView()} */}

            </View>
        );
    }

    renderBlurView() {
      const tintColor = ['#ffffff', '#000000'];
      if (this.state.blurType === 'xlight') tintColor.reverse();

      return (
        <View style={{ position: "absolute", top:0, left:0, right:0, bottom:0 }}>
          {this.state.viewRef && <BlurView
              style={[styles.overlay]}
              blurRadius={9}
              blurType={'xlight'}
              viewRef={ this.state.viewRef }
              downsampleFactor={5}
              overlayColor={'rgba(255, 255, 255, 0.1)'}
          />}
        </View>
      )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 100,
        zIndex: 1,
    },
    overlay: {
        zIndex: 99,
        elevation: 99,
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        // opacity: 0.5,
        // backgroundColor: 'black',
        width: width,
        height: height,
    }
});
