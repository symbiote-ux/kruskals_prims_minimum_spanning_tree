const getIndex = (set, from, target) => {
  let fromIndex = -1;
  let targetIndex = -1;
  set.forEach((subSet, index) => {
    if (subSet.includes(from)) {
      fromIndex = index;
    }
    if (subSet.includes(target)) {
      targetIndex = index;
    }
  });
  return { fromIndex, targetIndex };
};

const updateSet = (from, target, set) => {
  const { fromIndex, targetIndex } = getIndex(set, from, target);
  if (fromIndex === -1) {
    set[targetIndex].push(from);
    return;
  }
  if (targetIndex === -1) {
    set[fromIndex].push(target);
    return;
  }
  set[fromIndex].push(...set[targetIndex]);
  set.splice(targetIndex, 1);
};

const kruskals = (pairs) => {
  let set = [];
  const mst = [];
  pairs.forEach(([from, target, weight]) => {
    const { fromIndex, targetIndex } = getIndex(set, from, target);
    if (fromIndex === -1 && targetIndex === -1) {
      mst.push([from, target, weight]);
      set.push([from, target]);
    }
    if (fromIndex !== targetIndex) {
      mst.push([from, target, weight]);
      updateSet(from, target, set);
    }
  });
  return mst;
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
    ['e', 'f', 2],
  ];
  const sortedList = pairs.sort((a, b) => a[2] - b[2]);
  const minSpanningTree = kruskals(sortedList);
  console.log(minSpanningTree);
};

main();
