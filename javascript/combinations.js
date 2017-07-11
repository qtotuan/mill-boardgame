const ADJACENT_COMBINATIONS = {
  {
    node1: [node2, node10],
    node2: [node1, node3, node5],
    node3: [node2, node15],
    node4: [node11, node5],
    node5: [node2, node4, node6, node8],
    node6: [node5, node14],
    node7: [node8, node12],
    node8: [node5, node7, node9],
    node9: [node8, node13],
    node10: [node1, node11, node22],
    node11: [node10, node4, node19, node12],
    node12: [node11, node7, node16],
    node13: [node9, node18, node14],
    node14: [node13, node6, node21, node15],
    node15: [node14, node3, node24],
    node16: [node12, node17],
    node17: [node16, node18, node20],
    node18: [node17, node13],
    node19: [node11, node20],
    node20: [node19, node17, node21, node23],
    node21: [node20, node14]
    node22: [node10, node23]
    node23: [node22, node20, node24]
    node24: [node23, node15]
  }
}

const MILL_COMBINATIONS = [
    // across
    [node1, node2, node3],
    [node4, node5, node6],
    [node7, node8, node9],
    [node10, node11, node12],
    [node13, node4, node15],
    [node16, node17, node18],
    [node19, node20, node21],
    [node22, node23, node24],
    //down
    [node1, node10, node22],
    [node4, node11, node19],
    [node7, node12, node16],
    [node2, node5, node8],
    [node17, node20, node23],
    [node9, node13, node18],
    [node6, node14, node21],
    [node3, node15, node24],
  ]
