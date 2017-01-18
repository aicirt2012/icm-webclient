import { Component, ElementRef, OnInit } from '@angular/core';
import { DashboardService } from '../../shared';
let $ = require('../../../../../node_modules/jquery/dist/jquery.min');
let cytoscape = require('../../../../../node_modules/cytoscape/dist/cytoscape');

@Component({
  selector: 'network',
  templateUrl: 'network.component.html',
  styleUrls: ['network.component.css'],
  providers: []
})
export class NetworkComponent {

  public topSender: any;
  public topReceiver: any;
  public container:any;

  constructor(private _dashboardService: DashboardService, private rootElement: ElementRef) {}

  ngOnInit() {
    this.container = $(this.rootElement.nativeElement).find('#network')[0];
    this._dashboardService.getNetwork().subscribe((network)=>{
      this.renderNetwork(network.graph);
      this.topSender = network.topsender;
      this.topReceiver = network.topreceiver;
    });
  }


  renderNetwork(graph) {

    let elements = {nodes:[], edges:[]};
    graph.nodes.forEach((n)=>{
      elements.nodes.push({data: {id: n.email, name: n.name, weight: 1, faveColor: '#6FB1FC', faveShape: 'ellipse'}});
    });
    graph.edges.forEach((e)=>{
      elements.edges.push({data: {source: e.from, target: e.to, label: 'send ' +e.count + ' Mails', faveColor: '#6FB1FC', strength: e.count}});
    });
    let cy = cytoscape({
      container: this.container,
      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'shape': 'data(faveShape)',
          'width': 'mapData(weight, 40, 80, 20, 60)',
          'content': 'data(name)',
          'text-valign': 'center',
          'text-outline-width': 2,
          'text-outline-color': 'data(faveColor)',
          'background-color': 'data(faveColor)',
          'color': '#fff'
        })
        .selector(':selected')
        .css({
          'border-width': 3,
          'border-color': '#333'
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          'opacity': 0.666,
          'width': 'mapData(strength, 70, 100, 2, 6)',
          'target-arrow-shape': 'triangle',
          'line-color': 'data(faveColor)',
          'source-arrow-color': 'data(faveColor)',
          'target-arrow-color': 'data(faveColor)',
          'label': 'data(label)',
          'font-size': '0.5em'
        })
        .selector('edge.questionable')
        .css({
          'line-style': 'dotted',
          'target-arrow-shape': 'diamond'
        })
        .selector('.faded')
        .css({
          'opacity': 0.25,
          'text-opacity': 0
        }),
      elements: elements,
      layout: {
        name: 'cose',
        padding: 10,
        randomize: true
      }
    });
    console.log(cy);
  }


}
