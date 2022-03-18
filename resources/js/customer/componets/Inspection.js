import React from "react";
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import Axios from 'axios';
import '../css/inspection.css'
import "../../../../node_modules/font-awesome/scss/font-awesome.scss";
import { Link } from 'react-router-dom'
import { forEach } from "lodash";
import Formdownload from './Formdownload';
import Multiplefromdownload from './Multiplefromdownload'
// import Spinner from "./Spinner";

var data = [];
var persistentTracks = [];
var persistentselectedTracks = [];

let colors = ['#FF0000', '#00FF00', '#FFFF00', '#FFA500', '#0000FF', '#808080', '#FF5733', '#33C9FF', '#7EFF33', '#FF0000', '#00FF00', '#FFFF00', '#FFA500', '#0000FF', '#808080', '#FF5733', '#33C9FF', '#7EFF33'];
let cableName = [];
let color2 = ['ff0000ff', 'ff00ff00', 'ff00ffff', 'ff0080ff', 'fff0000', '506E6E6E', '#FF0000', '#00FF00', '#FFFF00', '#FFA500', '#0000FF', '#808080', '#FF5733', '#33C9FF', '#7EFF33'];
const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
]

const options = {
    imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
    return location.lat + location.lng
}
class GisView extends React.Component {

    state = {
        // track: [],
        // tracksShow: [],
        // mappedmarkers: [],
        // allcables: [],
        // selectedmarkers: [],
        // selectedcables: [],
        // selectedtracks: [],
        // cablestrack: [],
        // recenter: { 'lat': 33, 'lng': 74 },
        // recenterPersistent: { 'lat': 33, 'lng': 74 },
        // zoom: 0,
        // cities: [],
        // regions: ['north', 'south', 'central'],
        // selectedcities: [],
        // selectedregions: [],
        // ana: [],
        // cables: [],
        // cablesLength: 0,
        // reportShown: false,
        // imageShown: false,
        // sideBarHide: false,
        // detailsToShow: {},
        // detailsToShowPosition: { lat: 0, lng: 0 },

        // filteredDataResult: [],

        // auditForms: [],
        // auditMarkers: [],
        // auditQuestions: [],
        // auditDetailsToShow: [],
        // auditDetailsToShowPosition: { lat: 0, lng: 0 },
        // auditImageShown: false,

        // cableDetailsToShow: [],
        // cableDetailsToShowPosition: { lat: 0, lng: 0 },

        // isLoading: false,

        // regionsShown: false,
        // citiesShown: false,
        // tracksShown: false,
        // OFCShown: false,
        // cablesShown: false,

        // markersShow: false,
        // markersShowArray: [],

        // moreOptionsShown: false,

        // filterWindowOpen: false,

        // summaryMarkers: [],
        // summaryCables: [],

        // selectAllTracks: [],

        // regionsOpen: [],
        // citiesOpen: []

        cities: [],
        regions: [],
        tracks: [],
        markers: [],
        tracksShow: [],
        markersShow: [],
        sideBarHide: false,
        center: { lat: 0, lng: 0 },

        detailsToShow: [],
        detailsToShowPosition: { lat: 0, lng: 0 },
        detailsToShowType: '',
        detailsToShowMarker: {},

        filter: [],

        filterDates: { from: '', to: '' },

        trackMedia: {},

        showImage: false,
    }
    // infowindowclosed = () => {
    //     var temp = { lat: 0, lng: 0 }
    //     this.setState({ detailsToShowPosition: temp })
    // }
    // auditInfowindowclosed = () => {
    //     var temp = { lat: 0, lng: 0 }
    //     this.setState({ auditDetailsToShowPosition: temp })
    // }

    // cableInfowindowclosed = () => {
    //     var temp = { lat: 0, lng: 0 }
    //     this.setState({ cableDetailsToShowPosition: temp })
    // }
    // markerClicked = (val, detail, value) => {
    //     console.log('check', value);
    //     var temp = { lat: val[0], lng: val[1] }
    //     this.setState({ detailsToShowPosition: temp })
    //     this.setState({ detailsToShow: detail[0] })
    //     setTimeout(() => {
    //         console.log('details', this.state.detailsToShowPosition);
    //         console.log('details', this.state.detailsToShow);
    //     })

    //     //this.setState({});
    // }

    // markerMouseOver = (val) => {

    //     let temp = val;
    //     temp = temp.substr(4);
    //     console.log(temp);
    // }

    // auditMarkerClicked = (val) => {

    //     console.log(val);

    //     this.setState({ isLoading: true }, () => {

    //         Axios.post(process.env.REACT_APP_BACKEND_BASE_URL + 'api/markerClicked', { position: val })
    //             .then(res => {

    //                 console.log(res.data);
    //                 this.setState({ auditDetailsToShowPosition: val, auditDetailsToShow: res.data.question, auditForms: res.data.forms, isLoading: false });

    //             }).catch(err => console.log(err))

    //     })

    // }
    // addMarker = async (val) => {
    //     var temp = [];
    //     if (this.state.selectedmarkers.includes(`OFC/${val}`)) {
    //         for (var i = 0; i < this.state.selectedmarkers.length; i++) {
    //             if (`OFC/${val}` != this.state.selectedmarkers[i]) {
    //                 temp.push(this.state.selectedmarkers[i]);
    //             }
    //         }
    //     } else {
    //         temp = this.state.selectedmarkers;
    //         temp.push(`OFC/${val}`);
    //     }

    //     await this.updatefilter(temp);
    //     console.log(this.state.selectedmarkers)
    // }

    // addCable = async (val) => {
    //     var temp = [];
    //     if (this.state.selectedcables.includes(val)) {
    //         for (var i = 0; i < this.state.selectedcables.length; i++) {
    //             if (val != this.state.selectedcables[i]) {
    //                 temp.push(this.state.selectedcables[i]);
    //             }
    //         }
    //     } else {
    //         temp = this.state.selectedcables;
    //         temp.push(val);
    //     }

    //     await this.updateCables(temp);
    //     console.log(this.state.selectedcables)
    // }

    // addTrack = async (val) => {
    //     var temp = [];
    //     var cable = [];
    //     if (this.state.selectedtracks.some((value) => { return value.id == val.id })) {
    //         for (var i = 0; i < this.state.selectedtracks.length; i++) {
    //             if (val.id != this.state.selectedtracks[i].id) {
    //                 temp.push(this.state.selectedtracks[i]);
    //                 this.state.selectedtracks[i]['track'].forEach((val) => {
    //                     cable.push(val)
    //                 })

    //             }
    //         }
    //     } else {
    //         temp = this.state.selectedtracks;
    //         cable = this.state.cablestrack;
    //         temp.push(val);
    //         val.track.forEach((value) => {
    //             cable.push(value)
    //         })
    //     }
    //     persistentselectedTracks = temp;
    //     console.log('persistentselectedTracks', persistentselectedTracks)
    //     await this.updateTracks(temp, cable);
    //     console.log('selected tracks', this.state.selectedtracks);
    //     console.log('track', this.state.track);
    //     //var alltracksdata = [];
    //     var allmarkersdata = [];
    //     for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //         var track = this.state.selectedtracks[m]['track'];

    //         var markers = this.state.selectedtracks[m]['markerposition'];
    //         for (var j = 0; j < markers.length; j++) {
    //             allmarkersdata.push(markers[j]);
    //         }
    //         //alltracksdata.push(this.state.selectedtracks[i]);
    //         //this.setState({ recenter: track[0]['data'][0] })
    //     }
    //     //this.setState({ track: alltracksdata });
    //     console.log('check', allmarkersdata);
    //     var recenter = { lat: 0, lng: 0 };
    //     if (allmarkersdata.length > 0) {
    //         for (let x in allmarkersdata[allmarkersdata.length - 1]) {
    //             if (x != 'detail' && x != 'id', x != 'subtrack') {
    //                 recenter.lat = allmarkersdata[allmarkersdata.length - 1][x][0];
    //                 recenter.lng = allmarkersdata[allmarkersdata.length - 1][x][1]
    //             }
    //         }
    //     } else {
    //         recenter = this.state.recenterPersistent
    //     }
    //     this.setState({ mappedmarkers: allmarkersdata, recenter: recenter });

    // }

    // addCity = async (val) => {
    //     var temp = [];
    //     if (this.state.selectedcities.includes(val)) {
    //         for (var i = 0; i < this.state.selectedcities.length; i++) {
    //             if (val != this.state.selectedcities[i]) {
    //                 temp.push(this.state.selectedcities[i]);
    //             }
    //         }
    //     } else {
    //         temp = this.state.selectedcities;
    //         temp.push(val);
    //     }

    //     await this.updateCities(temp);
    //     console.log(this.state.selectedcities)

    //     this.citySelected();

    // }

    // addRegion = async (val) => {
    //     var temp = [];
    //     if (this.state.selectedregions.includes(val)) {
    //         for (var i = 0; i < this.state.selectedregions.length; i++) {
    //             if (val != this.state.selectedregions[i]) {
    //                 temp.push(this.state.selectedregions[i]);
    //             }
    //         }
    //     } else {
    //         temp = this.state.selectedregions;
    //         temp.push(val);
    //     }

    //     await this.updateRegions(temp);
    //     console.log(this.state.selectedregions);

    //     this.regionSelected();
    // }

    // citySelected = () => {
    //     let temporaryTracks = [];

    //     this.state.track.forEach((val) => {
    //         if (this.state.selectedcities.some((value) => { return value.city === val.city })) {
    //             temporaryTracks.push(val)
    //         }
    //     })

    //     this.setState({ selectedtracks: temporaryTracks }, () => {
    //         console.log('tracks', this.state.selectedtracks);
    //         var temporaryCable = [];
    //         this.state.selectedtracks.forEach((val) => {
    //             val.track.forEach((value) => {
    //                 temporaryCable.push(value)
    //             })
    //         })
    //         this.setState({ cablestrack: temporaryCable }, () => {
    //             var allmarkersdata = [];
    //             for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                 var track = this.state.selectedtracks[m]['track'];

    //                 var markers = this.state.selectedtracks[m]['markerposition'];
    //                 for (var j = 0; j < markers.length; j++) {
    //                     allmarkersdata.push(markers[j]);
    //                 }
    //                 //alltracksdata.push(this.state.selectedtracks[i]);
    //                 this.setState({ recenter: track[0]['data'][0] })
    //             }
    //             //this.setState({ track: alltracksdata });
    //             this.setState({ mappedmarkers: allmarkersdata });
    //         });
    //     })
    // }

    // regionSelected = () => {
    //     let temporaryCities = []
    //     this.state.cities.forEach((val) => {
    //         if (this.state.selectedregions.includes(val.region)) {
    //             temporaryCities.push(val)
    //         }
    //     })

    //     this.setState({ selectedcities: temporaryCities }, () => {

    //         let temporaryTracks = [];

    //         this.state.track.forEach((val) => {
    //             if (this.state.selectedregions.includes(val.region) && this.state.selectedcities.some((value) => { return value.city === val.city })) {
    //                 temporaryTracks.push(val)
    //             }
    //         })

    //         this.setState({ selectedtracks: temporaryTracks }, () => {
    //             console.log('tracks', this.state.selectedtracks);
    //             var temporaryCable = [];
    //             this.state.selectedtracks.forEach((val) => {
    //                 val.track.forEach((value) => {
    //                     temporaryCable.push(value)
    //                 })
    //             })
    //             this.setState({ cablestrack: temporaryCable }, () => {
    //                 var allmarkersdata = [];
    //                 for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                     var track = this.state.selectedtracks[m]['track'];

    //                     var markers = this.state.selectedtracks[m]['markerposition'];
    //                     for (var j = 0; j < markers.length; j++) {
    //                         allmarkersdata.push(markers[j]);
    //                     }
    //                     //alltracksdata.push(this.state.selectedtracks[i]);
    //                     this.setState({ recenter: track[0]['data'][0] })
    //                 }
    //                 //this.setState({ track: alltracksdata });
    //                 this.setState({ mappedmarkers: allmarkersdata });
    //             });
    //         })
    //     });
    // }
    // updateCities = async (temp) => {
    //     this.setState({ selectedcities: temp })
    // }
    // updateRegions = async (temp) => {
    //     this.setState({ selectedregions: temp })
    // }
    // updatefilter = async (temp) => {
    //     this.setState({ selectedmarkers: temp })
    // }
    // updateCables = async (temp) => {
    //     this.setState({ selectedcables: temp })
    // }
    // updateTracks = async (temp, cable) => {
    //     this.setState({ selectedtracks: temp });
    //     this.setState({ cablestrack: cable });
    // }
    // applyFilter = () => {
    //     this.setState({ mappedmarkers: [] });
    //     this.setState({ reportShown: true });
    //     var cable = [];
    //     var tempTrack = persistentselectedTracks;
    //     var filtered = [];
    //     var totalLength = 0;
    //     var tempMappedMarkers = [];
    //     var summaryCables = [];
    //     var summaryMarkers = [];

    //     this.state.selectedmarkers.forEach((val) => {
    //         var temp = { name: val, quantity: 0 }

    //         this.state.selectedtracks.forEach((val1, trackindex) => {
    //             val1.markerposition.forEach((val2) => {
    //                 for (let x in val2) {
    //                     if (x != 'detail' && x != 'id' && x != 'subtrack') {
    //                         if (x == val) {
    //                             temp.quantity = temp.quantity + 1;
    //                         }
    //                     }
    //                 }
    //             })
    //         })

    //         if (temp.quantity > 0) {
    //             summaryMarkers.push(temp);
    //         }
    //     })

    //     this.state.selectedcables.forEach((val) => {
    //         var temp = { name: val, lenght: 0 }

    //         this.state.selectedtracks.forEach((val2, trackindex) => {
    //             val2.track.forEach((val3, index) => {
    //                 val3.name.forEach((name, ind) => {
    //                     if (val == name) {
    //                         for (var i = 0; i < val3.data.length - 1; i++) {
    //                             temp.lenght = temp.lenght + this.distance(val3.data[i]['lat'], val3.data[i]['lng'], val3.data[i + 1]['lat'], val3.data[i + 1]['lng']);
    //                         }
    //                     }
    //                 })

    //             })
    //         })

    //         if (temp.lenght > 0) {
    //             summaryCables.push(temp);
    //         }

    //     })

    //     this.state.selectedtracks.forEach((val, trackindex) => {
    //         var trackName = val.name;
    //         var markers = [];
    //         var cables = [];

    //         this.state.selectedmarkers.forEach((val1) => {
    //             var temp = { name: val1, quantity: 0 }

    //             val.markerposition.forEach((val2) => {
    //                 for (let x in val2) {
    //                     if (x != 'detail' && x != 'id' && x != 'subtrack') {
    //                         if (x == val1) {
    //                             temp.quantity = temp.quantity + 1;
    //                             tempMappedMarkers.push(val2);
    //                         }
    //                     }
    //                 }
    //             })
    //             if (temp.quantity > 0) {
    //                 markers.push(temp);
    //             }
    //         })
    //         this.state.selectedcables.forEach((val3) => {
    //             var temp2 = { name: val3, lenght: 0 }
    //             val.track.forEach((val4, index) => {
    //                 val4.name.forEach((name, ind) => {
    //                     if (val3 == name) {
    //                         for (var i = 0; i < val4.data.length - 1; i++) {
    //                             temp2.lenght = temp2.lenght + this.distance(val4.data[i]['lat'], val4.data[i]['lng'], val4.data[i + 1]['lat'], val4.data[i + 1]['lng']);
    //                         }
    //                         var seperatecable = [];
    //                         var colorIndex = this.state.cables.indexOf(name);
    //                         seperatecable['name'] = name;
    //                         seperatecable['data'] = val4.data;
    //                         seperatecable['color'] = colorIndex;
    //                         seperatecable['shape'] = val4.shape;
    //                         seperatecable['width'] = val4.width;
    //                         //console.log(val4.name);

    //                         //console.log(7+val4.name.length-(ind+2));

    //                         //seperatecable['strokeWidth'] = 7+val4.name.length-(ind+2);
    //                         cable.push(seperatecable);
    //                     }
    //                 })

    //             })
    //             if (temp2.lenght > 0) {
    //                 cables.push(temp2);
    //                 totalLength = totalLength + temp2.lenght;
    //             }
    //         })
    //         filtered.push({ track: trackName, markers: markers, cables: cables });
    //     })


    //     var totalquantity = 0;
    //     var totallength = 0;

    //     summaryMarkers.forEach((val) => {
    //         totalquantity = totalquantity + val.quantity
    //     })
    //     summaryCables.forEach((val) => {
    //         totallength = totallength + val.lenght
    //     })
    //     var tempTotalSummaryCables = { name: 'Total', lenght: totallength }
    //     var tempTotalSummaryMarkers = { name: 'Total', quantity: totalquantity }
    //     let tempMarkersShowArray = [];
    //     if (this.state.selectedtracks.length > 0) {
    //         tempMarkersShowArray.push('N/W Elements')
    //     }
    //     summaryCables.push(tempTotalSummaryCables)
    //     summaryMarkers.push(tempTotalSummaryMarkers)
    //     this.setState({ filteredDataResult: filtered, cablesLength: totalLength, mappedmarkers: tempMappedMarkers, cablestrack: cable, summaryMarkers: summaryMarkers, summaryCables: summaryCables, markersShowArray: tempMarkersShowArray, filterWindowOpen: false }, () => {
    //         console.log('filtered data result', this.state.filteredDataResult);
    //         console.log('markers summary', this.state.summaryMarkers);
    //         console.log('summary cable', this.state.summaryCables)
    //         console.log('markers Show Array', this.state.markersShowArray);
    //         console.log(this.state.cablesLength);
    //     })

    // }
    // distance = (lat1, lon1, lat2, lon2) => {
    //     if ((lat1 == lat2) && (lon1 == lon2)) {
    //         return 0;
    //     }
    //     else {
    //         var radlat1 = Math.PI * lat1 / 180;
    //         var radlat2 = Math.PI * lat2 / 180;
    //         var theta = lon1 - lon2;
    //         var radtheta = Math.PI * theta / 180;
    //         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //         if (dist > 1) {
    //             dist = 1;
    //         }
    //         dist = Math.acos(dist);
    //         dist = dist * 180 / Math.PI;
    //         dist = dist * 60 * 1.1515;
    //         dist = dist * 1.609344
    //         console.log(dist);
    //         return dist;
    //     }
    // }

    // download = (id) => {
    //     this.createKML(id);
    // }

    // delete = (name, id) => {
    //     Axios.post('https://joyndigital.com/Latitude/public/api/customer/fiber/delete', { id: id, name: name })
    //         .then(res => {

    //             console.log(res.data);
    //         }).catch(err => console.log(err))
    // }

    // downloadReport = (JSONData, ReportTitle, ShowLabel) => {
    //     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    //     var arrData = [];
    //     arrData = typeof JSONData != 'object' ? JSONData : JSONData;
    //     console.log(arrData);

    //     var CSV = '';
    //     //Set Report title in first row or line

    //     //CSV += ReportTitle + '\r\n\n';
    //     var head = ['Segment Name', 'Category', "Item Name", "Quantity"]
    //     //This condition will generate the Label/Header
    //     if (ShowLabel) {
    //         var row = "";

    //         //This loop will extract the label from 1st index of on array
    //         for (var index in head) {
    //             console.log(head[index]);
    //             //Now convert each value to string and comma-seprated
    //             row += head[index] + ',';
    //         }

    //         row = row.slice(0, -1);

    //         //append Label row with line break
    //         CSV += row + '\r\n';
    //     }

    //     //1st loop is to extract each row
    //     for (var i = 0; i < arrData.length; i++) {
    //         var row = "";
    //         //2nd loop will extract each column and convert it in string comma-seprated
    //         for (var index in arrData[i]['markers']) {
    //             row += '"' + arrData[i]['track'] + '",';
    //             row += '"OFC",';
    //             row += '"' + arrData[i]['markers'][index]['name'] + '",';
    //             row += '"' + arrData[i]['markers'][index]['quantity'] + '",';
    //             row.slice(0, row.length - 1);
    //             CSV += row + '\r\n';
    //             row = "";
    //             row = "";
    //             CSV += row + '\r\n';
    //         }
    //         for (var index in arrData[i]['cables']) {
    //             row += '"' + arrData[i]['track'] + '",';
    //             row += '"Cable",';
    //             row += '"' + arrData[i]['cables'][index]['name'] + '",';
    //             row += '"' + arrData[i]['cables'][index]['lenght'] + '",';
    //             row.slice(0, row.length - 1);
    //             CSV += row + '\r\n';
    //             row = "";
    //             row = "";
    //             CSV += row + '\r\n';
    //         }
    //         row = "";
    //         CSV += row + '\r\n';
    //         //add a line break after each row

    //     }

    //     if (CSV == '') {
    //         alert("Invalid data");
    //         return;
    //     }

    //     //Generate a file name
    //     var fileName = "Infrastrature Survey Report";
    //     //this will remove the blank-spaces from the title and replace it with an underscore
    //     //fileName += ReportTitle.replace(/ /g,"_");   

    //     //Initialize file format you want csv or xls
    //     var uri = 'data:text/kml;charset=utf-8,' + escape(CSV);

    //     // Now the little tricky part.
    //     // you can use either>> window.open(uri);
    //     // but this will not work in some browsers
    //     // or you will not get the correct file extension    

    //     //this trick will generate a temp <a /> tag
    //     var link = document.createElement("a");
    //     link.href = uri;

    //     //set the visibility hidden so it will not effect on your web-layout
    //     link.style = "visibility:hidden";
    //     link.download = fileName + ".csv";

    //     //this part will append the anchor tag and remove it after automatic click
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }
    // closeReport = () => {
    //     this.setState({ reportShown: false })
    // }

    // showImages = () => {
    //     this.setState({ imageShown: true })
    // }

    // showAuditImage = () => {
    //     console.log(this.state.auditDetailsToShowPosition);
    //     this.setState({ auditImageShown: true })
    // }

    // closeImage = () => {
    //     this.setState({ imageShown: false })
    // }

    // closeAuditImage = () => {
    //     this.setState({ auditImageShown: false })
    // }

    hideSideBar = () => {
        this.setState({ sideBarHide: true })
    }

    showSideBar = () => {
        this.setState({ sideBarHide: false })
    }

    // createKML = (index) => {
    //     var data1 = '';
    //     var data2 = '';
    //     var data3 = '';
    //     let guid = () => {
    //         let s4 = () => {
    //             return Math.floor((1 + Math.random()) * 0x10000)
    //                 .toString(16)
    //                 .substring(1);
    //         }
    //         return s4() + '-' + s4() + '-' + s4() + s4();
    //     }
    //     for (var i = 0; i < this.state.track[index]['track'].length; i++) {
    //         var id = guid();
    //         var coord = '';
    //         for (var j = 0; j < this.state.track[index]['track'][i]['data'].length; j++) {
    //             coord += this.state.track[index]['track'][i]['data'][j]['lng'];
    //             coord += ',';
    //             coord += this.state.track[index]['track'][i]['data'][j]['lat'];
    //             coord += ',';
    //             coord += '0';
    //             coord += ' ';
    //         }
    //         console.log(colors[this.state.track[index]['track'][i]['color']]);
    //         var stylemap = `<StyleMap id="${id}">
    //                                 <Pair>
    //                                 	<key>normal</key>
    //                                 	<styleUrl>#${id}${i}</styleUrl>
    //                                 </Pair>
    //                                 </StyleMap>`;
    //         var style = `<Style id="${id}${i}">
    //                                     <LineStyle>
    //                                     	<color>${color2[this.state.track[index]['track'][i]['color']]}</color>
    //                                     	<width>4</width>
    //                                     </LineStyle>
    //                               </Style>`;
    //         var placemark = `<Placemark>
    //                                     <name>${this.state.track[index]['track'][i]['name']}</name>
    //                                     <open>1</open>
    //                                     <styleUrl>#${id}</styleUrl>
    //                                     <LineString>
    //                                     	<tessellate>1</tessellate>
    //                                     	<coordinates>
    //                                     		${coord}
    //                                     	</coordinates>
    //                                     </LineString>
    //                                 </Placemark>`;
    //         data1 += stylemap;
    //         data2 += style;
    //         data3 += placemark;
    //     }
    //     this.state.track[index]['markerposition'].forEach(function (currentValue, index) {
    //         for (const [key, value] of Object.entries(currentValue)) {
    //             var id = guid();
    //             if (key != 'id' && key != 'detail' && key != 'subtrack') {
    //                 var details = currentValue.detail;
    //                 var detailmap = '';
    //                 for (const [key, value] of Object.entries(currentValue.detail[0])) {
    //                     detailmap = detailmap + `${key}:${value}<br/>`;

    //                 }

    //                 var stylemap = `<StyleMap id="${id}">
    //                                         <Pair>
    //                                         	<key>normal</key>
    //                                         	<styleUrl>#${id}${i}11</styleUrl>
    //                                         </Pair>
    //                                         </StyleMap>`;
    //                 var style = `<Style id="${id}${i}11">
    //                                         <IconStyle>
    //                                 			<scale>1</scale>
    //                                 			<Icon>
    //                                 				<href>https://joyndigital.com/Latitude/public/FiberAppMakrer/${key}.png</href>
    //                                 			</Icon>
    //                                 			<hotSpot x="32" y="1" xunits="pixels" yunits="pixels"/>
    //                                 		</IconStyle>
    //                                 		<LabelStyle>
    //                                 			<color>ffffaa00</color>
    //                                 			<scale>0</scale>
    //                                 		</LabelStyle>
    //                                      </Style>`;

    //                 var placemark = `<Placemark>
    //                                 				<name>${key}</name>
    //                                 				<description>${detailmap}</description>
    //                                 				<styleUrl>${id}</styleUrl>
    //                                 				<Point>
    //                                 					<coordinates>${value[1]},${value[0]},0</coordinates>
    //                                 				</Point>
    //                                 		</Placemark>`;
    //                 data1 += stylemap;
    //                 data2 += style;
    //                 data3 += placemark;
    //             }
    //         }
    //     });
    //     var arrData = [];
    //     var CSV = '';


    //     var makekml = `<?xml version="1.0" encoding="UTF-8"?>
    //                 <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    //                     <Document>
    //                         <name>${this.state.track[index]['name']}</name>
    //                         ${data1}
    //                         ${data2}
    //                         ${data3}
    //                     </Document>
    //                 </kml>`;
    //     var fileName = this.state.track[index]['name'];
    //     var uri = 'data:text/kml;charset=utf-8,' + escape(makekml);
    //     var link = document.createElement("a");
    //     link.href = uri;
    //     link.style = "visibility:hidden";
    //     link.download = fileName + ".kml";

    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }

    // selectAll = (type) => {

    //     if (type === 'region') {
    //         if (this.state.selectedregions.length !== this.state.regions.length) {
    //             this.setState({ selectedregions: this.state.regions }, () => {
    //                 console.log(this.state.selectedregions)
    //                 this.regionSelected();
    //             })
    //         } else {
    //             this.setState({ selectedregions: [] }, () => {
    //                 console.log(this.state.selectedregions)
    //                 this.regionSelected();
    //             })
    //         }
    //     }
    //     if (type === 'city') {
    //         if (this.state.selectedcities.length !== this.state.cities.length) {
    //             this.setState({ selectedcities: this.state.cities }, () => {
    //                 console.log(this.state.selectedcities)
    //                 this.citySelected();
    //             })
    //         } else {
    //             this.setState({ selectedcities: [] }, () => {
    //                 console.log(this.state.selectedcities)
    //                 this.citySelected();
    //             })
    //         }
    //     }
    //     if (type === 'track') {
    //         if (this.state.selectedtracks.length !== this.state.tracksShow.length) {
    //             this.setState({ selectedtracks: this.state.tracksShow }, () => {
    //                 var temporaryCable = [];
    //                 this.state.selectedtracks.forEach((val) => {
    //                     val.track.forEach((value) => {
    //                         temporaryCable.push(value)
    //                     })
    //                 })
    //                 this.setState({ cablestrack: temporaryCable }, () => {
    //                     var allmarkersdata = [];
    //                     for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                         var track = this.state.selectedtracks[m]['track'];

    //                         var markers = this.state.selectedtracks[m]['markerposition'];
    //                         for (var j = 0; j < markers.length; j++) {
    //                             allmarkersdata.push(markers[j]);
    //                         }
    //                         //alltracksdata.push(this.state.selectedtracks[i]);
    //                         this.setState({ recenter: track[0]['data'][0] })
    //                     }
    //                     //this.setState({ track: alltracksdata });
    //                     this.setState({ mappedmarkers: allmarkersdata });
    //                 });

    //             })
    //         } else {
    //             this.setState({ selectedtracks: [] }, () => {
    //                 var temporaryCable = [];
    //                 this.state.selectedtracks.forEach((val) => {
    //                     val.track.forEach((value) => {
    //                         temporaryCable.push(value)
    //                     })
    //                 })
    //                 this.setState({ cablestrack: temporaryCable }, () => {
    //                     var allmarkersdata = [];
    //                     for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                         var track = this.state.selectedtracks[m]['track'];

    //                         var markers = this.state.selectedtracks[m]['markerposition'];
    //                         for (var j = 0; j < markers.length; j++) {
    //                             allmarkersdata.push(markers[j]);
    //                         }
    //                         //alltracksdata.push(this.state.selectedtracks[i]);
    //                         this.setState({ recenter: track[0]['data'][0] })
    //                     }
    //                     //this.setState({ track: alltracksdata });
    //                     this.setState({ mappedmarkers: allmarkersdata });
    //                 });
    //             })
    //         }
    //     }

    //     if (type === 'OFC') {
    //         if (this.state.selectedmarkers.length !== this.state.ana.length) {
    //             let temporaryMarkers = [];
    //             this.state.ana.forEach((val) => {
    //                 temporaryMarkers.push(`OFC/${val}`);
    //             })
    //             this.setState({ selectedmarkers: temporaryMarkers })
    //         } else {
    //             this.setState({ selectedmarkers: [] })
    //         }
    //     }

    //     if (type == 'cable') {
    //         if (this.state.cables.length !== this.state.selectedcables.length) {
    //             this.setState({ selectedcables: this.state.cables })
    //         } else {
    //             this.setState({ selectedcables: [] })
    //         }
    //     }
    // }

    // resetFilter = () => {
    //     this.setState({
    //         selectedcables: [],
    //         selectedmarkers: [],
    //         selectedtracks: [],
    //         selectedcities: [],
    //         selectedregions: [],
    //         markersShowArray: [],

    //     }, () => {
    //         var temporaryCable = [];
    //         this.state.selectedtracks.forEach((val) => {
    //             val.track.forEach((value) => {
    //                 temporaryCable.push(value)
    //             })
    //         })
    //         this.setState({ cablestrack: temporaryCable }, () => {
    //             var allmarkersdata = [];
    //             for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                 var track = this.state.selectedtracks[m]['track'];

    //                 var markers = this.state.selectedtracks[m]['markerposition'];
    //                 for (var j = 0; j < markers.length; j++) {
    //                     allmarkersdata.push(markers[j]);
    //                 }
    //                 //alltracksdata.push(this.state.selectedtracks[i]);
    //                 this.setState({ recenter: track[0]['data'][0] })
    //             }
    //             //this.setState({ track: alltracksdata });
    //             this.setState({ mappedmarkers: allmarkersdata, filteredDataResult: [], reportShown: false, imageShown: false, selectAllTracks: [] });
    //         });
    //     })
    // }

    // dropdownOpen = (type) => {

    //     if (type == 'regions') {
    //         this.setState({ regionsShown: !this.state.regionsShown })
    //     }
    //     if (type == 'cities') {
    //         this.setState({ citiesShown: !this.state.citiesShown })
    //     }
    //     if (type == 'tracks') {
    //         this.setState({ tracksShown: !this.state.tracksShown })
    //     }
    //     if (type == 'ofc') {
    //         this.setState({ OFCShown: !this.state.OFCShown })
    //     }
    //     if (type == 'cables') {
    //         this.setState({ cablesShown: !this.state.cablesShown })
    //     }
    // }

    // pathClicked = (e, names) => {
    //     console.log(names);
    //     console.log(e.latLng.lat());
    //     let position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    //     this.setState({ cableDetailsToShow: names, cableDetailsToShowPosition: position });
    // }

    // showMarkers = () => {
    //     console.log('hello');
    //     this.setState({ markersShow: !this.state.markersShow }, () => {
    //         console.log(this.state.markersShow);
    //     })
    // }

    // addToMarkers = (val) => {
    //     console.log(val);
    //     let temp = this.state.markersShowArray;
    //     if (temp.includes(val)) {
    //         temp = temp.filter((value) => {
    //             return value != val;
    //         })
    //     } else {
    //         temp.push(val)
    //     }

    //     this.setState({ markersShowArray: temp }, () => {
    //         console.log(this.state.markersShowArray);
    //     })
    // }

    // showMoreOptions = () => {
    //     this.setState({ moreOptionsShown: !this.state.moreOptionsShown })
    // }

    // openFilterWindow = () => {
    //     this.setState({ filterWindowOpen: !this.state.filterWindowOpen, reportShown: false })
    // }

    // selectAllNew = (city) => {
    //     console.log(city)
    //     let tempSelectAllTracks = this.state.selectAllTracks;
    //     if (tempSelectAllTracks.includes(city)) {
    //         tempSelectAllTracks = tempSelectAllTracks.filter((val) => {
    //             return val != city
    //         })
    //     } else {
    //         tempSelectAllTracks.push(city)
    //     }
    //     this.setState({ selectAllTracks: tempSelectAllTracks }, () => {

    //         console.log(this.state.selectAllTracks);
    //         if (this.state.selectAllTracks.includes(city)) {
    //             let tempTracksShow = this.state.tracksShow.filter((val) => {
    //                 return this.state.selectAllTracks.includes(val.city)
    //             })
    //             this.setState({ selectedtracks: tempTracksShow }, () => {
    //                 var temporaryCable = [];
    //                 this.state.selectedtracks.forEach((val) => {
    //                     val.track.forEach((value) => {
    //                         temporaryCable.push(value)
    //                     })
    //                 })
    //                 this.setState({ cablestrack: temporaryCable }, () => {
    //                     var allmarkersdata = [];
    //                     for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                         var track = this.state.selectedtracks[m]['track'];

    //                         var markers = this.state.selectedtracks[m]['markerposition'];
    //                         for (var j = 0; j < markers.length; j++) {
    //                             allmarkersdata.push(markers[j]);
    //                         }
    //                         //alltracksdata.push(this.state.selectedtracks[i]);
    //                         this.setState({ recenter: track[0]['data'][0] })
    //                     }
    //                     //this.setState({ track: alltracksdata });
    //                     this.setState({ mappedmarkers: allmarkersdata });
    //                 });

    //             })
    //         } else {
    //             let tempTracksShow = this.state.tracksShow.filter((val) => {
    //                 return this.state.selectAllTracks.includes(val.city)
    //             })
    //             this.setState({ selectedtracks: tempTracksShow }, () => {
    //                 var temporaryCable = [];
    //                 this.state.selectedtracks.forEach((val) => {
    //                     val.track.forEach((value) => {
    //                         temporaryCable.push(value)
    //                     })
    //                 })
    //                 this.setState({ cablestrack: temporaryCable }, () => {
    //                     var allmarkersdata = [];
    //                     for (var m = 0; m < this.state.selectedtracks.length; m++) {
    //                         var track = this.state.selectedtracks[m]['track'];

    //                         var markers = this.state.selectedtracks[m]['markerposition'];
    //                         for (var j = 0; j < markers.length; j++) {
    //                             allmarkersdata.push(markers[j]);
    //                         }
    //                         //alltracksdata.push(this.state.selectedtracks[i]);
    //                         this.setState({ recenter: track[0]['data'][0] })
    //                     }
    //                     //this.setState({ track: alltracksdata });
    //                     this.setState({ mappedmarkers: allmarkersdata });
    //                 });
    //             })
    //         }
    //     })

    // }

    // regionClicked = (region) => {
    //     let tempRegionsOpen = this.state.regionsOpen
    //     if (tempRegionsOpen.includes(region)) {
    //         tempRegionsOpen = tempRegionsOpen.filter((val) => {
    //             return val !== region
    //         })
    //     } else {
    //         tempRegionsOpen.push(region)
    //     }
    //     this.setState({ regionsOpen: tempRegionsOpen }, () => {
    //         console.log(this.state.regionsOpen)
    //     })

    // }

    // cityClicked = (city) => {
    //     let tempCitiesOpen = this.state.citiesOpen
    //     if (tempCitiesOpen.includes(city)) {
    //         tempCitiesOpen = tempCitiesOpen.filter((val) => {
    //             return val !== city
    //         })
    //     } else {
    //         tempCitiesOpen.push(city)
    //     }
    //     this.setState({ citiesOpen: tempCitiesOpen }, () => {
    //         console.log(this.state.citiesOpen)
    //     })
    // }

    addToTrack = (val) => {
        //console.log(val)
        let tempTracks = this.state.tracksShow;
        let tempMarkers = [];
        let center = this.state.center;

        if (tempTracks.some(value => { return value.id === val.id })) {
            //console.log('if running')
            tempTracks = tempTracks.filter((track) => {
                return track.id !== val.id
            })

            // console.log(tempTracks.length)

            tempTracks.forEach((val) => {
                JSON.parse(val.alldata).forEach((value) => {
                    if (this.state.filter.includes(value.markertype) || this.state.filter.length === 0) {
                        let myMarker = value;
                        myMarker.track = val.name;
                        tempMarkers.push(myMarker);
                    }
                })
            })

            tempMarkers = tempMarkers.map(val => {

                let position = { lat: val.postion[0], lng: val.postion[1] };

                val.position = position

                return val;
            })

        } else {
            // console.log('else running')
            
            tempTracks.push(val)

            tempTracks.forEach((val) => {
                JSON.parse(val.alldata).forEach((value) => {
                    if (this.state.filter.includes(value.markertype) || this.state.filter.length === 0) {
                        let myMarker = value;
                        myMarker.track = val.name;
                        tempMarkers.push(myMarker);
                    }
                })
            })

            tempMarkers = tempMarkers.map(val => {

                let position = { lat: val.postion[0], lng: val.postion[1] };

                val.position = position

                return val;
            })

        }

        if (tempMarkers.length > 0) {
            center = tempMarkers[tempMarkers.length - 1].position;
        }

        this.setState({ tracksShow: tempTracks, markersShow: tempMarkers, center: center }, () => {
             console.log('tracks after selection', tempTracks)
            // console.log('markers after selection', tempMarkers)
        })

    }


    dropdownClicked = (regidx, type, name) => {
        let tempRegions = this.state.regions
        // console.log('TYPE', type)
        if (type === 'city') {
            // console.log('inside city')
            let tempCities = [];
            tempRegions[regidx].cities.forEach((val) => {
                let tempCity = val;
                if (val.name === name) {
                    tempCity.dropdown = !tempCity.dropdown
                }
                tempCities.push(tempCity)
            })

            tempRegions[regidx].cities = tempCities;

            this.setState({ regions: tempRegions }, () => {
                // console.log(this.state.regions)
            })
        }
        if (type === 'region') {
            // console.log('inside region')
            tempRegions = tempRegions.map((val) => {
                if (val.name === name) {
                    val.dropdown = !val.dropdown
                }
                return val
            })

            this.setState({ regions: tempRegions }, () => {
                // console.log(this.state.regions)
            })
        }

    }

    markerClicked = (value) => {
        // console.log(value)
        let tempDetailsToShow = [];
        let tempDetailsToShowMarker = value;
        let tempDetailsToShowPosition = value.position
        let tempDetailsToShowType = ''
        if (Array.isArray(value.data[0])) {
            // console.log('data elements array');
            tempDetailsToShowType = 'floor'
            value.data.forEach((val, index) => {

                let num = index + 1;

                let temp = { floor: 'Floor ' + num, data: [] }

                val.forEach(v => {
                    temp.data.push({ name: v.name, value: v.Value })
                })

                tempDetailsToShow.push(temp);

            })
        } else {
            // console.log('not an array')
            tempDetailsToShowType = 'Not a Floor'
            value.data.forEach((val) => {
                tempDetailsToShow.push({ name: val.name, value: val.Value })
            })
        }

        // console.log(tempDetailsToShow);
        // console.log(tempDetailsToShowPosition);
        // console.log(tempDetailsToShowType)

        this.setState({ detailsToShowMarker: tempDetailsToShowMarker, detailsToShow: tempDetailsToShow, detailsToShowPosition: tempDetailsToShowPosition, detailsToShowType: tempDetailsToShowType }, () => {

            //console.log('checkState', this.state.detailsToShowType)
        })

    }

    logoutClicked = () => {
        //console.log('logout clicked')

        Axios.post('./logout').then(res => {
            // console.log(res)
            window.history.back()
        })
    }

    residentialClicked = () => {
        let tempFilter = this.state.filter;
        let tempTracks = this.state.tracksShow;
        let tempMarkers = [];
        if (tempFilter.includes('Residentail')) {
            var index = tempFilter.indexOf('Residentail');
            if (index !== -1) {
                tempFilter.splice(index, 1);
            }
        } else {
            tempFilter.push('Residentail');
        }

        tempTracks.forEach((val) => {
            JSON.parse(val.alldata).forEach((value) => {
                if (tempFilter.includes(value.markertype) || this.state.filter.length === 0) {
                    let myMarker = value;
                    myMarker.track = val.name;
                    tempMarkers.push(myMarker);
                }
            })
        })

        tempMarkers = tempMarkers.map(val => {

            let position = { lat: val.postion[0], lng: val.postion[1] };

            val.position = position

            return val;
        })

        this.setState({ filter: tempFilter, tracksShow: tempTracks, markersShow: tempMarkers }, () => {
            //console.log(this.state.filter)
        })

    }

    commercialClicked = () => {
        let tempFilter = this.state.filter;
        let tempTracks = this.state.tracksShow;
        let tempMarkers = [];
        if (tempFilter.includes('Commercail')) {
            var index = tempFilter.indexOf('Commercail');
            if (index !== -1) {
                tempFilter.splice(index, 1);
            }
        } else {
            tempFilter.push('Commercail');
        }

        tempTracks.forEach((val) => {
            JSON.parse(val.alldata).forEach((value) => {
                if (tempFilter.includes(value.markertype) || this.state.filter.length === 0) {
                    let myMarker = value;
                    myMarker.track = val.name;
                    tempMarkers.push(myMarker);
                }
            })
        })

        tempMarkers = tempMarkers.map(val => {

            let position = { lat: val.postion[0], lng: val.postion[1] };

            val.position = position

            return val;
        })

        this.setState({ filter: tempFilter, tracksShow: tempTracks, markersShow: tempMarkers }, () => {
            //console.log(this.state.filter)
        })
    }

    dateEntered = (event, type) => {

        let temp = this.state.filterDates

        if (type == 'from') {
            //console.log('from', event.target.value)
            temp.from = event.target.value
        }

        if (type == 'to') {
            //console.log('to', event.target.value)
            temp.to = event.target.value
        }

        this.setState({ filterDates: temp }, () => {
            //console.log(this.state.filterDates)
        })


    }

    applyDateFilter = () => {

        let fromDate = new Date(this.state.filterDates.from);
        let toDate = new Date(this.state.filterDates.to);

        // console.log('from', fromDate)
        // console.log('to', toDate)

        if (this.state.filterDates.from === '' || this.state.filterDates.to === '') {
            alert('Please Select To and From Dates')
            return
        }

        let tempTracks = this.state.tracks;
        let tempMarkers = [];

        tempTracks.forEach((val) => {
            let dateObj = new Date(val.created_at)
            JSON.parse(val.alldata).forEach((value) => {
                if (dateObj.getTime() >= fromDate.getTime() && dateObj.getTime() <= toDate.getTime()) {
                    let myMarker = value;
                    myMarker.track = val.name;
                    tempMarkers.push(myMarker);
                }
            })
        })

        tempMarkers = tempMarkers.map(val => {

            let position = { lat: val.postion[0], lng: val.postion[1] };

            val.position = position

            return val;
        })

        this.setState({ tracksShow: tempTracks, markersShow: tempMarkers })

    }
    resetDateFilter = () => {
        this.setState({ tracksShow: [], markersShow: [] })
    }
    render() {

        var track = this.state.track;
        var zoom = this.state.zoom;

        const containerStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div style={{ height: 'calc(100vh - 30px)', width: '100vw', display: "flex", flexWrap: 'wrap', justifyContent: "center", overflow: 'hidden', position: 'relative' }}>

                <div className={`mapSideBar ${this.state.sideBarHide ? "mapSideBarShorten" : ""}`}>
                    {this.state.sideBarHide &&
                        <div onClick={() => this.showSideBar()} style={{ width: '100%', color: 'black', textAlign: 'center', cursor: 'pointer' }}>
                            <i className="fa fa-arrow-right"></i>
                        </div>
                    }
                    {this.state.sideBarHide == false &&
                        <>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div style={{ cursor: 'pointer', heigth: '20px', width: '10%', textAlign: 'center' }} title="Logout"><a href='logout'><i className="fa fa-sign-out" style={{ color: 'black' }}></i></a></div>
                                <div className={this.state.filter.includes('Residentail') ? "orange" : ""} style={{ cursor: 'pointer', heigth: '20px', width: '10%', textAlign: 'center' }} title="Residential Markers" onClick={() => this.residentialClicked()}><i className="fa fa-home" style={{ color: 'black' }}></i></div>
                                <div className={this.state.filter.includes('Commercail') ? "orange" : ""} style={{ cursor: 'pointer', heigth: '20px', width: '10%', textAlign: 'center' }} title="Commercial Markers" onClick={() => this.commercialClicked()}><i className="fa fa-building" style={{ color: 'black' }}></i></div>
                                <div className={this.state.filter.includes('Commercail') ? "orange" : ""} style={{ cursor: 'pointer', heigth: '20px', width: '10%', textAlign: 'center' }} title="Show Images" onClick={() => this.setState({showImage: true})}><i className="fa fa-image" style={{ color: 'black' }}></i></div>

                                <div style={{ cursor: 'pointer', heigth: '20px', width: '60%', textAlign: 'right' }} onClick={() => this.hideSideBar()} ><i className="fa fa-arrow-left" ></i></div>
                            </div>
                            <hr></hr>
                            <div className="tracks">
                                <h5 style={{ marginTop: 0, textAlign: 'center' }}>Area & Surveys</h5>

                                {this.state.regions.map((val, index) => {
                                    return (
                                        <div key={index} >
                                            <span style={{ cursor: 'pointer' }} onClick={() => this.dropdownClicked(index, 'region', val.name)}>{val.name} <i className="fa fa-angle-down" style={{ color: 'black' }}></i></span>
                                            {val.cities.map((val1, index1) => {
                                                return (
                                                    <>
                                                        {val.dropdown &&
                                                            <div key={index1} style={{ marginLeft: '20px' }} >
                                                                <span style={{ cursor: 'pointer' }} onClick={() => this.dropdownClicked(index, 'city', val1.name)}>{val1.name} <i className="fa fa-angle-down" style={{ color: 'black' }}></i></span>
                                                                {val1.tracks.map((val2, index2) => {
                                                                    return (
                                                                        <>
                                                                            {val1.dropdown &&
                                                                                <div key={index2} style={{ width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid gray' }}>
                                                                                    <div style={{ width: '12%', textAlign: 'left' }} > <input onChange={() => this.addToTrack(val2)} checked={this.state.tracksShow.some(track => { return track.id === val2.id })} type="checkbox" /> </div>
                                                                                    <div style={{ width: '88%', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} title={val2.name}> {val2.name} </div>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>
                                                        }
                                                    </>
                                                )
                                            })}
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="dateFilter">
                                <h5>Date Filter</h5>
                                From
                                <br></br>
                                <input type="date" placeholder="From" onChange={(e) => this.dateEntered(e, 'from')} />
                                <br></br>
                                To
                                <br></br>
                                <input type="date" placeholder="To" onChange={(e) => this.dateEntered(e, 'to')} />
                                <br></br>
                                <button onClick={() => this.applyDateFilter()}>Apply Filter</button>
                                <button onClick={() => this.resetDateFilter()}>Reset</button>
                            </div>
                            {/* <div className="filters">
                                <div style={{ height: '60px' }}>
                                    <h5 style={{ margin: 0, textAlign: 'center', height: '50%' }}>Filters <i className="fa fa-filter" onClick={() => this.applyFilter()} title="Apply Filter" style={{ cursor: 'pointer' }}></i></h5>
                                    <div style={{ margin: 0, textAlign: 'center', height: '50%' }}>
                                        <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid black', borderRadius: '5px' }} onClick={() => this.applyFilter()}>Apply Filter</button>
                                        <button style={{ cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid black', borderRadius: '5px' }} onClick={() => this.resetFilter()}>Reset Filter</button>
                                    </div>
                                </div>
                                <div style={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.dropdownOpen('ofc')}>N/W Elements <i className="fa fa-angle-down"></i></div>
                                    {this.state.OFCShown &&
                                        <div>
                                            <div style={{ width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid gray' }}>
                                                <div style={{ width: '12%', textAlign: 'left' }}> <input onChange={() => this.selectAll('OFC')} checked={this.state.ana.length == this.state.selectedmarkers.length} type="checkbox" /> </div>
                                                <div style={{ width: '88%', textAlign: 'left' }} > Select All </div>
                                            </div>
                                            {this.state.ana.map((val, index) => {
                                                return (
                                                    <div key={index} style={{ width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid gray' }}>
                                                        <div style={{ width: '12%', textAlign: 'left' }} > <input onChange={() => this.addMarker(val)} type="checkbox" checked={this.state.selectedmarkers.includes('OFC/' + val)} /> </div>
                                                        <div style={{ width: '88%', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {val} </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.dropdownOpen('cables')}>Cables <i className="fa fa-angle-down"></i></div>
                                    {this.state.cablesShown &&
                                        <div>
                                            <div style={{ width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid gray' }}>
                                                <div style={{ width: '12%', textAlign: 'left' }}> <input onChange={() => this.selectAll('cable')} checked={this.state.cables.length == this.state.selectedcables.length} type="checkbox" /> </div>
                                                <div style={{ width: '88%', textAlign: 'left' }} > Select All </div>
                                            </div>
                                            {this.state.cables.map((val, index) => {
                                                return (
                                                    <div key={index} style={{ width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', borderBottom: '1px solid gray' }}>
                                                        <div style={{ width: '12%', textAlign: 'left' }}> <input onChange={() => this.addCable(val)} type="checkbox" checked={this.state.selectedcables.includes(val)} /> </div>
                                                        <div style={{ width: '88%', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {val} </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            </div> */}
                        </>
                    }
                </div>

                <div className={`map ${this.state.sideBarHide ? "mapBigger" : ""}`}>
                    <LoadScript
                        googleMapsApiKey="AIzaSyC7heras8LxUkJxZSbXmJvPBB1qMStJTM4"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={this.state.center}
                            zoom={10}
                            labels={true}

                        >
                            <MarkerClusterer options={options}>
                                {(clusterer) =>
                                    this.state.markersShow.map((value, index) => (
                                        <Marker
                                            key={index}
                                            onClick={() => this.markerClicked(value)}
                                            icon={{
                                                url: `./markers/${value.markertype}.png`,
                                                scaledSize: { width: 16, height: 20 },
                                                anchor: { x: 5, y: 20 }
                                            }}
                                            position={value.position}
                                            clusterer={clusterer}
                                        />
                                        // <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                                    ))
                                }
                            </MarkerClusterer>
                            {/* {this.state.markersShow.map((value, index) => {
                                return (
                                    <div>
                                        <Marker
                                            key={index}
                                            onClick={() => this.markerClicked(value)}
                                            icon={{
                                                url: `./markers/${value.markertype}.png`,
                                                scaledSize: { width: 30, height: 30 },
                                                anchor: { x: 5, y: 20 }
                                            }}
                                            position={value.position}
                                        />
                                    </div>
                                )
                            })} */}


                            {this.state.detailsToShowPosition.lat !== 0 && this.state.detailsToShowPosition.lng !== 0 && this.state.detailsToShowType === 'floor' &&
                                <InfoWindow
                                    position={this.state.detailsToShowPosition}
                                    onCloseClick={() => this.setState({ detailsToShowPosition: { lat: 0, lng: 0 } })}
                                >
                                    <div>
                                        <i className="fa fa-download" onClick={() => Multiplefromdownload(this.state.detailsToShow, "Vehicle Report", true, this.state.detailsToShowMarker.track)}></i>
                                        {this.state.detailsToShow.map((value, index) => {
                                            return (
                                                <div key={index}>
                                                    <h5>{value.floor}</h5>
                                                    <table border="1" style={{ width: '100%' }}>
                                                        <tbody>
                                                            {value.data.map((value1, ind) => {
                                                                return (
                                                                    <tr key={ind}>
                                                                        <td style={{ border: '1px solid black', width: "80%" }}>{value1.name}</td>
                                                                        <td style={{ border: '1px solid black', width: "20%" }}>{value1.value}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </InfoWindow>
                            }

                            {this.state.detailsToShowPosition.lat !== 0 && this.state.detailsToShowPosition.lng !== 0 && this.state.detailsToShowType === 'Not a Floor' &&
                                <InfoWindow
                                    position={this.state.detailsToShowPosition}
                                    onCloseClick={() => this.setState({ detailsToShowPosition: { lat: 0, lng: 0 } })}
                                >
                                    <div>
                                        <i className="fa fa-download" onClick={() => Formdownload(this.state.detailsToShow, "Vehicle Report", true, this.state.detailsToShowMarker.track)}></i>
                                        <table border="1" style={{ width: '100%' }}>
                                            <tbody>
                                                {this.state.detailsToShow.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{ border: '1px solid black', width: "80%" }}>{value.name}</td>
                                                            <td style={{ border: '1px solid black', width: "20%" }}>{value.value}</td>
                                                        </tr>

                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                </InfoWindow>
                            }

                            {/* {this.state.cablestrack.map((value2, index2) => {
                                return (
                                    <div key={index2}>
                                        {this.state.filteredDataResult.length == 0 &&
                                            <div>
                                                {value2.name.length == 1 &&

                                                    <Polyline
                                                        onClick={(e) => this.pathClicked(e, value2.name)}
                                                        path={value2.data}
                                                        options={{
                                                            strokeColor: colors[value2.color],
                                                            strokeOpacity: 0.8,
                                                            strokeWeight: 3,
                                                            fillColor: colors[value2.color],
                                                            fillOpacity: 0.35,
                                                            clickable: true,
                                                            draggable: false,
                                                            editable: false,
                                                            visible: true,
                                                            radius: 30000,
                                                            paths: track,
                                                            zIndex: 1
                                                        }}
                                                    />
                                                }
                                                {value2.name.length > 1 &&

                                                    <Polyline
                                                        onClick={(e) => this.pathClicked(e, value2.name)}
                                                        path={value2.data}
                                                        options={{
                                                            strokeColor: '#000000',
                                                            strokeOpacity: 0.8,
                                                            strokeWeight: 7,
                                                            fillColor: colors[value2.color],
                                                            fillOpacity: 0.35,
                                                            clickable: true,
                                                            draggable: false,
                                                            editable: false,
                                                            visible: true,
                                                            radius: 30000,
                                                            paths: track,
                                                            zIndex: 1
                                                        }}
                                                    />
                                                }
                                            </div>
                                        }
                                        {this.state.filteredDataResult.length > 0 &&
                                            <Polyline
                                                onClick={(e) => this.pathClicked(e, value2.name)}
                                                path={value2.data}
                                                options={{
                                                    strokeColor: colors[value2.color],
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 3,
                                                    fillColor: colors[value2.color],
                                                    fillOpacity: 0.35,
                                                    clickable: true,
                                                    draggable: false,
                                                    editable: false,
                                                    visible: true,
                                                    radius: 30000,
                                                    paths: track,
                                                    zIndex: 1,
                                                }}
                                            />
                                        }
                                    </div>
                                );
                            })}
                            {this.state.mappedmarkers.map((valuepre, index) => {
                                return (
                                    <div key={index}>
                                        {Object.entries(valuepre).map(([key, value]) => {
                                            return (
                                                <div key={key}>
                                                    {key !== 'detail' && key != 'id' && key !== 'subtrack' && key !== 'OFC/tower' && this.state.markersShowArray.includes('N/W Elements') &&
                                                        <div>
                                                            <Marker
                                                                onClick={() => this.markerClicked(value, valuepre.detail, valuepre)}
                                                                icon={{
                                                                    url: `https://joyndigital.com/Latitude/public/FiberAppMakrer/${key}.png`,
                                                                    scaledSize: { width: 20, height: 20 },
                                                                    anchor: { x: 5, y: 20 }
                                                                }}
                                                                title={key.substr(4)}
                                                                position={{
                                                                    lat: value[0],
                                                                    lng: value[1],

                                                                }}
                                                            />
                                                        </div>

                                                    }
                                                    {key == 'OFC/tower' && this.state.markersShowArray.includes('N/W Elements') &&
                                                        <div>
                                                            <Marker
                                                                onClick={() => this.markerClicked(value, valuepre.detail, valuepre)}
                                                                icon={{
                                                                    url: `https://joyndigital.com/Latitude/public/FiberAppMakrer/${key}.png`,
                                                                    scaledSize: { width: 40, height: 40 },
                                                                    anchor: { x: 5, y: 20 }
                                                                }}
                                                                title={key.substr(4)}
                                                                position={{
                                                                    lat: value[0],
                                                                    lng: value[1],

                                                                }}
                                                            />
                                                        </div>

                                                    }
                                                </div>
                                            );
                                        })}

                                    </div>
                                )
                            })}

                            {this.state.auditMarkers.map((value, index) => {
                                return (
                                    <div>
                                        {this.state.markersShowArray.includes('Audits') &&
                                            <div>
                                                <Marker
                                                    key={index}
                                                    onClick={() => this.auditMarkerClicked(value)}
                                                    icon={{
                                                        url: `https://joyndigital.com/Latitude/public/Audit/auditMarker.png`,
                                                        scaledSize: { width: 30, height: 30 },
                                                        anchor: { x: 5, y: 20 }
                                                    }}
                                                    position={value}
                                                />
                                            </div>
                                        }
                                    </div>
                                )
                            })}

                            {this.state.detailsToShowPosition.lat != 0 && this.state.detailsToShowPosition.lng != 0 &&
                                <InfoWindow
                                    onCloseClick={() => this.infowindowclosed()}
                                    position={this.state.detailsToShowPosition}
                                >
                                    <div>
                                        {Object.keys(this.state.detailsToShow).length > 1 &&
                                            <table border='1'>
                                                {Object.entries(this.state.detailsToShow).map(([key, value]) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key}</td>
                                                            <td>{value}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </table>

                                        }
                                        {Object.keys(this.state.detailsToShow).length === 1 &&
                                            <table border='1'>
                                                {Object.entries(this.state.detailsToShow).map(([key, value]) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{value}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </table>
                                        }
                                    </div>

                                </InfoWindow>
                            }

                            {this.state.cableDetailsToShowPosition.lat != 0 && this.state.cableDetailsToShowPosition.lng != 0 && Array.isArray(this.state.cableDetailsToShow) &&
                                <InfoWindow
                                    onCloseClick={() => this.cableInfowindowclosed()}
                                    position={this.state.cableDetailsToShowPosition}
                                >
                                    <div>
                                        {this.state.cableDetailsToShow.map((detail, ind) => {
                                            return (
                                                <div key={ind}>
                                                    {ind + 1} - {detail}
                                                </div>
                                            )
                                        })}
                                    </div>

                                </InfoWindow>
                            }

                            {this.state.auditDetailsToShowPosition.lat != 0 && this.state.auditDetailsToShowPosition.lng != 0 &&
                                <InfoWindow
                                    onCloseClick={() => this.auditInfowindowclosed()}
                                    position={this.state.auditDetailsToShowPosition}
                                >
                                    <div>
                                        {this.state.auditDetailsToShow.map((detail, ind) => {
                                            return (
                                                <div key={ind}>
                                                    <div>Date :  {detail.month} </div>
                                                    {this.state.auditForms.map((value, index) => {

                                                        return (

                                                            <div key={index}>
                                                                {detail.question.some((item) => { return item.form == value.name }) &&
                                                                    <div>
                                                                        <div style={{ fontWeight: 'bold' }}>{value.name}</div>
                                                                        {value.checklists.map((value2, index2) => {
                                                                            return (
                                                                                <div key={index2}>
                                                                                    {detail.question.some((item) => { return item.checklist == value2.name }) &&
                                                                                        <div>
                                                                                            <div style={{ fontWeight: 'bold', marginLeft: '30px' }}>{value2.name}</div>
                                                                                            {value2.headings.map((value3, index3) => {

                                                                                                return (
                                                                                                    <div key={index3}>
                                                                                                        {detail.question.some((item) => { return item.heading == value3 }) &&
                                                                                                            <div>
                                                                                                                <div style={{ fontWeight: 'bold', marginLeft: '60px' }}>{value3}</div>
                                                                                                                {detail.question.map((q, i) => {

                                                                                                                    return (
                                                                                                                        <div key={i}>
                                                                                                                            {q.heading == value3 && q.checklist == value2.name && q.form == value.name &&
                                                                                                                                <div>
                                                                                                                                    <div style={{ marginLeft: '90px' }}>{q.name} <i style={{ cursor: 'pointer', fontSize: '10px' }} className="fa fa-image" onClick={() => { this.showAuditImage() }}></i></div>
                                                                                                                                    <div style={{ marginLeft: '120px', fontSize: '10px' }}>
                                                                                                                                        {q.checkoptions.map((choption, chind) => {
                                                                                                                                            return (
                                                                                                                                                <span key={chind}>{choption.name}<input onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', height: '10px', width: '10px' }} type="checkbox" defaultChecked={choption.id == q.c_co} /> </span>
                                                                                                                                            )
                                                                                                                                        })}

                                                                                                                                        {q.multiselectOptions.map((moption, mind) => {
                                                                                                                                            return (
                                                                                                                                                <span key={mind}>{moption.name}<input onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', height: '10px', width: '10px' }} type="checkbox" defaultChecked={q.m_so.includes(moption.id)} /> </span>
                                                                                                                                            )
                                                                                                                                        })}

                                                                                                                                        {q.texts.map((text, textind) => {
                                                                                                                                            return (
                                                                                                                                                <div key={textind}>
                                                                                                                                                    {text.name} : {q.text[text.id]}
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        })}

                                                                                                                                        {q.dropdownoptions.map((doption, dind) => {
                                                                                                                                            return (
                                                                                                                                                <div key={dind}>
                                                                                                                                                    {doption.id == q.d_do &&
                                                                                                                                                        <div>
                                                                                                                                                            {doption.name}
                                                                                                                                                        </div>
                                                                                                                                                    }
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                        })}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </div>

                                                                                                                    )
                                                                                                                })}
                                                                                                            </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>

                                </InfoWindow>
                            } */}
                        </GoogleMap>
                    </LoadScript>
                </div>




                {/* {this.state.reportShown &&
                    <div className="GisView_report">
                        <div onClick={() => this.closeReport()} style={{ fontWeight: 'bold', marginRight: '20px', textAlign: 'right', cursor: 'pointer', margin: '0' }}>x</div>
                        {this.state.filteredDataResult.length === 0 &&
                            <div style={{ background: 'rgb(230, 97, 57)', color: "white", }}>
                                <h3>No Track Selected!</h3>
                                <p>Filters run against tracks. Please select tracks and apply filter again to generate report</p>
                            </div>
                        }
                        {this.state.filteredDataResult.length !== 0 &&
                            <div style={{ overflow: 'auto', height: 'calc(100% - 50px)', margin: '0' }}>

                                <div style={{ clear: 'both' }}></div>
                                <h4 style={{ marginTop: 0, textAlign: 'center' }}> Report </h4>

                                {this.state.summaryCables.length > 1 &&
                                    <div>
                                        <h5 style={{ textAlign: 'center' }}> Cable Types Summary </h5>
                                        <table>
                                            <tr>
                                                <th>Cable</th>
                                                <th>Length (KM)</th>
                                            </tr>
                                            {this.state.summaryCables.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{value.name}</td>
                                                        <td>{value.lenght.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </div>
                                }

                                {this.state.summaryMarkers.length > 1 &&
                                    <div>
                                        <h5 style={{ textAlign: 'center' }}> N/W Elements Summary </h5>
                                        <table>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                            </tr>
                                            {this.state.summaryMarkers.map((value, index) => {
                                                return (
                                                    <>
                                                        {value.name != 'Total' &&
                                                            <tr key={index}>
                                                                <td>{value.name}</td>
                                                                <td>{value.quantity}</td>
                                                            </tr>
                                                        }
                                                    </>
                                                )
                                            })}
                                        </table>
                                    </div>
                                }

                                <h5 style={{ textAlign: 'center' }}> Cables/Elements per Track </h5>

                                {this.state.filteredDataResult.map((value, index) => {
                                    return (
                                        <div key={index} style={{ borderBottom: '1px solid white' }}>
                                            <h5 style={{ color: 'greenyellow' }}>{value.track}</h5>
                                            <h6 style={{ marginBottom: '0px', textAlign: 'center' }}>OFC</h6>
                                            <table border="1" style={{ width: '100%' }}>
                                                <tr>
                                                    <th style={{ textAlign: 'center' }}>type</th>
                                                    <th style={{ textAlign: 'center' }}>quantity</th>
                                                </tr>
                                                {value.markers.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td style={{ textAlign: 'center' }}>{val.name}</td>
                                                            <td style={{ textAlign: 'center' }}>{val.quantity}</td>
                                                        </tr>
                                                    )

                                                })}
                                            </table>

                                            <h6 style={{ marginBottom: '0px', textAlign: 'center' }}>Cables</h6>
                                            <table border="1" style={{ width: '100%' }}>
                                                <tr>
                                                    <th style={{ textAlign: 'center' }}>name</th>
                                                    <th style={{ textAlign: 'center' }}>length (km)</th>
                                                </tr>
                                                {value.cables.map((val2, ind2) => {
                                                    return (
                                                        <tr key={ind2}>
                                                            <td style={{ textAlign: 'center' }}>{val2.name}</td>
                                                            <td style={{ textAlign: 'center' }}>{val2.lenght.toFixed(2)}</td>
                                                        </tr>
                                                    )

                                                })}
                                            </table>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {this.state.filteredDataResult.length !== 0 &&
                            <div style={{ height: '30px', width: '100%', textAlign: 'center', margin: '0' }}><button onClick={() => this.downloadReport(this.state.filteredDataResult, "Vehicle Report", true)}>Download Report</button></div>
                        }

                    </div>
                }

                {this.state.imageShown &&
                    <div className="GisView_image">
                        <div onClick={() => this.closeImage()} style={{ fontWeight: 'bold', marginRight: '20px', cursor: 'pointer', position: 'fixed', right: '0', top: '40px' }}>x</div>
                        <div style={{ clear: 'both' }}></div>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Images of Selected Tracks </h5>
                        {this.state.selectedtracks.map((value, index) => {
                            return (
                                <div key={index}>
                                    <h5>{value.name}</h5>
                                    <table border="1" style={{ width: '100%' }}>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Name</th>
                                            <th style={{ textAlign: 'center' }}>Image</th>
                                        </tr>
                                        {value.trackmedia.map((val, ind) => {
                                            return (
                                                <tr key={ind} style={{ heigth: '100px', width: '100px' }}>
                                                    <td style={{ textAlign: 'center' }}>{val.name}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <a href={`${process.env.REACT_APP_FIBERIMAGES_BASE_URL}${value.name}/image/${val.name}`} target="_blank">
                                                            <img src={`${process.env.REACT_APP_FIBERIMAGES_BASE_URL}${value.name}/image/${val.name}`} style={{ height: '100px', width: '100px' }} />
                                                        </a>

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                            )
                        })}
                    </div>
                }

                {this.state.auditImageShown &&
                    <div className="GisView_image">
                        <div onClick={() => this.closeAuditImage()} style={{ float: 'right', fontWeight: 'bold', marginRight: '20px', cursor: 'pointer' }}>x</div>
                        <div style={{ clear: 'both' }}></div>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Images </h5>
                        <p style={{ textAlign: 'center' }}> no images for this question</p>
                    </div>
                } */}

                {this.state.showImage &&
                    <div className="GisView_image">
                        <div onClick={() => this.setState({showImage: false})} style={{ fontWeight: 'bold', marginRight: '20px', cursor: 'pointer', position: 'fixed', right: '0', top: '10px' }}>x</div>
                        <div style={{ clear: 'both' }}></div>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Images of Selected Surveys </h5>
                        {this.state.tracksShow.map((value, index) => {
                            return (
                                <div key={index} style={{textAlign: 'center'}}>
                                    <h5>{value.name}</h5>
                                        {value.media.map((val, ind) => {
                                            return (
                                                <a href={`./Transworld/1/${value.name}/1${val}`} target='__blank'>
                                                    <img src={`./Transworld/1/${value.name}/1${val}`} style={{height: '150px', width: '40%', marginLeft: '10px'}}></img>
                                                </a>
                                                
                                            )
                                        })}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {

        // this.props.updatePathname(window.location.href)
        //this.setState({ isLoading: true }, async () => {

        //var auth = await this.props.authChecker(this.props.access_token_expiry, this.props.refresh_token_expiry);
        // if (auth === 'login') {
        //     alert('Session has expired you need to login again')
        //     localStorage.removeItem("access_token_expiry");
        //     localStorage.removeItem("refresh_token_expiry");
        //     localStorage.removeItem("access_token");
        //     localStorage.removeItem("refresh_token");
        //     localStorage.removeItem("id");
        //     this.props.updateTokens('', '', '', '', '')
        //     this.props.navigate("/");
        //     return
        // }

        let config = {
            headers: {
                'X-Access-Token': this.props.access_token,
                'X-Refresh-Token': this.props.refresh_token,
                'X-User-ID': this.props.id
            }
        }

        Axios.post('./findmydata', {}, config)
            .then(res => {
                // console.log('checking', res.data);
                //let markers = JSON.parse(res.data.data[0].alldata);
                let markers = [];
                let cities = [];
                let regions = [];
                let media = {};
                let tracks = res.data.data;



                tracks.forEach((val, i) => {
                    JSON.parse(val.alldata).forEach((value) => {
                        markers.push(value)
                    })

                    if (cities.includes(val.city) === false) {
                        cities.push(val.city)
                    }

                    if (regions.includes(val.region) === false) {
                        regions.push(val.region)
                    }

                    media[val.name] = JSON.parse(val.media);

                })

                cities = cities.map((val) => {
                    let tempTracks = [];
                    let tempRegion = '';
                    tracks.forEach((track) => {
                        if (val === track.city) {
                            tempTracks.push(track)
                            tempRegion = track.region;
                        }
                    })
                    let city = val;
                    val = { name: city, dropdown: false, region: tempRegion, tracks: tempTracks };
                    return val
                })

                regions = regions.map((val) => {
                    let tempCities = [];
                    cities.forEach(city => {
                        if (city.region === val) {
                            tempCities.push(city)
                        }
                    })
                    let region = val;
                    val = { name: region, dropdown: false, cities: tempCities };
                    return val
                })

                markers = markers.map(val => {

                    let position = { lat: val.postion[0], lng: val.postion[1] };

                    val.position = position

                    return val;
                })

                tracks = tracks.map(val => {

                    let media = JSON.parse(val.media);
                    val.media = media
                    return val
                })

                // console.log('markers', markers)
                // console.log('regions', regions)
                // console.log('cities', cities)

                this.setState({ tracks: tracks, markers: markers, center: markers[markers.length - 1].position, regions: regions, trackMedia: media }, () => {
                    console.log(tracks);
                })


                // return
                // // if (res.data === 'login') {
                // //     //alert('No Unauthorized Access');
                // //     localStorage.removeItem("access_token_expiry");
                // //     localStorage.removeItem("refresh_token_expiry");
                // //     localStorage.removeItem("access_token");
                // //     localStorage.removeItem("refresh_token");
                // //     localStorage.removeItem("id");
                // //     this.props.updateTokens('', '', '', '', '')
                // //     this.props.navigate("/");
                // //     return
                // // }

                // data = res.data;
                // //console.log('alldata', data);
                // this.state.ana = res.data.ana[0].data;
                // this.state.cables = res.data.cable[0].data;
                // var tempAuditMarkers = res.data.auditMarkers;
                // console.log('auditInit', tempAuditMarkers);
                // tempAuditMarkers = tempAuditMarkers.map(val => {
                //     return JSON.parse(val)
                // })
                // console.log('audit after', tempAuditMarkers);
                // this.setState({ auditMarkers: tempAuditMarkers });
                // var alltracksdata = [];
                // console.log('audit', this.state.auditMarkers);
                // //var allmarkersdata = [];
                // for (var i = 0; i < data.data.length; i++) {
                //     var track = JSON.parse(data.data[i]['data']);
                //     /*var markers = track.markerposition;
                //     for (var j = 0; j < markers.length; j++) {
                //         allmarkersdata.push(markers[j]);
                //     }*/
                //     track.id = data.data[i]['id'];
                //     var trackdata = track.track;
                //     alltracksdata.push(track);
                //     this.setState({ recenter: trackdata[0]['data'][0], recenterPersistent: trackdata[0]['data'][0] })
                // }
                // console.log(alltracksdata);
                // this.setState({ track: alltracksdata });
                // this.setState({ tracksShow: alltracksdata });
                // this.setState({ isLoading: false })
                // persistentTracks = alltracksdata;
                // //this.setState({ mappedmarkers: allmarkersdata });
                // console.log('track', this.state.track);
                // console.log('markers', this.state.mappedmarkers);

                // var tempCities = [];
                // this.state.track.forEach((val) => {
                //     if (!tempCities.some(value => { return value.city === val.city })) {
                //         tempCities.push({ city: val.city, region: val.region });
                //     }
                // })

                // this.setState({ cities: tempCities, zoom: 20 }, () => {

                //     console.log('resgions', this.state.regions)
                //     console.log('cities', this.state.cities)

                // })

            }).catch(err => {
                //console.log(err);
                this.setState({ isLoading: false });
                alert('Ambigious response from the server, Please check your internet Connection')
            })

        // })
    }
}

export default GisView;