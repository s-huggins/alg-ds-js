const wg = require('./weighted-graph');
const pq = require('./priority-queue');

const g = new wg.WeightedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'F', 1);
g.addEdge('D', 'E', 3);
g.addEdge('E', 'F', 1);

const dijkstra = (g, start, end) => {
  const previous = {};
  const distances = {};
  const minQueue = new pq.PriorityQueue();

  g.nodes.forEach(n => {
    if (n === start) {
      distances[n] = 0;
      minQueue.enqueue(n, 0);
    } else {
      distances[n] = Infinity;
      minQueue.enqueue(n, Infinity);
    }

    previous[n] = null;
  });

  while (!minQueue.isEmpty()) {
    const { value: vertex } = minQueue.dequeue();

    if (vertex === end) {
      break;
    }

    for (let edge of g.edges(vertex)) {
      const newDistance = distances[vertex] + edge.weight;
      if (newDistance < distances[edge.node]) {
        distances[edge.node] = newDistance;
        previous[edge.node] = vertex;
        minQueue.enqueue(edge.node, newDistance);
      }
    }
  }

  let prevNode = end;
  const path = [end];
  while (previous[prevNode]) {
    path.unshift(previous[prevNode]);
    prevNode = previous[prevNode];
  }

  return {
    cost: distances[end],
    path
  };
};

const output = dijkstra(g, 'A', 'E');
console.log(output);