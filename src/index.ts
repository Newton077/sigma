import { createNodeImageProgram } from "@sigma/node-image";
import Graph from "graphology";
import ForceSupervisor from "graphology-layout-force/worker";
import Sigma from "sigma";
import NodeGradientProgram from "./node-gradient";

const container = document.getElementById("sigma-container") as HTMLElement;

const graph = new Graph();

const RED = "#FA4F40";
const BLUE = "#727EE0";
const GREEN = "#5DB346";

graph.addNode("John", {
  size: 15,
  label: "John",
  type: "image",
  image: "/user.svg",
  color: RED,
});
graph.addNode("Mary", {
  size: 15,
  label: "Mary",
  type: "image",
  image: "/user.svg",
  color: RED,
});
graph.addNode("Suzan", {
  size: 15,
  label: "Suzan",
  type: "image",
  image: "/user.svg",
  color: RED,
});
graph.addNode("Nantes", {
  size: 15,
  label: "Nantes",
  type: "image",
  image: "/city.svg",
  color: BLUE,
});
graph.addNode("New-York", {
  size: 15,
  label: "New-York",
  type: "image",
  image: "/city.svg",
  color: BLUE,
});
graph.addNode("Sushis", {
  size: 7,
  label: "Sushis",
  type: "gradient",
  color: GREEN,
});
graph.addNode("Falafels", {
  size: 7,
  label: "Falafels",
  type: "gradient",
  color: GREEN,
});
graph.addNode("Kouign Amann", {
  size: 7,
  label: "Kouign Amann",
  type: "gradient",
  color: GREEN,
});

graph.addEdge("John", "Mary", { type: "line", label: "works with", size: 5 });
graph.addEdge("Mary", "Suzan", { type: "line", label: "works with", size: 5 });
graph.addEdge("Mary", "Nantes", { type: "arrow", label: "lives in", size: 5 });
graph.addEdge("John", "New-York", {
  type: "arrow",
  label: "lives in",
  size: 5,
});
graph.addEdge("Suzan", "New-York", {
  type: "arrow",
  label: "lives in",
  size: 5,
});
graph.addEdge("John", "Falafels", { type: "arrow", label: "eats", size: 5 });
graph.addEdge("Mary", "Sushis", { type: "arrow", label: "eats", size: 5 });
graph.addEdge("Suzan", "Kouign Amann", {
  type: "arrow",
  label: "eats",
  size: 5,
});

graph.nodes().forEach((node, i) => {
  const angle = (i * 2 * Math.PI) / graph.order;
  graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
  graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
});

const renderer = new Sigma(graph, container, {
  nodeProgramClasses: {
    image: createNodeImageProgram(),
    gradient: NodeGradientProgram,
  },
  renderEdgeLabels: true,
});

const layout = new ForceSupervisor(graph);
layout.start();

// Limpieza al finalizar
window.addEventListener("beforeunload", () => {
  layout.kill();
  renderer.kill();
});
