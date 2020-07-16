const getMinEdge = (graph, keys) => {
  let minWeight = Infinity;
  let minEdge;
  keys.forEach(key => {
    graph[key].forEach(({ target, weight }) => {
      if (!keys.includes(target) && weight < minWeight) {
        minEdge = { from: key, target, weight };
        minWeight = weight;
      }
    });
  });
  return minEdge;
};

const prims = (graph, mst = [], keys = ['a']) => {
  if (Object.keys(graph).length - 1 === Object.keys(mst).length) return mst;
  const minEdge = getMinEdge(graph, keys);
  mst.push(minEdge);
  keys.push(minEdge.target);
  return prims(graph, mst, keys);
};

const updateAdjList = (list, source, target, weight) => {
  if (!list[source]) {
    list[source] = [{ target, weight }];
    return;
  }
  list[source].push({ target, weight });
};

const createAdjList = pairs => {
  const adjList = {};
  pairs.forEach(pair => {
    updateAdjList(adjList, pair[0], pair[1], pair[2]);
    updateAdjList(adjList, pair[1], pair[0], pair[2]);
  });
  return adjList;
};

const main = () => {
  const pairs = [
    ['a', 'b', 5],
    ['a', 'c', 8],
    ['b', 'c', 3],
    ['b', 'd', 1],
    ['b', 'e', 2],
    ['c', 'd', 1],
    ['d', 'f', 4],
    ['e', 'f', 2]
  ];
  const adjList = createAdjList(pairs);
  const minSpanningTree = prims(adjList);
  console.log(minSpanningTree);
};

main();
