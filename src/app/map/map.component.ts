import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import * as urlUtils from '@arcgis/core/core/urlUtils';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewRef', { static: true })
  mapViewRef!: ElementRef<HTMLDivElement>;
  map!: any;
  mapView!: any;
  layerList!: any;

  ngOnInit(): void {
    this.initialMap();
  }

  async initialMap() {
    let imgLayer = new MapImageLayer({
      url: 'https://mapora.geotalent.co.th/arcgis/rest/services/EGAT_LIDAR_GOT/MS_EGATSURVEY/MapServer',
    });

    // การเพิ่ม proxy เพื่อให้สามารถเข้าถึงหน้า map ได้โดยไม่ต้อง login
    urlUtils.addProxyRule({
      // url services map
      urlPrefix:
        'https://mapora.geotalent.co.th/arcgis/rest/services/EGAT_LIDAR_GOT/MS_EGATSURVEY/MapServer',
      // url proxy เครื่อง
      proxyUrl: 'https://mapora.geotalent.co.th/EGAT_LiDAR/proxy.ashx',
    });

    this.map = new Map({
      basemap: 'topo-vector',
      layers: [imgLayer],
    });

    this.mapView = new MapView({
      center: [-118.31966, 34.13375],
      zoom: 10,
      map: this.map,
      container: this.mapViewRef.nativeElement,
    });

    return this.mapView;
  }

  ngOnDestroy(): void {
    if (this.mapView) {
      this.mapView.container = null;
    }
  }
}
