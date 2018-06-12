import React from 'react';
import { MapWithGeocode} from 'components/map/GoogleMap';

export class RentalMap extends React.Component {

  render() {
    const location = this.props.location;

    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}
