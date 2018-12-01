import React, { Component } from 'react';
// import {Route, Link} from 'react-router-dom'
import {  Route, Link } from 'react-router-dom';
// import PeopleComp from '../components/PeopleComp/PeopleComp.js';
// import UpdateComp from '../components/PeopleComp/UpdateComp.js';
import Home from '../components/Home.js';
import NavComp from '../components/NavComp/NavComp';
import Button from 'antd/lib/button';
import {Table, Divider} from 'antd';
import 'antd/dist/antd.css';
import * as d3 from 'd3';

class ResearcherPage extends Component {
  constructor(props) {
    super(props);
    this.data = {
      nodes: [],
      links: []
    };
    this.nodes = [{id:localStorage.user.split("\"")[3],info:'researcher', index:0, x:480, y:270}];
    this.links = [];
    this.unique_nodes = [{id:localStorage.user.split("\"")[3],info:'researcher'}];
    this.unique_links = [];
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    Array.prototype.fakeFindIndex = function (cb, context) {
      let array = this;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (cb.call(context, element, i, array)) {
          return i
        }
      }
      return -1
    }
    const svgContainer = this.refs.svgContainer;
    const [width, height] = [svgContainer.clientWidth, svgContainer.clientHeight];
    this.width = width;
    this.height = height;
    this.initSvg();
    this.update({id:localStorage.user.split("\"")[3],info:'researcher'});
    this.zoom_transform = d3.zoomIdentity;
  }
  componentWillUnmount() {
  }

  update(arg){
    //console.log(localStorage.user.split("\"")[3]);
    //var arg = {id:"p0", info:"project"}
    //console.log(arg)
    console.log(this.unique_links);
    console.log(this.unique_nodes);
    if(arg.info == "researcher"){
      var data = {
        target: "*",
        table : "Contributor",
        constraint : "WHERE Researcher_id = ",
        rid : arg.id
      }

      fetch(`/visdata`, {
        method: 'Post',
        body: JSON.stringify(data),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data=>{
        var out = {links:[], nodes:[]}
        for(var key in data){
          if(!isFinite(key)){ break;}
          if(this.links.fakeFindIndex((d)=>d.id==`${data[key].Researcher_id}_${data[key].Project_id}`)==-1){
            out.links.push(data[key]);
          }
          if(!out.nodes.includes({id: data[key].Project_id, info: "project"})){
            if(this.nodes.fakeFindIndex((d)=>d.id==data[key].Project_id)==-1){
              out.nodes.push({id: data[key].Project_id, info: "project"});
            }
          }
        }
        //console.log(JSON.stringify(out));

        out.nodes.forEach((n)=>{
          this.nodes.push(n);
        });
        //console.log(this.nodes);

        out.links.forEach((d)=>{
          this.links.push({id: `${d.Researcher_id}_${d.Project_id}`, source: d.Researcher_id, target: d.Project_id});
        });
        //console.log(this.links);
        //console.log(this.data);
        this.formatData(this.nodes, this.links);
        this.draw(this.nodes, this.links, false, 2000);
      })
    }

    else if(arg.info == "project"){
      var data = {
        target: "*",
        table : "Contributor",
        constraint : "WHERE Project_id = ",
        rid : arg.id
      }

      fetch(`/visdata`, {
        method: 'Post',
        body: JSON.stringify(data),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data=>{
        var out = {links:[], nodes:[]}
        for(var key in data){
          //console.log(key);
          if(!isFinite(key)){ break;}
          if(this.links.fakeFindIndex((d)=>d.id==`${data[key].Researcher_id}_${data[key].Project_id}`)==-1){
            out.links.push(data[key]);
          }
          if(!out.nodes.includes({id: data[key].Researcher_id, info: "researcher"})){
            if(this.nodes.fakeFindIndex((d)=>d.id==data[key].Researcher_id)==-1){
              out.nodes.push({id: data[key].Researcher_id, info: "researcher"});
            }
          }
        }
        //console.log(JSON.stringify(out));

        out.nodes.forEach((n)=>{
          this.nodes.push(n);
        });
        //console.log(this.nodes);

        out.links.forEach((d)=>{
          this.links.push({id: `${d.Researcher_id}_${d.Project_id}`, source: d.Researcher_id, target: d.Project_id});
        });
        //console.log(this.links);
        //console.log(this.data);
        this.formatData(this.nodes, this.links);
        this.draw(this.nodes, this.links, false, 2000);
      })
    }

    else{}


  }

  getNodeIds() {
    const nodeIds = {};
    const lockId = this.state.lockId;
    if (this.state.lockId) {
      nodeIds[lockId] = 1;
    }
    this.links.forEach((d) => {
      if (this.state.lockId) {
        if (d.source.id == lockId) {
          nodeIds[d.target.id] = 1;
        }
      }
    });
    return nodeIds;
  }

  initSvg() {
    const [width, height] = [this.refs.svgContainer.offsetWidth, this.refs.svgContainer.clientHeight];
    const _this = this;
    const svg = d3.select(this.refs.svgContainer).select('svg')
    .attr('width', width)
    .attr('height', height);
    // .attr('height', height);
    const svg_descartes = svg.append('g')
    //.attr('transform', `translate(${width / 2},${height / 2})`);

    const svg_eventbg = svg_descartes
    .append("rect")
    .attr('width', 960)
    .attr('height', 540)
    .attr('fill-opacity', 0)
    .attr('transform', 'translate(-2000,-2000)')
    .on('click', () => {
    });
    const svgG = svg_descartes.append("g")
    .attr('class', 'container');

    svgG.append('g')
    .attr('class', 'group');

    svgG.append('g')
    .attr('class', 'links');

    svgG.append('g')
    .attr('class', 'nodes');

    svgG.append('g')
    .attr('class', 'filter')
    .append('rect')
    .attr('x', -480)
    .attr('y', -270)
    .attr('width', 960)
    .attr('height', 540)
    .attr('fill', '#fff')
    .style('pointer-events', 'none')
    .style('fill-opacity', 0);

    svgG.append('g')
    .attr('class', 'locus');
    svgG.append('g')
    .attr('class', 'lighter');

    const zoomed = function () {
      _this.zoom_transform = d3.event.transform;
      svgG.attr('transform', _this.zoom_transform);
    };
    const zoom = d3.zoom().on('zoom', zoomed);
    this.zoom = zoom;

    svg_descartes.call(zoom).on('dblclick.zoom', null);
    this.svg_descartes = svg_descartes;
    // svg.call(zoom,d3.zoomIdentity).on('dblclick.zoom',null);
  }

  formatData(nodes, link, userWidth, userHeight) {
    //console.log(nodes);
    //console.log(link);
    const [width, height] = [userWidth ? userWidth : this.width, userHeight ? userHeight : this.height];
    /*const link = links.map((d) => {
    return {id: `${d.researcher_id}_${d.project_id}`, source: d.researcher_id, target: d.project_id};
  });*/
  const forceSimulation = d3.forceSimulation()
  .force('link', d3.forceLink().id((d) => {
    return d.id;
  }))
  .force("charge", d3.forceManyBody().strength(-100))
  .force("center", d3.forceCenter(width / 2, height / 2));

  forceSimulation
  .nodes(nodes);

  forceSimulation.force('link')
  .links(link);

  for (var i = 0, n = Math.ceil(Math.log(forceSimulation.alphaMin()) / Math.log(1 - forceSimulation.alphaDecay())); i < n; ++i) {
    forceSimulation.tick();
  }
  return {nodes, links: link};
}
tick = () => {

}

draw(dataNode, dataLinks, duration) {
  const _this = this;
  const t = d3.transition().duration(duration);

  const nodeContainer = d3.select(this.refs.svgContainer).select('svg').select('g.nodes');
  const linkContainer = d3.select(this.refs.svgContainer).select('svg').select('g.links');

  const nodeData = nodeContainer
  .selectAll('g.node')
  .data(dataNode, (d) => {
    return d.id;
  });

  const linkData = linkContainer
  .selectAll('g.line')
  .data(dataLinks, d => d.id);

  linkData.exit()
  .selectAll('line')
  .transition(t)
  .attr('stroke-width', 0)
  .remove();
  linkData.exit()
  .transition(t)
  .remove();

  linkData
  .selectAll('line')
  .transition(t)
  .attr('x1', function () {
    return d3.select(this.parentNode).datum().source.x;
  })
  .attr('y1', function () {
    return d3.select(this.parentNode).datum().source.y;
  })
  .attr('x2', function () {
    return d3.select(this.parentNode).datum().target.x;
  })
  .attr('y2', function () {
    return d3.select(this.parentNode).datum().target.y;
  })
  .attr('stroke-width', function () {
    return 2;
  });

  const linkEnter = linkData.enter()
  .append('g')
  .attr('class', 'line');
  linkEnter.append('line')
  .style('stroke', '#77787b')
  .attr('stroke-width', 0)
  .attr('x1', (d) => {
    return d.source.x;
  })
  .attr('y1', (d) => {
    return d.source.y;
  })
  .attr('x2', (d) => {
    return d.target.x;
  })
  .attr('y2', (d) => {
    return d.target.y;
  })
  .on('mouseover', function (d) {
    console.log('mouseover');
  })
  .on('mouseout', function (d) {
    console.log('mouseout');
  })
  .transition(t)
  .attr('stroke-width', (d) => 2);

  nodeData.exit()
  .selectAll('circle')
  .transition(t)
  .attr('r', 1e-6)
  .style('fill-opacity', 1e-6);
  nodeData.exit()
  .selectAll('text')
  .transition(t)
  .style('fill-opacity', 1e-6);
  nodeData.exit()
  .transition(t)
  .remove();

  nodeData.transition(t)
  .attr('transform', (d) => {
    return `translate(${d.x},${d.y})`;
  })
  nodeData.selectAll('circle')
  .transition(t)
  .attr('r', function (d) {
    return 10;
  })
  .style('fill', (d)=> d.info == 'project' ? '#009ad6' : '#ffd400');

  const node = nodeData.enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', (d) => {
    return `translate(${d.x},${d.y})`;
  });
  node.append('text')
  .text((d) => {
    return d.id;
  })
  .attr('dx', 15)
  .style('font-size', 12)
  .style('fill', '#666')
  .style('fill-opacity', 1e-6)
  .style('pointer-events', 'none')
  .transition(t)
  .style('fill-opacity', 0.6);
  node.append('circle')
  .attr('r', 0)
  .on('click', (d) => {
    this.update({id:d.id,info:d.info});
  })
  .on('contextmenu', () => {
  })
  .on('mouseover', (d) => {
    console.log('mouseover');
  })
  .on('mouseout', (d) => {
    console.log('mouseout');
  })
  .style('fill-opacity', 0)
  // .style('filter', 'url(#Gaussian_Blur)')
  .transition(t)
  .style('fill',(d)=> d.info == 'project' ? '#009ad6' : '#ffd400')
  .attr('r', 15)
  .style('fill-opacity', 1);
}
render() {
  return (
    <div>
    <head>
    <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
    </head>

    <NavComp></NavComp>
    Welcome to your personal page, {localStorage.user.split("\"")[3]}
    <div style={{ position: 'relative' }}>
    <div ref={'starContainer'}>
    <div ref={'svgContainer'} style={{ height: 540 }}>
    <svg />
    </div>
    </div>
    </div>
    </div>
  );
}
}
/*extends Component {
constructor(props) {
super(props);
console.log(localStorage.user.split("\""));
global.constants = [[],[]];
var data = global.constants[0];
console.log(localStorage.user.split("\"")[3]);

this.state = {
color: "",
width: "",
toDraw: [],
}
//this.onSubmit = this.onSubmit.bind(this);
//this.onChange = this.onChange.bind(this);
}

render() {
return(
<div className="controller">
<NavComp></NavComp>
Researcher Info for {localStorage.user.split("\"")[11]} {localStorage.user.split("\"")[15]}
<Viz></Viz>
</div>);
}

/*

onSubmit(evt) {
evt.preventDefault();
const newShape = {
color: this.state.color,
width: this.state.width,
}
this.setState({ toDraw: [...this.state.toDraw, newShape]})
}

onChange(evt) {
this.setState({[evt.target.name]: evt.target.value})
}

<form onSubmit={this.onSubmit}>
<label>pick a color:</label>
<select name="color" onChange={this.onChange} >
<option disabled selected="selected" value="">choose</option>
<option value="red">red</option>
<option value="orange">orange</option>
<option value="yellow">yellow</option>
</select>
<label>how big:</label>
<input name="width" onChange={this.onChange} />
<button type="submit">draw!</button>
</form>
{ this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
</div>
)

}
*/
export {ResearcherPage};
